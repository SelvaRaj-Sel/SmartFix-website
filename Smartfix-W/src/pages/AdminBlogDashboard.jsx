import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  X,
  Loader2,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import Logo from "../assets/logo-1.png";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";

const prepareCoverImage = (file) =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const maxWidth = 1600;
      const maxHeight = 900;
      const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));

      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Image processing is unavailable"));
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const optimizedImage = canvas.toDataURL("image/webp", 0.82);
      URL.revokeObjectURL(objectUrl);
      resolve(optimizedImage);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to read the selected image"));
    };

    image.src = objectUrl;
  });

const AdminBlogDashboard = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "preview"
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: "",
    category: "Rockwell Automation",
    published: true,
  });

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminBlogs();
      setBlogs(data || []);
    } catch (err) {
      showToast(err.message || "Failed to load blogs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadBlogs();
    }
  }, [isAuthenticated]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      image: "",
      category: "Rockwell Automation",
      published: true,
    });
    setActiveTab("edit");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      content: blog.content || "",
      image: blog.image || "",
      category: blog.category || "Rockwell Automation",
      published: Boolean(blog.published),
    });
    setActiveTab("edit");
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title,
      // only auto-update slug if not editing or slug matches previously generated
      slug: editingBlog ? prev.slug : generatedSlug,
    }));
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.slug.trim() ||
      !formData.content.trim()
    ) {
      showToast("Title, slug, and content are required", "error");
      return;
    }

    setSaving(true);
    try {
      if (editingBlog) {
        await api.updateBlog(editingBlog._id, formData);
        showToast("Blog post updated successfully!");
      } else {
        await api.createBlog(formData);
        showToast("New blog post created successfully!");
      }
      setIsModalOpen(false);
      loadBlogs();
    } catch (err) {
      showToast(err.message || "Operation failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      await api.updateBlog(blog._id, { published: !blog.published });
      showToast(`Blog ${!blog.published ? "published" : "moved to drafts"}`);
      loadBlogs();
    } catch (err) {
      showToast(err.message || "Failed to update status", "error");
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await api.deleteBlog(id);
      showToast("Blog post deleted");
      setDeleteConfirmId(null);
      loadBlogs();
    } catch (err) {
      showToast(err.message || "Failed to delete blog", "error");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && blog.published) ||
      (statusFilter === "draft" && !blog.published);

    return matchesSearch && matchesStatus;
  });

  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.published).length;
  const draftCount = blogs.filter((b) => !b.published).length;

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020d1a] text-cyan-400">
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020d1a] text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl ${
              toast.type === "error"
                ? "border border-red-500/30 bg-red-950/90 text-red-200"
                : "border border-emerald-500/30 bg-emerald-950/90 text-emerald-200"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061423]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-8xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img
                src={Logo}
                alt="SmartFix"
                className="h-20 w-36 object-contain sm:h-24 sm:w-44"
              />
            </Link>

            <span className="hidden rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-(--primary) sm:inline-block">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/blogs"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ExternalLink size={14} /> View Public Blogs
            </Link>

            <div className="flex items-center gap-2.5 border-l border-white/10 pl-3 sm:pl-4">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-white">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[0.65rem] text-slate-400">
                  {user?.email || "admin@smartfix.com"}
                </p>
              </div>

              <button
                onClick={logout}
                title="Log Out"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-8xl px-5 py-8 sm:px-8">
        {/* Page Title & Stats */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              Blog & Article Management
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Create, edit, publish, and manage engineering blogs for SmartFix
              Automation
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300"
          >
            <Plus size={18} /> New Blog Post
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-6">
          <div className="rounded-2xl border border-white/10 bg-(--dark2) p-4 sm:p-5">
            <p className="text-xs font-medium text-slate-400">Total Posts</p>
            <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              {totalCount}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 sm:p-5">
            <p className="text-xs font-medium text-emerald-400">Published</p>
            <p className="mt-2 text-2xl font-extrabold text-emerald-300 sm:text-3xl">
              {publishedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 sm:p-5">
            <p className="text-xs font-medium text-amber-400">Drafts</p>
            <p className="mt-2 text-2xl font-extrabold text-amber-300 sm:text-3xl">
              {draftCount}
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or slug..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 p-1">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === "all"
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === "published"
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === "draft"
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="mt-6">
          {loading ? (
            <div className="flex min-h-[260px] items-center justify-center">
              <Loader2 size={28} className="animate-spin text-cyan-400" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-12 text-center">
              <FileText size={40} className="mx-auto text-slate-600" />
              <h3 className="mt-3 text-base font-bold text-white">
                No blog posts found
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {searchQuery
                  ? "Try a different search keyword."
                  : "Click 'New Blog Post' to publish your first post!"}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-(--dark2) shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-white/10 bg-slate-950/60 text-[0.7rem] uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-5 py-3.5">Post Details</th>
                      <th className="hidden md:table-cell px-5 py-3.5">
                        Category
                      </th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="hidden sm:table-cell px-5 py-3.5">Date</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBlogs.map((blog) => (
                      <tr
                        key={blog._id || blog.slug}
                        className="transition hover:bg-white/[0.02]"
                      >
                        {/* Title & Image */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3.5">
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt={blog.title}
                                className="h-12 w-16 shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-500">
                                <ImageIcon size={20} />
                              </div>
                            )}
                            <div className="min-w-0 max-w-xs sm:max-w-md">
                              <h4 className="line-clamp-1 font-bold text-white">
                                {blog.title}
                              </h4>
                              <p className="line-clamp-1 text-xs text-slate-400">
                                /{blog.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="hidden md:table-cell px-5 py-4">
                          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                            {blog.category || "Automation"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <button
                            onClick={() => handleTogglePublish(blog)}
                            title="Click to toggle publish status"
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${
                              blog.published
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${blog.published ? "bg-emerald-400" : "bg-amber-400"}`}
                            />
                            {blog.published ? "Published" : "Draft"}
                          </button>
                        </td>

                        {/* Date */}
                        <td className="hidden sm:table-cell px-5 py-4 text-xs text-slate-400 whitespace-nowrap">
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {blog.published && (
                              <Link
                                to={`/blogs/${blog.slug}`}
                                target="_blank"
                                title="View Live Post"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                              >
                                <Eye size={16} />
                              </Link>
                            )}

                            <button
                              onClick={() => handleOpenEditModal(blog)}
                              title="Edit Post"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-cyan-400 transition hover:bg-cyan-500/10"
                            >
                              <Edit size={16} />
                            </button>

                            <button
                              onClick={() => setDeleteConfirmId(blog._id)}
                              title="Delete Post"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-500/10"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white">
                Delete this post?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                This action cannot be undone. Are you sure you want to
                permanently remove this blog?
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteBlog(deleteConfirmId)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="my-auto w-full max-w-3xl rounded-3xl border border-white/15 bg-slate-900 p-6 sm:p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Write technical guides, solutions, and updates for SmartFix
                    clients
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Edit / Preview Tabs */}
              <div className="mt-4 flex gap-2 border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("edit")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                    activeTab === "edit"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                    activeTab === "preview"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Preview
                </button>
              </div>

              {activeTab === "edit" ? (
                <form
                  onSubmit={handleSubmitBlog}
                  className="mt-5 space-y-4 max-h-[65vh] overflow-y-auto pr-1"
                >
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={handleTitleChange}
                      placeholder="e.g. Rockwell ControlLogix Migration Strategies"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400"
                      required
                    />
                  </div>

                  {/* Slug & Category */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        placeholder="e.g. rockwell-controllogix-migration"
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400"
                      >
                        <option value="Rockwell Automation">
                          Rockwell Automation
                        </option>
                        <option value="Siemens Integration">
                          Siemens Integration
                        </option>
                        <option value="Machine Safety">Machine Safety</option>
                        <option value="VFD & Drives">VFD & Drives</option>
                        <option value="System Integration">
                          System Integration
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Cover image */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Cover Image
                    </label>

                    {formData.image ? (
                      <div className="relative mt-1.5 overflow-hidden rounded-xl border border-white/15 bg-slate-950">
                        <img
                          src={formData.image}
                          alt="Selected cover preview"
                          className="h-52 w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((current) => ({
                              ...current,
                              image: "",
                            }))
                          }
                          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-red-300/25 bg-slate-950/85 px-3 py-2 text-xs font-semibold text-red-300 shadow-lg backdrop-blur transition hover:border-red-300/50 hover:bg-red-500/20"
                        >
                          <X size={14} aria-hidden="true" />
                          Remove image
                        </button>
                        <p className="absolute bottom-3 left-3 text-xs font-medium text-white">
                          Cover image selected
                        </p>
                      </div>
                    ) : (
                      <label
                        htmlFor="cover-image"
                        className="mt-1.5 flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-slate-950 transition hover:border-cyan-400 hover:bg-slate-900"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
                          <span className="text-2xl text-cyan-400">+</span>
                          <p className="text-sm font-medium text-slate-300">
                            Click to upload cover image
                          </p>
                          <p className="text-[0.65rem] text-slate-500">
                            PNG, JPG, JPEG or WEBP — maximum 8 MB
                          </p>
                        </div>

                        <input
                          id="cover-image"
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            if (file.size > 8 * 1024 * 1024) {
                              showToast("Cover image must be smaller than 8 MB", "error");
                              e.target.value = "";
                              return;
                            }

                            try {
                              const optimizedImage = await prepareCoverImage(file);
                              setFormData((current) => ({
                                ...current,
                                image: optimizedImage,
                              }));
                            } catch (error) {
                              showToast(error.message, "error");
                            } finally {
                              e.target.value = "";
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>

                  {/* Content (Markdown supported) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Article Content (Supports markdown headings ##, ###,
                      bullet points -) *
                    </label>
                    <textarea
                      rows={9}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="### Section Heading&#10;&#10;Write detailed technical insights, case studies, or guidelines here.&#10;&#10;- Feature 1&#10;- Feature 2"
                      className="mt-1.5 w-full font-mono rounded-xl border border-white/10 bg-slate-950 p-4 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 leading-relaxed"
                      required
                    />
                  </div>

                  {/* Published Checkbox */}
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
                    />
                    <label
                      htmlFor="published"
                      className="text-xs font-semibold text-slate-200 cursor-pointer"
                    >
                      Publish immediately to public website
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />{" "}
                          Saving...
                        </>
                      ) : editingBlog ? (
                        "Update Post"
                      ) : (
                        "Create Post"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Live Preview Tab */
                <div className="mt-5 max-h-[65vh] overflow-y-auto pr-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950 p-6">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="mb-4 h-48 w-full rounded-xl object-cover"
                      />
                    )}
                    <span className="text-[0.65rem] font-bold uppercase text-cyan-400">
                      {formData.category}
                    </span>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      {formData.title || "Post Title Preview"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Slug: /blogs/{formData.slug || "your-slug"}
                    </p>
                    <div className="mt-6 border-t border-white/10 pt-4 text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {formData.content ||
                        "Your article content will preview here."}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlogDashboard;
