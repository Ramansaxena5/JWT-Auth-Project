const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "https://jwt-auth-project-m7b1271lk-ritikshajain6-1582s-projects.vercel.app" ||
      "http://localhost:3000",

    credentials: true,
  }),
);

app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

// Health check

app.get("/", (req, res) => {
  res.json({ message: "JWT Auth API is running", status: "ok" });
});

// ── Error Handler ─────────────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,

    message: err.message || "Internal server error",
  });
});

// ── Database + Server ─────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

mongoose

  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })

  .catch((err) => {
    console.error("MongoDB connection error:", err.message);

    process.exit(1);
  });
