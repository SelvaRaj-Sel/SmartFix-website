import express from "express";

import {
  getBlogs,
  getAdminBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

router.get("/", getBlogs);

router.get("/admin/all", protect, adminOnly, getAdminBlogs);

router.get("/:slug", getBlogBySlug);


// ==========================================
// ADMIN ROUTES
// ==========================================

router.post(
  "/",
  protect,
  adminOnly,
  createBlog
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateBlog
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteBlog
);

export default router;