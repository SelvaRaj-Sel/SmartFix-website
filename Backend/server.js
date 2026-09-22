import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

// Seed default admin if none exists
const seedDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@smartfixautomation.com";
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

    if (!existingAdmin) {
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
      const adminName = process.env.ADMIN_NAME || "Admin";
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      await User.create({
        name: adminName,
        email: adminEmail.toLowerCase(),
        password: hashedPassword,
        role: "admin",
        isVerified: true,
      });

      console.log(`Default admin created: ${adminEmail}`);
    } else {
      console.log(`Default admin ready: ${existingAdmin.email}`);
    }
  } catch (error) {
    console.error("Default admin initialization error:", error.message);
  }
};

// Connect to Database and run seed
connectDB().then(() => {
  seedDefaultAdmin();
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all origins during development or null origins (curl/postman)
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smartfix Automation API is running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});