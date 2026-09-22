import { useContext } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, Mail, Phone } from "lucide-react";
import { ContactContext } from "../context/ContactContext.jsx";
import { motion } from "framer-motion";
import { use3DTilt } from "../hooks/use3DTilt.js";

const Contact = () => {
  const { form, submitted, error, updateField, submit } = useContext(ContactContext);
  const tilt = use3DTilt({ maxRotation: 3, scale: 1.01 });

  return (
    <section id="contact" className="relative overflow-hidden bg-[#020d1a] py-14 text-white sm:py-18">
      <motion.div 
        className="relative mx-auto grid max-w-8xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.15 }} 
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="max-w-xl"
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
        >
          <p className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cyan-300">
            Start an enquiry
          </p>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
            Let’s build a smarter, <span className="text-cyan-400">more reliable operation.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
            Smartfix Automation helps manufacturers, processing plants, and packaging operations improve
            productivity with industrial automation, PLC programming, HMI design, VFD integration, and machine
            safety solutions.
          </p>

          <div className="mt-10 space-y-5 text-sm text-slate-300">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0 }}
            >
              <Mail size={18} className="text-cyan-300" />
              <div className="flex flex-col justify-center">
                <span className="text-lg font-bold">Email Us</span>
                <a href="mailto:info@smartfixautomation.com" className="text-slate-300 hover:text-blue-600">
                  info@smartfixautomation.com
                </a>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }}
            >
              <Phone size={18} className="text-cyan-300" />
              <div className="flex flex-col justify-center">
                <span className="text-lg font-bold">Call Us</span>
                <a href="tel:+919894571542" className="text-slate-300 hover:text-blue-600">
                  +91 9894571542
                </a>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }}
            >
              <Clock3 size={18} className="text-cyan-300" />
              <div className="flex flex-col justify-center">
                <span className="text-lg font-bold">Business Hours</span>
                <span className="text-slate-300">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.form
          {...tilt}
          onSubmit={submit}
          noValidate
          className="h-fit self-start rounded-[1.75rem] border border-sky-400/15 bg-[linear-gradient(180deg,rgba(13,27,42,0.96),rgba(7,17,29,0.96))] p-6 shadow-[0_18px_45px_rgba(2,6,23,0.28)] sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-200">
              Your name *
              <input
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={updateField}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 font-normal text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                placeholder="Full name"
              />
            </label>

            <label className="text-sm font-semibold text-slate-200">
              Company
              <input
                name="company"
                autoComplete="organization"
                value={form.company}
                onChange={updateField}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 font-normal text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                placeholder="Company name"
              />
            </label>

            <label className="text-sm font-semibold text-slate-200">
              Work email *
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={updateField}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 font-normal text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                placeholder="you@company.com"
              />
            </label>

            <label className="text-sm font-semibold text-slate-200">
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={updateField}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 font-normal text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                placeholder="Optional"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-semibold text-slate-200">
            What do you need?
            <select
              name="service"
              value={form.service}
              onChange={updateField}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 font-normal text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            >
              <option className="bg-[#020d1a]" value="">Select a service</option>
              <option className="bg-[#020d1a]">Automation engineering</option>
              <option className="bg-[#020d1a]">System integration</option>
              <option className="bg-[#020d1a]">Migration or retrofit</option>
              <option className="bg-[#020d1a]">Commissioning and support</option>
              <option className="bg-[#020d1a]">Plant automation design</option>
            </select>
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-200">
            Project details *
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={updateField}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 font-normal text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              placeholder="Tell us about your equipment, process, or automation goals."
            />
          </label>

          {error && (
            <p className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          {submitted && (
            <p className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              <CheckCircle2 size={18} />
              Your enquiry has been prepared successfully.
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Send enquiry
            <ArrowUpRight size={17} />
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
