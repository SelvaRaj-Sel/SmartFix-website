import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Search, Calendar, User, Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { api } from "../services/api.js";

const categories = ["All", "Rockwell Automation", "Siemens Integration", "Machine Safety", "VFD & Drives", "System Integration"];

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.getPublicBlogs();
        setBlogs(data || []);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" ||
      (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase()) ||
      (selectedCategory === "Rockwell Automation" && blog.title.toLowerCase().includes("rockwell")) ||
      (selectedCategory === "Siemens Integration" && blog.title.toLowerCase().includes("siemens")) ||
      (selectedCategory === "Machine Safety" && (blog.title.toLowerCase().includes("safety") || blog.content.toLowerCase().includes("safety")));

    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs[0];
  const listBlogs = searchQuery || selectedCategory !== "All" ? filteredBlogs : filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-[#020d1a] pt-24 pb-20 text-white selection:bg-cyan-500 selection:text-black">
      {/* Background glow effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl pt-8 pb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-(--primary)">
            <Sparkles size={14} className="animate-pulse text-cyan-300" />
            Engineering Knowledge & Insights
          </div>

          <h1 className="mt-4 text-[clamp(1.65rem,3vw,3.5rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white">
            Industrial Automation <span className="text-(--primary)">Blogs & Technical Guides</span>
          </h1>

          <p className="mt-5 max-w-2xl text-[clamp(0.8rem,1vw,1rem)] leading-[1.85] text-slate-300">
            Explore in-depth articles, Rockwell & Siemens engineering case studies, migration strategies, and machine safety best practices written by SmartFix Automation specialists.
          </p>

          {/* Search & Filter Bar */}
          {/* <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles on PLC, SCADA, VFDs, Safety..."
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-400 outline-none backdrop-blur-md transition focus:border-cyan-400 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div> */}

          {/* Category Filter Pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition duration-200 ${
                  selectedCategory === cat
                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/40 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              <span className="text-sm font-medium">Loading automation articles...</span>
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="my-12 rounded-3xl border border-white/10 bg-slate-900/50 p-12 text-center backdrop-blur-md">
            <BookOpen size={48} className="mx-auto text-slate-500" />
            <h3 className="mt-4 text-xl font-bold text-white">No articles found</h3>
            <p className="mt-2 text-sm text-slate-400">
              No blog posts matched your query "{searchQuery}". Try searching for different keywords or clear filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post (only shown when not searching/filtering) */}
            {!searchQuery && selectedCategory === "All" && featuredBlog && (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-(--dark2) shadow-2xl transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(0,160,210,0.2)]"
              >
                <div className="grid lg:grid-cols-12">
                  <div className="relative h-64 overflow-hidden sm:h-80 lg:col-span-7 lg:h-120">
                    <img
                      src={featuredBlog.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"}
                      alt={featuredBlog.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020d1a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0A1128]" />
                    <div className="absolute left-4 top-4 rounded-full border border-cyan-400/40 bg-slate-950/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                      Featured Guide
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
                    <div>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-cyan-400" />
                          {new Date(featuredBlog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-cyan-400" />
                          {featuredBlog.readTime || "5 min read"}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl font-bold leading-tight text-white transition duration-300 group-hover:text-cyan-200 sm:text-3xl">
                        <Link to={`/blogs/${featuredBlog.slug}`}>
                          {featuredBlog.title}
                        </Link>
                      </h2>

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300 sm:text-base">
                        {featuredBlog.content.replace(/#|\*|`|-/g, "").slice(0, 180)}...
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                      <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                          <User size={14} />
                        </div>
                        <span>{featuredBlog.author?.name || "SmartFix Engineering"}</span>
                      </div>

                      <Link
                        to={`/blogs/${featuredBlog.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 transition hover:text-cyan-300 group-hover:translate-x-1"
                      >
                        Read Post <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Articles Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(searchQuery || selectedCategory !== "All" ? filteredBlogs : listBlogs).map((blog, index) => (
                <motion.article
                  key={blog._id || blog.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-(--dark2) shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/40 hover:shadow-[0_16px_40px_rgba(0,160,210,0.18)]"
                >
                  <Link to={`/blogs/${blog.slug}`} className="relative block h-48 overflow-hidden bg-[#071827]">
                    <img
                      src={blog.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-80" />
                    {blog.category && (
                      <span className="absolute left-3 top-3 rounded-full border border-cyan-400/30 bg-slate-950/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                        {blog.category}
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-cyan-400" />
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-cyan-400" />
                          {blog.readTime || "4 min read"}
                        </span>
                      </div>

                      <h3 className="mt-3 line-clamp-2 text-lg font-bold text-white transition duration-300 group-hover:text-cyan-200">
                        <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      <p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-300 sm:text-sm">
                        {blog.content.replace(/#|\*|`|-/g, "").slice(0, 130)}...
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-xs font-medium text-slate-400">
                        {blog.author?.name || "SmartFix Team"}
                      </span>

                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 transition hover:text-cyan-300 group-hover:translate-x-1"
                      >
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
