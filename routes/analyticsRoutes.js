const express = require("express");
const authMiddelware = require("../middleware/authMiddleware");
const {
  bloodGroupDetailsContoller,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsContoller);

module.exports = router;