import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";

const MobileNav = ({ navItems, isAuthenticated, user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMobileNav = () => setMobileOpen(false);

  const handleMobileNavClick = (e, href) => {
    closeMobileNav();
    if (!href.startsWith("/#")) return;

    e.preventDefault();
    navigate(href);

    if (location.pathname === "/") {
      const targetId = href.slice(2);
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen((isOpen) => !isOpen)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border transition xl:hidden border-white/10 bg-white/5 text-white hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-(--primary)"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 right-0 top-full overflow-hidden px-5 xl:hidden"
          >
            <div className="mb-5 rounded-2xl border border-white/10 bg-[#081525]/95 p-3 shadow-2xl backdrop-blur-xl">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-cyan-400">
                    <Link
                      to={item.href}
                      onClick={(e) =>
                        item.href.startsWith("/#")
                          ? handleMobileNavClick(e, item.href)
                          : closeMobileNav()
                      }
                      className="w-full"
                    >
                      {item.name}
                    </Link>

                    {item.dropdown && (
                      <button
                        onClick={() => setSolutionsOpen((isOpen) => !isOpen)}
                        className="rounded-lg p-1 transition hover:bg-cyan-400/10"
                        aria-label="Toggle solutions menu"
                        aria-expanded={solutionsOpen}
                      >
                        <ChevronDown
                          size={17}
                          className={`transition-transform ${
                            solutionsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {item.dropdown && solutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 border-l border-cyan-400/20 pl-3 pb-2 pt-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              onClick={(e) => handleMobileNavClick(e, dropdownItem.href)}
                              className="block rounded-lg px-4 py-2.5 text-sm text-slate-400 transition hover:bg-cyan-400/10 hover:text-cyan-400"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                {isAuthenticated ? (
                  <Link
                    to="/admin/blogs"
                    onClick={closeMobileNav}
                    className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/20"
                  >
                    <ShieldCheck size={16} /> Admin Portal ({user?.name || "Admin"})
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMobileNav}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:text-white"
                  >
                    <User size={15} /> Sign In
                  </Link>
                )}

                <motion.a
                  href="/#contact"
                  onClick={(e) => handleMobileNavClick(e, "/#contact")}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-(--primary-dark) px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Get a Quote
                  <ArrowUpRight size={17} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
