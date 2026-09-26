import { useRef } from "react";
import { CheckCircle2, Cpu, Gauge, Network, ShieldCheck, Monitor, Radio, Cloud, Layers3, CircleGauge } from "lucide-react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import icon from "../assets/icon.png"

const strengths = [
  {
    title: "Rockwell & Siemens Expertise",
    description: "Deep experience across Allen-Bradley, Rockwell Automation, and Siemens platforms for reliable production control.",
    icon: Cpu,
  },
  {
    title: "End-to-End Integration",
    description: "From field devices and PLCs to HMIs, drives, safety systems, and plant-wide networking we deliver integrated solutions.",
    icon: Network,
  },
  {
    title: "Performance-Focused Engineering",
    description: "Every project is designed around maintainability, productivity, and long-term operational continuity.",
    icon: Gauge,
  },
];

const servicePillars = [
  "Technical consultation",
  "System integration",
  "Installation and commissioning",
  "Migration and upgrades",
  "Machine retrofitting",
  "Field and remote troubleshooting",
  "Electrical maintenance",
  "Industrial training",
];

const technologyStack = [
  "CompactLogix",
  "ControlLogix",
  "PanelView",
  "PowerFlex",
  "Kinetix",
  "GuardLogix",
  "FactoryTalk",
  "S7-1200",
  "S7-1500",
  "SINAMICS",
  "SIMOTICS",
  "TIA Portal",
  "PROFINET",
  "WinCC",
];

// Example content: replace every year, claim and description with verified company history before publishing.
const milestones = [
  {
    year: "2016",
    title: "SmartFix Automation founded",
    description: "Started as a small controls team retrofitting relay panels for local manufacturers.",
  },
  {
    year: "2018",
    title: "First plant-wide PLC migration",
    description: "Delivered a full PLC-5 to CompactLogix migration for a production line without a stoppage.",
  },
  {
    year: "2020",
    title: "Siemens platforms added",
    description: "Expanded the stack to TIA Portal and SINAMICS drives to serve a wider range of clients.",
  },
  {
    year: "2022",
    title: "50+ installations completed",
    description: "Crossed fifty commissioned systems across food processing, packaging, and metal fabrication.",
  },
  {
    year: "2023",
    title: "Remote support desk launched",
    description: "Stood up a dedicated remote troubleshooting line for faster turnaround on production-down calls.",
  },
  {
    year: "2025",
    title: "Safety-system certification",
    description: "Became certified to design and validate GuardLogix safety-rated control systems.",
  },
];

const orbitNodes = [
  { label: "PLC", icon: Cpu, x: 50, y: 12 },
  { label: "HMI", icon: Monitor, x: 83, y: 24 },
  { label: "VFD", icon: CircleGauge, x: 89, y: 59 },
  { label: "SERVO", icon: Layers3, x: 70, y: 86 },
  { label: "SENSOR", icon: Radio, x: 30, y: 86 },
  { label: "SAFETY", icon: ShieldCheck, x: 11, y: 59 },
  { label: "NETWORK", icon: Network, x: 17, y: 24 },
]; 

function AutomationOrbit({ compact = false }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`relative mx-auto aspect-square w-full ${compact ? "max-w-[380px]" : "max-w-[520px]"}`} role="img" aria-label="SmartFix automation connected to PLC, HMI, VFD, servo, sensor, safety and network systems">
      {/* <div className="absolute inset-[7%] rounded-full border border-cyan-400/10" /> */}
      {/* <div className="absolute inset-[17%] rounded-full border border-dashed border-cyan-400/10" /> */}
      <motion.div className="absolute inset-[7%] rounded-full" />
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
        {orbitNodes.map((node, index) => (
          <g key={node.label}>
            <line x1="50" y1="50" x2={node.x} y2={node.y} stroke="var(--primary)" strokeOpacity=".3" strokeDasharray="1 1" strokeWidth=".2" />
            {!reduceMotion && (
              <motion.circle
                cx={50} cy={50} r={0.8} fill="var(--primary)"
                style={{ filter: "drop-shadow(0 0 2px var(--primary))" }}
                initial={{ opacity: 0 }}
                animate={{ cx: [50, node.x, 50], cy: [50, node.y, 50], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.2 + index * 0.25, delay: index * 0.18, repeat: Infinity, ease: "linear" }}
              />
            )}
          </g>
        ))}
      </svg>
      <motion.div className="absolute left-1/2 top-1/2 grid h-[10%] w-[12%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[50%] shadow-[0_0_42px_rgba(0,160,210,.28)]" animate={reduceMotion ? {} : { boxShadow: ["0 0 16px rgba(0,160,210,.2)", "0 0 42px rgba(0,160,210,.5)", "0 0 16px rgba(0,160,210,.2)"] }} transition={{ duration: 3, repeat: Infinity }}><img src={icon} className="h-full w-full " /></motion.div>
      {orbitNodes.map(({ label, icon: Icon, x, y }, index) => (
        <motion.div key={label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: `${x}%`, top: `${y}%` }} initial={reduceMotion ? false : { opacity: 0, scale: .65 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .08, duration: .45 }}>
          <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/20 bg-[#112546] text-cyan-400 shadow-[0_8px_24px_rgba(0,0,0,.3)] sm:h-14 sm:w-14"><Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} /></div>
          <span className="text-[8px] font-bold tracking-widest text-slate-400 sm:text-[10px]">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function JourneyTimeline() {
  const timelineRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.8", "end 0.2"] });
  return (
    <div ref={timelineRef} className="relative mx-auto mt-12 max-w-full space-y-10 sm:space-y-12">
      <div className="absolute bottom-0 left-5 top-0 w-0.5 bg-cyan-400/15 md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
        <motion.div className="h-full w-full origin-top bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,.7)]" style={{ scaleY: scrollYProgress }} />
      </div>
      {milestones.map((milestone, index) => {
        const cardOnLeft = index % 2 === 0;
        return (
          <div key={`${milestone.year}-${index}`} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-4 md:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:gap-x-6">
            <motion.article
              className={`col-start-2 row-start-1 min-w rounded-2xl border border-cyan-400/20 bg-[#091b2b]/90 p-5 shadow-[0_16px_40px_rgba(0,0,0,.18)] sm:p-6 ${cardOnLeft ? "md:col-start-1" : "md:col-start-3"}`}
              initial={reduceMotion ? false : { opacity: 0, x: cardOnLeft ? -48 : 48, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold tracking-widest text-cyan-300">{milestone.year}</p>
              <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">{milestone.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{milestone.description}</p>
            </motion.article>
            <span className="relative z-10 col-start-1 row-start-1 mx-auto grid h-10 w-10 place-items-center rounded-full border border-cyan-300/40 bg-[#092231] shadow-[0_0_18px_rgba(34,211,238,.35)] md:col-start-2 md:h-3 md:w-3 md:border-2 md:border-cyan-300 md:bg-[#03131f]" aria-hidden="true">
              <img src={icon} alt="" className="h-7 w-7 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,.8)] md:hidden" />
            </span>
            <div className={`hidden row-start-1 items-center justify-center md:flex ${cardOnLeft ? "md:col-start-3" : "md:col-start-1"}`} aria-hidden="true">
              
            </div>
          </div>
        );
      })}
    </div>
  );
}

const About = () => {
  return (
    <div className="bg-[] text-white" id="about">
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12 py-2">
          <div className="grid items-center gap-10 lg:grid-cols-[1.0fr_0.5fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cyan-300">
                About SmartFix Automation
              </p>
              <h1 className="mt-4 text-[clamp(1.65rem,3vw,3.5rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white">
                Industrial automation solutions for smarter, more reliable operations.
              </h1>
              <p className="mt-5 max-w-2xl text-[clamp(0.8rem,1vw,1rem)] leading-[1.85] text-slate-300">
                SmartFix Automation is an industrial automation and system integration company delivering reliable automation solutions,
                engineering services, and technical support for modern industrial operations across India.
              </p>

            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <AutomationOrbit />
            </motion.div>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-8xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            From a small controls shop to a plant-wide automation partner.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The moments that shaped our engineering journey.
          </p>
        </div>
        <JourneyTimeline />
      </section>

      <section className="mx-auto max-w-8xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            Practical automation engineering built around your production realities.
          </h2>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {strengths.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              className="border-l-2 border-cyan-400/30 pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-800 py-20">
        <div className="mx-auto grid max-w-8xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
              End-to-end industrial automation services.
            </h2>
          </div>

          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {servicePillars.map((item, index) => (
              <motion.div
                key={item}
                className="flex items-start gap-3 border-b border-slate-800/70 pb-4 text-slate-200"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={18} />
                <span className="text-sm leading-6">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            Specialists in leading automation technologies.
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {technologyStack.map((tech, index) => (
            <motion.span
              key={tech}
              className="inline-block rounded-full border border-cyan-400/20 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-100"
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-5 pb-20 sm:px-8 lg:px-12">
        <motion.div
          className="rounded-[2rem] border border-cyan-400/15 bg-[linear-gradient(180deg,#0a1e2d,#061521)] p-8 shadow-[0_30px_80px_rgba(2,6,23,0.35)] sm:p-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, scale: [0.97, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="max-w-2xl text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            Dependable automation engineering and responsive technical support.
          </h3>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            With a focus on dependable automation engineering and responsive technical support, SmartFix Automation helps industries move
            toward smarter, safer, and more efficient industrial operations.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
