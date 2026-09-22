import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log(
        "Admin already exists:",
        existingAdmin.email
      );

      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12
    );

    const admin = await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    console.log("=================================");
    console.log("Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("=================================");

    process.exit(0);

  } catch (error) {
    console.error(
      "Admin creation failed:",
      error.message
    );

    process.exit(1);
  }
};

createAdmin();