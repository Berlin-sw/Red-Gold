const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createNeedController,
  getNeedsController,
  fulfillNeedController,
  getFulfilledNeedsController,
  deleteNeedController,
} = require("../controllers/needController");

const router = express.Router();

// CREATE NEED || POST
router.post("/create-need", authMiddleware, createNeedController);

// GET ALL PENDING NEEDS || GET
router.get("/get-needs", authMiddleware, getNeedsController);

// FULFILL NEED || POST
router.post("/fulfill-need", authMiddleware, fulfillNeedController);

// GET ALL FULFILLED NEEDS || GET
router.get("/get-fulfilled-needs", authMiddleware, getFulfilledNeedsController);

// DELETE NEED || DELETE
router.delete("/delete-need/:id", authMiddleware, deleteNeedController);

module.exports = router;
