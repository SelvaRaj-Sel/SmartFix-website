import { useContext } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactContext } from "../context/ContactContext.jsx";
import { motion } from "framer-motion";
import { use3DTilt } from "../hooks/use3DTilt.js";

const Contact = () => {
  const { form, submitted, error, updateField, submit } = useContext(ContactContext);
  const tilt = use3DTilt({ maxRotation: 3, scale: 1.01 });

  return (
    <section id="contact" className="relative overflow-hidden bg-[#020d1a] py-12 text-white sm:py-14">
       <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,168,232,0.25),transparent)]"/>

      <motion.div 
        className="relative mx-auto grid max-w-8xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"
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
          <p className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-(--primary)">
            Start an enquiry
          </p>
          <h2 className="mt-3 max-w-3xl text-[2.4rem] font-semibold leading-[1] tracking-[-0.035em] text-white sm:text-4xl lg:text-[3.5rem]">
            Let’s build a smarter, <span className="text-(--primary)">more reliable operation.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
            Smartfix Automation helps manufacturers, processing plants, and packaging operations improve
            productivity with industrial automation, PLC programming, HMI design, VFD integration, and machine
            safety solutions.
          </p>

          <div className="mt-3 space-y-3 text-sm text-slate-300">
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
                <span className="text-slate-300">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

       <motion.div
  className="relative w-full max-w-7xl overflow-hidden rounded-[1.75rem] border border-sky-400/15 bg-slate-950 shadow-[0_18px_45px_rgba(2,6,23,0.28)]"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.6 }}
>
  {/* Location Header */}
  <div className="flex flex-col gap-4 mt-2 border-b border-white/10 px-1 sm:flex-row sm:items-center sm:justify-between sm:px-4 lg:px-6">
    <div className="flex min-w-0 items-start gap-3">
      <MapPin
        size={20}
        className="mt-0.5 shrink-0 text-(--primary)"
      />

      <div className="min-w-0">
        <h3 className="font-semibold text-white">
          Visit our location
        </h3>

        <p className="text-sm leading-6 text-slate-300">
          No. 5/12, Chetty Street, Poonamallee, Chennai – 600056
        </p>
      </div>
    </div>

    <a
      href="https://maps.app.goo.gl/DbJPnYrqurL6dK6s6"
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 self-start text-sm font-semibold text-(--primary) transition hover:text-cyan-200 sm:self-auto"
    >
      Get directions
    </a>
  </div>

  {/* Responsive Google Map */}
  <div className="w-full">
    <iframe
      title="Smartfix Automation location"
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d640.202793592275!2d80.09917240193509!3d13.050638516292883!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528bf0b94bdf6b%3A0xf5fcfd56d4f385bb!2sSmartfix%20Automation!5e1!3m2!1sen!2sin!4v1790139853136!5m2!1sen!2sin"
      className="block h-[280px] w-full border-0 sm:h-[380px] md:h-[440px] lg:h-[500px]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      
       
    />
  </div>
</motion.div>
      </motion.div>

      
    </section>
  );
};

export default Contact;
