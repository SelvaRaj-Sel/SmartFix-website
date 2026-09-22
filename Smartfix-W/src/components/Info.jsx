import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, Clock3, MapPin, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Info = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="sticky left-0 top-0 z-60 bg-[#0c202d8c] text-white"
        initial={{ y: 0 }}
        animate={{ y: scrolled ? "-100%" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="mx-auto flex min-h-12 max-w-8xl items-center justify-between gap-4 px-5 py-2 text-sm font-semibold sm:px-8 lg:min-h-14 lg:px-12 lg:text-base">
          <div className="flex min-w-0 items-center gap-3 lg:gap-8">
            <div className="flex shrink-0 items-center gap-2">
              <Clock3 size={21} strokeWidth={2.4} />
              <span className="whitespace-nowrap">9:30 AM to 6:00 PM</span>
              <span className="hidden text-white/80 sm:inline">(Mon-Sat)</span>
            </div>

            <span className="hidden h-7 w-px bg-white/30 sm:block" />

            <div className="hidden items-center gap-2 md:flex">
              <MapPin size={21} strokeWidth={2.4} />
              <span className="whitespace-nowrap">No. 5/12, Chetty Street, Poonamallee, Chennai – 600056</span>
            </div>

            <a href="https://maps.app.goo.gl/2syewNr4LszkS5VH6" target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 whitespace-nowrap transition hover:text-red-100 md:flex">
              View On Map
              <ArrowRight size={19} />
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2 whitespace-nowrap transition hover:text-red-100">
            <PhoneCall size={20} strokeWidth={2.4} />
            <a href="tel:+919894571542" className="font-bold">
              +91 9894571542
            </a>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {scrolled && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-5 z-70 flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300 text-slate-950 shadow-[0_8px_25px_rgba(34,211,238,0.28)] hover:bg-white hover:shadow-[0_8px_30px_rgba(34,211,238,0.45)] sm:right-8"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Info;