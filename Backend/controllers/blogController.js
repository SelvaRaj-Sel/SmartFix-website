import Blog from "../models/Blog.js";


// ==========================================
// GET ALL PUBLISHED BLOGS
// Public
// ==========================================

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      published: true,
    })
      .populate("author", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      blogs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch blogs",
    });
  }
};


// ==========================================
// GET ALL BLOGS (ADMIN)
// Admin only - includes drafts
// ==========================================

export const getAdminBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      blogs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch admin blogs",
    });
  }
};



// ==========================================
// GET SINGLE BLOG
// Public
// ==========================================

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      published: true,
    }).populate("author", "name");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch blog",
    });
  }
};


// ==========================================
// CREATE BLOG
// Admin only
// ==========================================

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      image,
      published,
    } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({
        message: "Title, slug and content are required",
      });
    }

    const existingBlog = await Blog.findOne({
      slug,
    });

    if (existingBlog) {
      return res.status(400).json({
        message: "Slug already exists",
      });
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      image: image || "",
      published: published ?? false,
      author: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create blog",
    });
  }
};


// ==========================================
// UPDATE BLOG
// Admin only
// ==========================================

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const {
      title,
      slug,
      content,
      image,
      published,
    } = req.body;

    // Check slug conflict
    if (slug && slug !== blog.slug) {
      const existingBlog = await Blog.findOne({
        slug,
        _id: {
          $ne: req.params.id,
        },
      });

      if (existingBlog) {
        return res.status(400).json({
          message: "Slug already exists",
        });
      }
    }

    if (title !== undefined) {
      blog.title = title;
    }

    if (slug !== undefined) {
      blog.slug = slug;
    }

    if (content !== undefined) {
      blog.content = content;
    }

    if (image !== undefined) {
      blog.image = image;
    }

    if (published !== undefined) {
      blog.published = published;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update blog",
    });
  }
};


// ==========================================
// DELETE BLOG
// Admin only
// ==========================================

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete blog",
    });
  }
};