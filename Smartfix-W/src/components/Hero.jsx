import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import heroImage from "../assets/hero.jpg";
import heroBackground from "../assets/hero-bg.jpg";
import heroIndustrial from "../assets/hero1.jpg";
import rockwell from "../assets/rockwell-logo1.png";
import siemens from "../assets/Siemens-Logo.png";
import weinteck from "../assets/WEINTEK-LOGO.png";
import prosoft from "../assets/Prosoft-Logo.png";

const slides = [heroImage, heroBackground, heroIndustrial];

const heroContent = {
  eyebrow: "We Are System Integrator",
  title: ["Industrial Automation", "Powered by the Best"],
  description:
    "Your trusted product for Rockwell Automation and Siemens solutions. We deliver expert system integration, commissioning, migration, and 24/7 support for industries across India.",
};

const brandslogo = [
  { name: "Rockwell Automation", logo: rockwell },
  { name: "Siemens", logo: siemens },
  { name: "Weintek", logo: weinteck },
  { name: "Prosoft", logo: prosoft },
];
const textVariants = {
  hidden: { opacity: 0, y: 25, rotateX: -6 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const imageVariants = {
  enter: {
    opacity: 0,
    scale: 1.08,
    rotateZ: 0.4,
  },
  center: {
    opacity: 1,
    scale: 1.05,
    rotateZ: 0,
    transition: {
      opacity: { duration: 1.2, ease: "easeOut" },
      scale: { duration: 6, ease: "linear" },
      rotateZ: { duration: 1.4, ease: "easeOut" },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.0,
    transition: { duration: 0.8, ease: "easeIn" },
  },
};

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.65]);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(slideTimer);
  }, []);

  const currentImage = slides[activeSlide];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-[640px] overflow-hidden bg-[#06111d] text-white sm:min-h-[640px] lg:min-h-[730px] 2xl:max-h-[6000px]"
      style={{ perspective: 1200 }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={activeSlide}
          src={currentImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ y: bgY }}
        />
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 bg-[#06111d]"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,18,0.96)_0%,rgba(3,10,18,0.82)_38%,rgba(3,10,18,0.25)_72%,rgba(3,10,18,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,10,18,0.9)_0%,transparent_42%,rgba(3,10,18,0.22)_100%)]" />

      <motion.div
        className="
  relative
 
  mx-auto
  flex
  flex-col
  justify-between
  min-h-[450px]
  max-w-8xl
  px-5
  pb-16
  pt-24
  sm:min-h-[550px]
  sm:px-8
  sm:pb-24
  sm:pt-28
  lg:min-h-[650px]
  lg:px-12
  lg:pb-2
  lg:pt-32
"
      >
        <div
          className="w-full max-w-xl lg:max-w-2xl"
          style={{ perspective: 800 }}
        >
          <motion.div
            className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-(--primary) sm:mb-5 sm:text-xs"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0}
          >
            {heroContent.eyebrow}
          </motion.div>

          <motion.h1
            className="max-w-2xl text-[1.5rem] font-semibold leading-[1.08] sm:leading-[1.02] tracking-[-0.035em] text-white sm:text-[1.8rem] lg:text-[2.5rem] xl:text-[3rem] 2xl:text-[3.5rem]"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0.1}
          >
            <span className="text-white">{heroContent.title[0]} </span>
            <span className="text-(--primary)">{heroContent.title[1]}</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-[0.95rem] leading-7 text-slate-200/90 sm:mt-7 sm:text-[1.05rem] sm:leading-8"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0.2}
          >
            {heroContent.description}
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-8xl ">
          <motion.div
            className="w-full"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0.4}
          >
            <motion.p className="mb-5 mt-5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-(--primary) sm:text-xs">
              Our Clients
            </motion.p>

            <div className="group relative w-full overflow-hidden">
              <div className="flex min-w-max animate-client-slider gap-3 sm:gap-4">
                {[...brandslogo, ...brandslogo].map((brand, index) => (
                  <motion.div
                    key={`${brand.name}-client-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.04, duration: 0.4 }}
                    className="flex h-[40px] w-[180px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/95 px-4 shadow-[0_12px_30px_rgba(10,14,25,0.18)] sm:w-[220px] lg:w-[250px]"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-9 w-auto max-w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
