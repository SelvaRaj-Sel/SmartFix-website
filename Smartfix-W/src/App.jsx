import "./App.css";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  Route,
  Routes,
  useLocation,
} from "react-router";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import AdminBlogDashboard from "./pages/AdminBlogDashboard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// Components
import Hero from "./components/Hero.jsx";
import Brands from "./components/BrandsAbout.jsx";
import ExclusiveProducts from "./components/ExclusiveProducts.jsx";
import Services from "./components/Services.jsx";
import Specialization from "./components/Specialization.jsx";
import Industries from "./components/Industries.jsx";
import Contact from "./components/Contact.jsx";
import Query from "./components/Query.jsx";

/* -----------------------------
   Scroll To Hash
------------------------------ */

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: -10, behavior: "instant" });
      return;
    }

    const id = location.hash.replace("#", "");
    const target = document.getElementById(id);

    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [location]);

  return null;
}

/* -----------------------------
   Page Animation
------------------------------ */

function PageWrapper({ children }) {
  const location = useLocation();

  return (
    <motion.div
      onAnimationComplete={() => {
        // The destination is now mounted and its entrance transform has settled.
        if (location.hash) {
          document.getElementById(location.hash.slice(1))?.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

/* -----------------------------
   Home Page
------------------------------ */

function HomePage() {
  return (
    <main className="home-page-snap">
      <Hero />
      <Specialization />

      <Brands />
      <ExclusiveProducts />
      <Services />
      <Industries />
      <Contact />
    </main>
  );
}

/* -----------------------------
   Main Website Layout
------------------------------ */

function WebsiteLayout() {
  const location = useLocation();
  const [queryOpen, setQueryOpen] = useState(false);

  return (
    <>
      <Navbar onOpenQuery={() => setQueryOpen(true)} />

      <ScrollToHash />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            }
          />

          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />

          <Route
            path="/blogs"
            element={
              <PageWrapper>
                <BlogsPage />
              </PageWrapper>
            }
          />

          <Route
            path="/blogs/:slug"
            element={
              <PageWrapper>
                <BlogPostPage />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      <AnimatePresence>
        {queryOpen && <Query onClose={() => setQueryOpen(false)} />}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
     

      <Footer />
    </>
  );
}

/* -----------------------------
   App
------------------------------ */

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Login */}
        <Route path="/login" element={<Loginpage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminBlogDashboard />} />
        <Route path="/admin/blogs" element={<AdminBlogDashboard />} />

        {/* Main Public Website */}
        <Route path="*" element={<WebsiteLayout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
