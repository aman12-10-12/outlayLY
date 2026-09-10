const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { submitSupportReport } = require("../controllers/supportController");

const router = express.Router();

router.post("/report", protect, submitSupportReport);

module.exports = router;
