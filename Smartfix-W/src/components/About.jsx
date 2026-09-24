import { ArrowRight, CheckCircle2, Cpu, Factory, Gauge, Network, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

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

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

const About = () => {
  return (
    <div className="bg-[#03131f] text-white" id="about">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_45%),linear-gradient(180deg,#081b2b_0%,#051621_100%)] pt-32 pb-20 sm:pt-36">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
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

              <div className="mt-8 flex flex-wrap gap-4">
                <MotionLink
                  to="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Back to Home
                  <ArrowRight size={17} />
                </MotionLink>
                <MotionLink
                  to="/#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/50 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  Enquire Now
                </MotionLink>
              </div>
            </motion.div>

            <motion.div
              className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/60 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur-sm"
              initial={{ opacity: 0, x: 40, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-5">
                  <Factory className="h-8 w-8 text-cyan-300" />
                  <p className="mt-4 text-2xl font-black text-white">Plant-wide</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Control and automation coverage across industries.</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-5">
                  <ShieldCheck className="h-8 w-8 text-cyan-300" />
                  <p className="mt-4 text-2xl font-black text-white">Safety</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Reliable system integrity with standards-focused engineering.</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-5 sm:col-span-2">
                  <Wrench className="h-8 w-8 text-cyan-300" />
                  <p className="mt-4 text-2xl font-black text-white">Lifecycle Support</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Consultation, installation, retrofits, troubleshooting, maintenance, and technical training.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Our focus</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            Practical automation engineering built around your production realities.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {strengths.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              className="rounded-3xl border border-slate-800 bg-[#0a1a2b] p-6 shadow-[0_20px_45px_rgba(2,6,23,0.28)]"
              initial={{ opacity: 0, y: 40, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-800 bg-[#091b2b] py-20">
        <div className="mx-auto grid max-w-8xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">What we deliver</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
              End-to-end industrial automation services.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {servicePillars.map((item, index) => (
              <motion.div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-[#0b1f2e] p-4 text-slate-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Technology platforms</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            Specialists in leading automation technologies.
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {technologyStack.map((tech, index) => (
            <motion.span
              key={tech}
              className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-100 inline-block"
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
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Why choose us</p>
          <h3 className="mt-4 max-w-2xl text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
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
