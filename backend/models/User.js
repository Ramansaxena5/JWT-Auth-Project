const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,

      required: [true, "Full name is required"],

      trim: true,

      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,

      required: [true, "Email is required"],

      unique: true,

      lowercase: true,

      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,

      required: [true, "Password is required"],

      minlength: [6, "Password must be at least 6 characters"],

      select: false, // Never return password in queries by default
    },

    role: {
      type: String,

      enum: ["user", "manager", "admin"],

      default: "user",
    },

    isActive: {
      type: Boolean,

      default: true,
    },
  },

  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  },
);

// ── Hash password before saving ───────────────────────────────────────────────

userSchema.pre("save", async function (next) {
  // Only hash if the password field was actually modified

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// ── Instance method: compare submitted password against hash ──────────────────

userSchema.methods.matchPassword = async function (submittedPassword) {
  return bcrypt.compare(submittedPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
