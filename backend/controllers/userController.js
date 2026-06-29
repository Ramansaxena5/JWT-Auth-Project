const User = require("../models/User");

// ── GET /api/users/admin/stats ────────────────────────────────────────────────

// Admin-only: system-wide statistics for the admin dashboard.

const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });

    const totalManagers = await User.countDocuments({ role: "manager" });

    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalAccounts = await User.countDocuments();

    res.status(200).json({
      success: true,

      stats: {
        totalAccounts,

        totalUsers,

        totalManagers,

        totalAdmins,

        systemHealth: "Good",
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/users/manager/stats ──────────────────────────────────────────────

// Manager-only: team-level statistics for the manager dashboard.

const getManagerStats = async (req, res, next) => {
  try {
    const teamMembers = await User.countDocuments({ role: "user" });

    const activeProjects = 8; // Placeholder — replace with real Project model query

    const pendingTasks = 4; // Placeholder — replace with real Task model query

    res.status(200).json({
      success: true,

      stats: {
        teamMembers,

        activeProjects,

        pendingTasks,
      },

      manager: {
        name: req.user.fullName,

        email: req.user.email,

        role: req.user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/users/all ────────────────────────────────────────────────────────

// Admin-only: paginated list of every account in the system.

const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const users = await User.find()

      .select("-password")

      .sort({ createdAt: -1 })

      .skip(skip)

      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,

      total,

      page,

      pages: Math.ceil(total / limit),

      users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAdminStats, getManagerStats, getAllUsers };
