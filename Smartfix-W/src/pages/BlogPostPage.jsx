import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { api } from "../services/api.js";

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const data = await api.getBlogBySlug(slug);
        setBlog(data);

        // Fetch related blogs
        const allBlogs = await api.getPublicBlogs();
        setRelatedBlogs(allBlogs.filter((b) => b.slug !== slug).slice(0, 2));
      } catch (err) {
        console.error("Failed to load blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (content) => {
    if (!content) return null;

    const paragraphs = content.split("\n\n");

    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();

      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="mt-8 mb-4 text-xl sm:text-2xl font-bold text-white tracking-tight">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="mt-10 mb-5 text-2xl sm:text-3xl font-extrabold text-(--primary) tracking-tight">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="mt-12 mb-6 text-3xl sm:text-4xl font-black text-white tracking-tight">
            {trimmed.replace("# ", "")}
          </h1>
        );
      }

      if (trimmed === "---") {
        return <hr key={idx} className="my-8 border-white/10" />;
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").filter(Boolean);
        return (
          <ul key={idx} className="my-4 space-y-2.5 pl-4 sm:pl-6 list-disc marker:text-(--primary)">
            {items.map((item, itemIdx) => {
              const text = item.replace(/^[-*]\s+/, "");
              // Parse basic bold **text**
              const parts = text.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={itemIdx} className="text-slate-300 leading-7 text-sm sm:text-base">
                  {parts.map((p, pIdx) =>
                    p.startsWith("**") && p.endsWith("**") ? (
                      <strong key={pIdx} className="font-bold text-white">
                        {p.slice(2, -2)}
                      </strong>
                    ) : (
                      p
                    )
                  )}
                </li>
              );
            })}
          </ul>
        );
      }

      // Ordered list 1. 2.
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split("\n").filter(Boolean);
        return (
          <ol key={idx} className="my-4 space-y-2.5 pl-4 sm:pl-6 list-decimal marker:text-(--primary) font-medium">
            {items.map((item, itemIdx) => {
              const text = item.replace(/^\d+\.\s+/, "");
              const parts = text.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={itemIdx} className="text-slate-300 leading-7 text-sm sm:text-base">
                  {parts.map((p, pIdx) =>
                    p.startsWith("**") && p.endsWith("**") ? (
                      <strong key={pIdx} className="font-bold text-white">
                        {p.slice(2, -2)}
                      </strong>
                    ) : (
                      p
                    )
                  )}
                </li>
              );
            })}
          </ol>
        );
      }

      // Standard paragraph
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="my-4 text-slate-300 leading-relaxed text-sm sm:text-base md:text-[1.05rem]">
          {parts.map((p, pIdx) =>
            p.startsWith("**") && p.endsWith("**") ? (
              <strong key={pIdx} className="font-semibold text-white">
                {p.slice(2, -2)}
              </strong>
            ) : (
              p
            )
          )}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020d1a] text-(--primary)">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          <span className="text-sm font-medium">Loading post...</span>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#020d1a] pt-32 pb-20 text-white">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-2xl font-bold">Article not found</h2>
          <p className="mt-3 text-slate-400">The requested blog post could not be located.</p>
          <Link
            to="/blogs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950"
          >
            <ArrowLeft size={16} /> Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020d1a] pt-24 pb-20 text-white selection:bg-cyan-500 selection:text-black">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <article className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pt-6 pb-8">
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 transition hover:text-(--primary)"
          >
            <ArrowLeft size={16} className="transition group-hover:-translate-x-1" />
            Back to Blogs
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={14} className="text-(--primary)" />
                <span>Share Post</span>
              </>
            )}
          </button>
        </div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {blog.category && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-(--primary)">
              <Sparkles size={12} className="text-(--primary)" />
              {blog.category}
            </span>
          )}

          <h1 className="mt-4 text-2.5xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 border-y border-white/10 py-4 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2 text-slate-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-(--primary) font-bold">
                <User size={15} />
              </div>
              <span className="font-semibold">{blog.author?.name || "SmartFix Engineering Team"}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-(--primary)" />
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-(--primary)" />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
          </div>
        </motion.header>

        {/* Hero Cover Image */}
        {blog.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="my-8 overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-[280px] sm:h-[400px] md:h-[480px] w-full object-cover"
            />
          </motion.div>
        )}

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none rounded-3xl border border-white/5 bg-slate-950/40 p-6 sm:p-10 backdrop-blur-sm"
        >
          {renderContent(blog.content)}
        </motion.div>

        {/* Author Bio & Company CTA */}
        <div className="mt-12 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#081827] to-[#04101d] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-(--primary)">
                <Cpu size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">SmartFix Automation</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Specialized Rockwell Automation & Siemens system integrator across India.
                </p>
              </div>
            </div>

            <a
              href="/#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.25)]"
            >
              <PhoneCall size={16} /> Consult Our Engineers
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Related Technical Guides</h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {relatedBlogs.map((item) => (
                <Link
                  key={item._id || item.slug}
                  to={`/blogs/${item.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-(--dark2) p-5 transition duration-300 hover:border-cyan-400/40 hover:-translate-y-1"
                >
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-(--primary)">
                    {item.category || "Automation"}
                  </span>
                  <h4 className="mt-2 line-clamp-2 text-base font-bold text-white group-hover:text-(--primary)">
                    {item.title}
                  </h4>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-(--primary)">
                    Read guide <ChevronRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPostPage;
