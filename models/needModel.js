const mongoose = require("mongoose");

const needSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quantity is require"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "hospital is require"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "fulfilled"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Need", needSchema);
