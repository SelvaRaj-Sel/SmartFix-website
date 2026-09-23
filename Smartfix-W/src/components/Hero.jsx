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

/* =========================================================
   HERO SLIDES
========================================================= */

const slides = [heroImage, heroBackground, heroIndustrial];

/* =========================================================
   HERO CONTENT
========================================================= */

const heroContent = {
  eyebrow: "We Are System Integrator",

  title: ["Industrial Automation", "Powered by the Best"],

  description:
    "Your trusted product for Rockwell Automation and Siemens solutions. We deliver expert system integration, commissioning, migration, and 24/7 support for industries across India.",
};

/* =========================================================
   CLIENT LOGOS
========================================================= */

const brandslogo = [
  {
    name: "Rockwell Automation",
    logo: rockwell,
  },
  {
    name: "Siemens",
    logo: siemens,
  },
  {
    name: "Weintek",
    logo: weinteck,
  },
  {
    name: "Prosoft",
    logo: prosoft,
  },
];

/* =========================================================
   TEXT ANIMATION
========================================================= */

const textVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    rotateX: -6,
  },

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

    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/* =========================================================
   IMAGE ANIMATION
========================================================= */

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
      opacity: {
        duration: 1.2,
        ease: "easeOut",
      },

      scale: {
        duration: 6,
        ease: "linear",
      },

      rotateZ: {
        duration: 1.4,
        ease: "easeOut",
      },
    },
  },

  exit: {
    opacity: 0,
    scale: 1,

    transition: {
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

/* =========================================================
   HERO COMPONENT
========================================================= */

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const sectionRef = useRef(null);

  /* =======================================================
     SCROLL PARALLAX
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.65]);

  /* =======================================================
     AUTO SLIDE
  ======================================================= */

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 6000);

    return () => {
      window.clearInterval(slideTimer);
    };
  }, []);

  const currentImage = slides[activeSlide];

  return (
    <section
      ref={sectionRef}
      id="#home"
      className="
        relative
  isolate
  flex
  min-h-[630px]
  w-full
  flex-col
  overflow-hidden
  bg-[#06111d]
  text-white
  md:min-h-[625px]
  lg:min-h-[630px]
      "
      style={{
        perspective: 1200,
      }}
    >
      {/* ===================================================
          BACKGROUND IMAGE xl:min-h-[870px]
      ==================================================== */}

      <AnimatePresence mode="wait">
        <motion.img
          key={activeSlide}
          src={currentImage}
          alt=""
          aria-hidden="true"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            y: bgY,
          }}
        />
      </AnimatePresence>

      {/* ===================================================
          DARK OVERLAY 
      ==================================================== */}

      <motion.div
        className="
          absolute
          inset-0
          bg-[#06111d]
        "
        style={{
          opacity: overlayOpacity,
        }}
      />

      {/* ===================================================
          LEFT GRADIENT
      ==================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(90deg,rgba(3,10,18,0.96)_0%,rgba(3,10,18,0.82)_38%,rgba(3,10,18,0.25)_72%,rgba(3,10,18,0.48)_100%)]
        "
      />

      {/* ===================================================
          BOTTOM GRADIENT
      ==================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(0deg,rgba(3,10,18,0.95)_0%,transparent_42%,rgba(3,10,18,0.22)_100%)]
        "
      />

      {/* ===================================================
          MAIN HERO CONTAINER
      ==================================================== */}

      <div
        className="
          relative
    z-10
    mx-auto
    flex
    justify-between
    min-h-[630px]
    w-full
    max-w-8xl
    flex-col
    
  md:min-h-[625px]
  lg:min-h-[630px]

    px-5
    pt-40
    md:pt-38
    lg:pt-28
    pb-

   
        "
      >
        {/* =================================================
            HERO TEXT
        ================================================== */}

        <div
          className="
            w-full
            max-w-xl
            sm:max-w-2xl
            lg:max-w-3xl
          "
          style={{
            perspective: 800,
          }}
        >
          {/* =================================================
              EYEBROW
          ================================================== */}

          <motion.div
            className="
              mb-3
              flex
              relative
  isolate
  flex
              items-center
              gap-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-(--primary)
              sm:mb-5
              sm:text-xs
            "
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0}
          >
            {heroContent.eyebrow}
          </motion.div>

          {/* =================================================
              TITLE
          ================================================== */}

          <motion.h1
            className="
              max-w-3xl
              text-[1.8rem]
              font-semibold
              leading-[1.08]
              tracking-[-0.035em]
              text-white

              sm:text-[2.2rem]

              md:text-[2.5rem]

              lg:text-[3.2rem]

              xl:text-[3.7rem]

              2xl:text-[4rem]
            "
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0.1}
          >
            <span className="text-white">{heroContent.title[0]} </span>

            <span className="text-(--primary)">{heroContent.title[1]}</span>
          </motion.h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <motion.p
            className="
              mt-5
              max-w-xl
              text-[0.9rem]
              leading-6
              text-slate-200/90

              sm:mt-6
              sm:text-[1rem]
              sm:leading-7

              lg:mt-7
              lg:text-[1.05rem]
              lg:leading-8
            "
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0.2}
          >
            {heroContent.description}
          </motion.p>
        </div>

        {/* =================================================
            FLEXIBLE SPACE

            This is important.

            It pushes "Our Clients" to the bottom
            of the hero container.
        ================================================== */}


        {/* =================================================
            OUR CLIENTS
        ================================================== */}

        <motion.div
          className="
            mt-10
    w-full
    overflow-hidden

    sm:mt-12

    md:mt-14

    lg:mt-20

    xl:mt-24
          "
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.4}
        >
          {/* =================================================
              CLIENT TITLE
          ================================================== */}

          <motion.p
            className="
              mb-3
              text-[0.68rem]
              font-bold
              uppercase
              tracking-[0.18em]
              text-(--primary)

              sm:mb-4
              sm:text-xs
            "
          >
            Our Clients
          </motion.p>

          {/* =================================================
              LOGO SLIDER
          ================================================== */}

          <div
            className="
              group
              relative
              w-full
              overflow-hidden
            "
          >
            <div
              className="
                animate-client-slider
                flex
                min-w-max
                gap-3

                sm:gap-4
              "
            >
              {/* Duplicate logos for infinite loop */}

              {[...brandslogo, ...brandslogo].map((brand, index) => (
                <div
                  key={`${brand.name}-client-${index}`}
                  className="
                      flex
                      h-[44px]
                      w-[150px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/95
                      px-4
                      shadow-[0_12px_30px_rgba(10,14,25,0.18)]

                      sm:h-[48px]
                      sm:w-[190px]

                      md:w-[220px]

                      lg:h-[52px]
                      lg:w-[240px]
                    "
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="
                        max-h-8
                        w-auto
                        max-w-full
                        object-contain

                        sm:max-h-9
                      "
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
