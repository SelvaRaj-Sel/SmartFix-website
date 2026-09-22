import {
  ArrowUpRight,
  BriefcaseBusiness,
  Cable,
  Cog,
  Cpu,
  Gauge,
  GraduationCap,
  Radar,
  Settings2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { use3DTilt } from "../hooks/use3DTilt.js";
import tech from "../assets/hero.jpg";

const services = [
 
  {
    id: "01",
    icon: BriefcaseBusiness,
    bgimage: tech,
    title: "Technical Consultant",
    text: "Expert assessment of your automation needs with tailored Rockwell and Siemens solutions.",
  },
  {
    id: "02",
    icon: Settings2,
    title: "Installation & Commissioning",
    text: "Complete hardware installation, software configuration, and commissioning of automation systems.",
  },
  {
    id: "03",
    icon: Cpu,
    title: "Migration & Upgrades",
    text: "Seamless migration from legacy systems to modern Rockwell and Siemens platforms.",
  },
  {
    id: "04",
    icon: Cable,
    title: "System Integration",
    text: "Turnkey integration of PLC, HMI, drives, safety, and network systems across your plant.",
  },
  {
    id: "05",
    icon: Wrench,
    title: "Retrofit Solutions",
    text: "Upgrade existing machinery with modern automation components for improved performance.",
  },
  {
    id: "06",
    icon: Gauge,
    title: "Field & Remote Support",
    text: "24/7 on-site and remote troubleshooting, even for remote areas that others cannot service.",
  },
  {
    id: "07",
    icon: ShieldCheck,
    title: "Electrical Maintenance",
    text: "Preventive and corrective electrical maintenance contracts (EMC) for industrial plants.",
  },
  {
    id: "08",
    icon: GraduationCap,
    title: "Training & Education",
    text: "Industrial training programs, automation lab setups, and PLC-based control project mentoring.",
  },
];

const ServiceCard = ({ icon: Icon, title, text, index, bgimage }) => {
  const tilt = use3DTilt({ maxRotation: 5 });

  return (
    <motion.article
      ref={tilt.ref}
      style={{ ...tilt.style, perspective: 1200 }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      initial={{
        opacity: 0,
        y: 40,
        rotateX: -10,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="
        group relative
        min-h-[320px]
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-(--dark2)
        shadow-[0_18px_40px_rgba(2,6,23,0.22)]
        transition-all duration-700
        hover:border-cyan-300/35
        hover:shadow-[0_25px_60px_rgba(0,160,210,0.20)]
      "
    >

      {/* =========================================
          BACKGROUND IMAGE
      ========================================= */}
      {bgimage && (
        <img
          src={bgimage}
          alt=""
          aria-hidden="true"
          className="
            absolute inset-0
            h-full w-full
            object-cover
            scale-100
            transition-transform
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-110
          "
        />
      )}

      {/* =========================================
          DARK SHADOW LAYER
      ========================================= */}
      <div
        className="
          absolute inset-0 z-[1]
          bg-gradient-to-t
          from-[#020d1a]/100
          via-[#020d1a]/90
          to-[#020d1a]/60
          transition-all duration-700
          group-hover:from-[#020d1a]/90
          group-hover:via-[#020d1a]/60
          group-hover:to-[#020d1a]/20
        "
        aria-hidden="true"
      />

      {/* =========================================
          CONTENT
      ========================================= */}
      <div
        className="
          relative z-10
          flex min-h-[320px]
          flex-col justify-end
          p-7
          transition-transform duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:-translate-y-2
        "
      >
<div className="flex items-center gap-3">
   {/* ICON */}
        <div
          className="
            inline-flex
            w-fit
            rounded-2xl
            border border-cyan-400/30
            bg-(--dark2)
            p-2
            text-(--primary)
            shadow-[0_8px_25px_rgba(0,0,0,0.30)]
            backdrop-blur-md
            transition-all duration-500
            group-hover:scale-110
            group-hover:border-cyan-300/60
            group-hover:bg-(--dark2)/10
            group-hover:shadow-[0_0_30px_rgba(34,211,238,0.20)]
          "
        >
          <Icon
            size={22}
            className="
              transition-transform duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* TITLE */}
        <h3
          className="            
            text-[1.15rem]
            font-semibold
            text-white
            drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]
            transition-colors duration-500
            group-hover:text-cyan-100
          "
        >
          {title}
        </h3>
  </div>
       

        {/* DESCRIPTION */}
        <p
          className="
            mt-3
            text-sm
            leading-6
            text-slate-200
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
          "
        >
          {text}
        </p>

        
      </div>

      {/* =========================================
          TOP BORDER SHINE
      ========================================= */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0 z-20
          h-px
          bg-gradient-to-r
          from-transparent
          via-(--primary)/50
          to-transparent
          opacity-0
          transition-opacity duration-700
          group-hover:opacity-100
        "
        aria-hidden="true"
      />

    </motion.article>
  );
};

const Services = () => (
  <section id="services" className="relative isolate overflow-hidden bg-[#020d1a] py-12 text-white sm:py-14">
     <div
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,168,232,0.2),transparent)]"
      aria-hidden="true"
    />
    <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        className="mb-12 max-w-3xl"
      >
        <p className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-(--primary)">
          Our services
        </p>
        <h2 className="mt-3 text-[2.75rem] text-white font-semibold leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-[4.25rem]">
          From a single machine to a <span className="text-(--primary)">{""} smarter operation</span>
        </h2>
        <p className="mt-6 max-w-2xl leading-7 text-slate-300">
          Our engineers turn production requirements into robust, maintainable automation systems—without
          overcomplicating the work.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
