const express = require("express");

const router = express.Router();

const {
  getAdminStats,
  getManagerStats,
  getAllUsers,
} = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Admin-only routes

router.get("/admin/stats", protect, authorize("admin"), getAdminStats);

router.get("/all", protect, authorize("admin"), getAllUsers);

// Manager and above

router.get(
  "/manager/stats",
  protect,
  authorize("admin", "manager"),
  getManagerStats,
);

module.exports = router;
