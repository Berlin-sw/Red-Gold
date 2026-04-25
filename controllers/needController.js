const needModel = require("../models/needModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

const createNeedController = async (req, res) => {
  try {
    const { bloodGroup, quantity, userId } = req.body;
    const newNeed = new needModel({
      bloodGroup,
      quantity,
      hospital: userId,
    });
    await newNeed.save();
    res.status(201).send({
      success: true,
      message: "Blood Need Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Need API",
      error,
    });
  }
};

const getNeedsController = async (req, res) => {
  try {
    const needs = await needModel
      .find({ status: "pending" })
      .populate("hospital")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Blood Needs Fetched Successfully",
      needs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Needs API",
      error,
    });
  }
};

const fulfillNeedController = async (req, res) => {
  try {
    const { needId, userId } = req.body;
    const user = await userModel.findById(userId);
    const need = await needModel.findById(needId);
    
    if (!need) {
      return res.status(404).send({
        success: false,
        message: "Need Not Found",
      });
    }

    if (user.role === "organisation") {
      // Calculate available stock for this organization and blood group
      const organisation = new mongoose.Types.ObjectId(userId);
      
      const totalIn = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: need.bloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      
      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: need.bloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const availableQuantity = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

      if (availableQuantity < need.quantity) {
        return res.status(400).send({
          success: false,
          message: `Insufficient stock. Only ${availableQuantity}ml available.`,
        });
      }

      need.status = "fulfilled";
      need.organisation = userId;
      
      // Create 'out' inventory record for hospital
      const outInventory = new inventoryModel({
        inventoryType: "out",
        bloodGroup: need.bloodGroup,
        quantity: need.quantity,
        email: user.email,
        organisation: userId,
        hospital: need.hospital,
      });
      await outInventory.save();

    } else if (user.role === "donar") {
      // Check if donor has donated before
      const hasDonated = await inventoryModel.findOne({ 
        donar: userId,
        bloodGroup: need.bloodGroup 
      });

      if (!hasDonated) {
        return res.status(400).send({
          success: false,
          message: "You can only fulfill this demand if you have donated this blood group before.",
        });
      }

      // Find an organisation to associate with this transaction
      // Try to find an organisation that this hospital has dealt with
      let organisationId;
      const prevRecord = await inventoryModel.findOne({ hospital: need.hospital });
      if (prevRecord) {
        organisationId = prevRecord.organisation;
      } else {
        const anyOrg = await userModel.findOne({ role: "organisation" });
        if (!anyOrg) {
            return res.status(500).send({
                success: false,
                message: "No organisation found in the system to process fulfillment.",
            });
        }
        organisationId = anyOrg._id;
      }

      need.status = "fulfilled";
      need.donar = userId;
      need.organisation = organisationId; // Link the org that will manage this

      // Create 'in' inventory record for donor
      const inInventory = new inventoryModel({
        inventoryType: "in",
        bloodGroup: need.bloodGroup,
        quantity: need.quantity,
        email: user.email,
        organisation: organisationId,
        donar: userId,
      });
      await inInventory.save();

      // Create 'out' inventory record for hospital
      const outInventory = new inventoryModel({
        inventoryType: "out",
        bloodGroup: need.bloodGroup,
        quantity: need.quantity,
        email: user.email,
        organisation: organisationId,
        hospital: need.hospital,
      });
      await outInventory.save();

    } else {
      return res.status(403).send({
        success: false,
        message: "Only donors and organisations can fulfill blood needs.",
      });
    }

    await need.save();
    res.status(200).send({
      success: true,
      message: "Blood Need Fulfilled Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fulfill Need API",
      error,
    });
  }
};

const getFulfilledNeedsController = async (req, res) => {
    try {
      const needs = await needModel
        .find({ status: "fulfilled" })
        .populate("hospital")
        .populate("organisation")
        .populate("donar")
        .sort({ updatedAt: -1 });
      res.status(200).send({
        success: true,
        message: "Fulfilled Blood Needs Fetched Successfully",
        needs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Get Fulfilled Needs API",
        error,
      });
    }
  };

const deleteNeedController = async (req, res) => {
  try {
    await needModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Blood Need Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Need API",
      error,
    });
  }
};

module.exports = {
  createNeedController,
  getNeedsController,
  fulfillNeedController,
  getFulfilledNeedsController,
  deleteNeedController,
};
