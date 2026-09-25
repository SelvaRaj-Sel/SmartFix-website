import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import textlogo from "../assets/logo.png";
import MobileNav from "./MobileNav.jsx";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/about" },
    {
      name: "Solutions",
      href: "/#brands",
      dropdown: [
        { name: "Products", href: "/#products" },
        { name: "Services", href: "/#services" },
        { name: "Specializations", href: "/#specializations" },
      ],
    },
    { name: "Industries", href: "/#industries" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/#contact" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (window.location.pathname === "/") {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#010c14]/95 backdrop-blur-md transition-all duration-500">
      <nav className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotateY: 12 }}
              className="relative flex items-center justify-center rounded-xl"
            >
              <img
                src={textlogo}
                alt="Smartfix"
                className="h-auto w-48 sm:w-56 lg:w-56 xl:w-60 object-cover object-left"
              /> <p className="text-slate-400 font-medium pt-2 hidden md:block">automation</p>
            </motion.div>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setSolutionsOpen(true)}
                onMouseLeave={() => item.dropdown && setSolutionsOpen(false)}
              >
                {item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                  <Link
                    to={item.href}
                    className={`group relative flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                      scrolled
                        ? "text-slate-400 hover:text-(--primary)"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`group relative flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                      scrolled
                        ? "text-slate-400 hover:text-(--primary)"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.name}

                    {item.dropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          solutionsOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}

                    <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                )}

                <AnimatePresence>
                  {item.dropdown && solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute left-0 top-full w-56 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1627]/95 p-2 shadow-2xl backdrop-blur-xl">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={(e) => handleNavClick(e, dropdownItem.href)}
                            className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:bg-cyan-400/10 hover:text-white"
                          >
                            {dropdownItem.name}

                            <ArrowUpRight
                              size={15}
                              className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                            />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden xl:flex xl:items-center xl:gap-3">
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-cyan-400/40 bg-(--primary) px-2 py-2 text-sm font-bold text-slate-950 transition-colors duration-300 hover:bg-[#14bdf0] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            >
              <span>Get a Quote</span>
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.a>

            <div className="group relative flex items-center">
              {isAuthenticated ? (
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 transition hover:bg-cyan-500/20"
                  to="/admin/blogs"
                >
                  <ShieldCheck size={18} />
                </Link>
              ) : (
                <Link
                  className="p-2 text-(--primary) transition-colors hover:text-white"
                  to="/login"
                >
                  <FaUser />
                </Link>
              )}

              <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded-md bg-slate-900 border border-white/10 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {isAuthenticated ? "Admin Portal" : "Sign In"}
              </span>
            </div>
          </div>

          <MobileNav navItems={navItems} isAuthenticated={isAuthenticated} user={user} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
