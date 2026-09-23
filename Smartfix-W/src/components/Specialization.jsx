
import {
  Activity,
  Cpu,
  FileCheck2,
  MonitorCog,
  Network,
  PackageCheck,
  ScanEye,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import specimg from '../assets/hero1.jpg'

/* =========================================================
   SPECIALIZATION DATA
   ========================================================= */

const specializations = [
  {
    image: specimg,
    title: "Safety Systems (SIL2/SIL3)",
    text: "GuardLogix & Siemens safety configuration, Category 3/4 wiring and compliance support.",
  },

  {
   image: specimg,
    title: "Plant-Wide Network Architecture",
    text: "EtherNet/IP, PROFINET, Stratix managed switches, network design and validation.",
  },

  {
    image: specimg,
    title: "Motion-Based Applications",
    text: "Kinetix & SIMOTICS servo systems for high-precision motion control and machine coordination.",
  },

  {
    image: specimg,
    title: "PackML Program Support",
    text: "ISA-88 compliant packaging machine programming and HMI design for efficient production flow.",
  },

  {
    image: specimg,
    title: "21 CFR Part 11 Compliance",
    text: "FDA-compliant electronic records and signatures for pharma and regulated industries.",
  },

  {
    image: specimg,
    title: "SQL Report Generation",
    text: "FactoryTalk & WinCC database reporting with SQL integration for plant visibility and traceability.",
  },

  {
    image: specimg,
    title: "Vision Systems & Inspection",
    text: "Machine vision cameras and quality inspection systems built into production lines.",
  },

  {
    image: specimg,
    title: "High-Speed Packing Machines",
    text: "Servo-driven packing line automation with synchronized motion and rapid changeovers.",
  },
];

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const Specialization = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  /* =======================================================
     NEXT SLIDE
  ======================================================= */

  const nextSlide = () => {
    setDirection(1);

    setActiveIndex((current) =>
      current === specializations.length - 1
        ? 0
        : current + 1
    );
  };

  /* =======================================================
     PREVIOUS SLIDE
  ======================================================= */

  const previousSlide = () => {
    setDirection(-1);

    setActiveIndex((current) =>
      current === 0
        ? specializations.length - 1
        : current - 1
    );
  };

  /* =======================================================
     AUTO SLIDE
  ======================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);

      setActiveIndex((current) =>
        current === specializations.length - 1
          ? 0
          : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* =======================================================
     CURRENT SLIDE
  ======================================================= */

  const activeSpec = specializations[activeIndex];


  /* =======================================================
     HANDLE TITLE CLICK
  ======================================================= */

  const handleTitleClick = (index) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section
      id="specializations"
      className="relative overflow-hidden bg-[#020d1a] py-12 text-white sm:py-14 lg:py-16"
    >
      {/* ===================================================
          TOP LINE
      =================================================== */}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,168,232,0.25),transparent)]"/>

      {/* ===================================================
          CONTAINER
      =================================================== */}

      <div
        className="
          mx-auto
          max-w-8xl
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* =================================================
            HEADING
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-8"
        >
          <p
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-cyan-400/25
              bg-cyan-500/10
              px-3
              py-1.5
              text-[0.65rem]
              font-bold
              uppercase
              tracking-[0.2em]
              text-(--primary)
            "
          >
            Expertise
          </p>

          <h2
            className="mt-3 max-w-3xl text-[2.4rem] font-semibold leading-[1] tracking-[-0.035em] text-white sm:text-4xl lg:text-[3.5rem]" >
            We Are{" "}
            <span className="text-(--primary)">
              Specialists In
            </span>
          </h2>
        </motion.div>

        {/* =================================================
            MAIN SLIDER AREA
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="w-full"
        >
          {/* =================================================
              CARD + RIGHT TITLE NAVIGATION
          ================================================= */}

          <div
            className="
              flex
              flex-col
              
              gap-4
              lg:flex-row
              lg:gap-6

            "
          >
            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-2xl
                flex-1
                border
                border-white/10
                shadow-[0_18px_45px_rgba(2,6,23,0.28)]
              "
                // bg-white/[0.035]relative
    
    
                
            > 
              <AnimatePresence
                mode="wait"
                custom={direction}
              >
                <motion.div
                  key={activeSpec.title}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 45 : -45,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -45 : 45,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div
                    className="
                      relative
                      h-[240px]
                      w-full
                      overflow-hidden
                      sm:h-[350px]
                      lg:h-[450px]
                      
                    "
                  >
                    <img
                      src={activeSpec.image}
                      alt={activeSpec.title}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                    {/* Dark Overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#091422]
                        via-[#020d1a]/15
                        to-transparent
                      "
                    />

                    {/* =================================================
                        IMAGE TITLE
                    ================================================= */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-5
                        sm:p-6
                      "
                    >
                      <p
                        className="
                          mb-1.5
                          text-[0.6rem]
                          font-bold
                          uppercase
                          tracking-[0.22em]
                          text-(--primary)
                        "
                      >
                        Automation Expertise
                      </p>

                      <h3
                        className="
                          max-w-2xl
                          text-xl
                          font-bold
                          leading-tight
                          text-white
                          sm:text-2xl
                        "
                      >
                        {activeSpec.title}
                      </h3>

                       {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                      <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      
                    "
                  >
                    <p
                      className="
                        max-w-2xl
                        text-sm
                        mt-2
                        leading-6
                        text-slate-300
                      "
                    >
                      {activeSpec.text}
                    </p>

                    {/* Counter */}

                    <div
                      className="
                        shrink-0
                        text-[0.65rem]
                        font-bold
                        tracking-[0.15em]
                        text-slate-500
                      "
                    >
                      {String(activeIndex + 1).padStart(2, "0")}
                      {" / "}
                      {String(
                        specializations.length
                      ).padStart(2, "0")}
                    </div>
                  </div>

                    </div>
                  </div>

                 
                  
                </motion.div>
              </AnimatePresence>
            </div>

            {/* =================================================
                RIGHT SIDE TITLE NAVIGATION
            ================================================= */}

            <div
              className="
                hidden
                rounded-2xl
                border
                border-white/10
                bg-(--dark2)
                p-2.5
                lg:flex
                lg:flex-col
              "
            >
              {/* Navigation Heading */}

              <div className="mb-2 px-3 pt-2">
                <span
                  className="
                    text-[0.6rem]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-(--primary)
                  "
                >
                  Specializations
                </span>
              </div>

              {/* Title List */}

              <div className="flex flex-col gap-0.5">
                {specializations.map(
                  (spec, index) => (
                    <button
                      key={spec.title}
                      type="button"
                      onClick={() =>
                        handleTitleClick(index)
                      }
                      className={`
                        group
                        relative
                        w-full
                        rounded-lg
                        px-3
                        py-2.5
                        text-left
                        text-[0.7rem]
                        font-semibold
                        leading-5
                        transition-colors
                        duration-200

                        ${
                          activeIndex === index
                            ? "bg-(--primary)/10 text-(--primary)"
                            : "text-white hover:bg-white/[0.04] hover:text-(--primary)"
                        }
                      `}
                    >
                      {/* Active Cyan Indicator */}

                      <span
                        className={`
                          absolute
                          left-0
                          top-1/2
                          h-5
                          w-[2px]
                          -translate-y-1/2
                          rounded-full
                          bg-(--primary)
                          transition-opacity
                          duration-200

                          ${
                            activeIndex === index
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        `}
                      />

                      {spec.title}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              MOBILE TITLE NAVIGATION
          ================================================= */}

          

          {/* =================================================
              CONTROLS
          ================================================= */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
            "
          >
            {/* Previous */}

            {/* <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous specialization"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                bg-white/[0.04]
                text-white
                transition-colors
                duration-200
                hover:border-(--primary)/40
                hover:bg-(--primary)/10
                hover:text-(--primary)
              "
            >
              <ChevronLeft size={18} />
            </button> */}

            {/* Next */}

            {/* <button
              type="button"
              onClick={nextSlide}
              aria-label="Next specialization"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                bg-white/[0.04]
                text-white
                transition-colors
                duration-200
                hover:border-(--primary)/40
                hover:bg-(--primary)/10
                hover:text-(--primary)
              "
            >
              <ChevronRight size={18} />
            </button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Specialization;
