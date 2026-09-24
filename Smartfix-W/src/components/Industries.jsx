import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import manuf from "../assets/hero.jpg"

const industries = [
  {
    number: "01",
    title: "Manufacturing",
    text: "Consistent, measurable performance on the production floor with resilient automation systems.",
    image: manuf,
  },
  {
    number: "02",
    title: "Packaging & Material Handling",
    text: "Smarter machine coordination and dependable throughput for fast-moving operations.",
    image: "/images/packaging.jpg",
  },
  {
    number: "03",
    title: "Process Industries",
    text: "Better visibility, control, traceability, and safety for complex process environments.",
    image: "/images/process-industries.jpg",
  },
  {
    number: "04",
    title: "Food & Agriculture",
    text: "Practical automation solutions for quality-critical operations and efficient production.",
    image: "/images/food-agriculture.jpg",
  },
];



//   const { ref, style, onMouseMove, onMouseLeave } = use3DTilt({ maxRotation: 5, perspective: 1200 });

//   return (
//     <motion.article
//       ref={ref}
//       style={style}
//       onMouseMove={onMouseMove}
//       onMouseLeave={onMouseLeave}
//       initial={{ opacity: 0, y: 40, rotateX: -8 }}
//       whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_40px_rgba(2,6,23,0.22)] hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.06]"
//     >
//       <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_55%)] opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden="true" />
      
//       <div className="relative z-10 flex items-start gap-4">
//         <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/35 bg-cyan-500/10 text-cyan-300">
//           <Icon size={20} />
//         </div>
//         <div className="min-w-0">
//           <h3 className="text-[1.05rem] font-bold text-white sm:text-[1.35rem]">{title}</h3>
//           <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">{text}</p>
//         </div>
//       </div>
//     </motion.article>
//   );
// };

const IndustryCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeIndustry = industries[activeIndex];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-none">
      <div className="w-full">

        {/* Main Book Card */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(2,6,23,0.35)]">

          <div className="flex min-h-[450px] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 lg:flex-row">

  {/* =========================================================
      LEFT - IMAGE + CONTENT
  ========================================================= */}
  <div className="relative min-w-0 flex-1">

    {/* IMAGE */}
    <div className="relative h-[420px] w-full overflow-hidden sm:h-[420px] lg:h-[450px]">

      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndustry.image}
          src={activeIndustry.image}
          alt={activeIndustry.title}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* =====================================================
          STRONG IMAGE OVERLAY
      ===================================================== */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-slate-950
          via-slate-950/75
          to-slate-950/10
        "
      />

      {/* Extra side overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-slate-950/35
          via-transparent
          to-transparent
        "
      />

      {/* =====================================================
          TEXT INSIDE IMAGE
      ===================================================== */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl"
          >

          
            {/* TITLE */}
            <h3
              className="
                text-2xl
                font-bold
                leading-tight
                text-white
                sm:text-3xl
                lg:text-4xl
              "
            >
              {activeIndustry.title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-slate-200/90
                sm:text-base
                sm:leading-7
              "
            >
              {activeIndustry.text}
            </p>

          </motion.div>
        </AnimatePresence>

      </div>

      
    </div>
  </div>


  {/* =========================================================
      RIGHT - NUMBER NAVIGATION
  ========================================================= */}
  <div
    className="
      flex
      w-full
      shrink-0
      items-center
      justify-center
      border-t
      border-white/10
      bg-slate-950/70
      px-5
      py-6
      lg:w-[90px]
      lg:border-l
      lg:border-t-0
      lg:px-4
      lg:py-8
    "
  >
{/* number side animation */}
    <div className="flex items-center gap-4 lg:flex-col lg:gap-6">

      {industries.map((industry, index) => (
        <div
          key={industry.number}
          className="group relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >

          {/* =================================================
              TITLE ON HOVER
          ================================================= */}
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute
                  right-[calc(100%+10px)]
                  top-1/2
                  hidden
                  -translate-y-1/2
                  whitespace-nowrap
                  rounded-lg
                  
                  text-xs
                  font-semibold
                  text-white
                  
                  lg:block
                "
              >
                {industry.title}
              </motion.div>
            )}
          </AnimatePresence>


          {/* =================================================
              NUMBER CIRCLE
          ================================================= */}
          <button
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${industry.title}`}
            className={`
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              text-sm
              font-bold
              transition-all
              duration-300

              ${
                activeIndex === index
                  ? `
                    border-cyan-300
                    bg-(--primary)
                    text-slate-950
                    shadow-[0_0_25px_rgba(34,211,238,0.35)]
                  `
                  : `
                    border-white/15
                    bg-white/[0.04]
                    text-slate-400
                    hover:border-cyan-300/50
                    hover:bg-cyan-400/10
                    hover:text-(--primary)
                  `
              }
            `}
          >
            {industry.number}

            </button>

        </div>
      ))}

    </div>
  </div>

</div>

          {/* Progress */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
            <motion.div
              key={activeIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-(--primary)"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

const Industries = () => (
  <section id="industries" className="relative overflow-hidden bg-[#020d1a] py-12 text-white sm:py-14 ">
         <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,168,232,0.25),transparent)]"/>

    <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-(--primary)">
            Industries we serve
          </p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.65rem,3vw,3.5rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white">
            Automation solutions for <span className="text-(--primary)">high-performance</span> operations.
          </h2>
        </div>
        <p className="max-w-xl text-[clamp(0.8rem,1vw,1rem)] leading-[1.85] text-slate-300">
          Every industry has different pressures. We design systems around uptime, quality, safety,
          and the people who rely on them every day.
        </p>
      </motion.div>

      <IndustryCard />
    </div>
  </section>
);

export default Industries;
