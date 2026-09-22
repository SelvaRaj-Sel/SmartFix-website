import { Link } from "react-router";
import textlogo from "../assets/logo-1.png";
import { motion } from "framer-motion";


const Footer = () => {
  return (
    <footer className="bg-[#020d1a] text-white">
      <div className="mx-auto max-w-8xl px-4 sm:px-8 pb-2 pt-1">
        <div className="flex items-center justify-end gap-2">
          <div className="bg-gradient-to-tl from-white via-sky-300 to-sky-700 rounded-tl-3xl sm:rounded-tl-4xl flex flex-wrap items-center justify-end pl-3 pr-2 py-1 min-h-12">
            <p className="text-center text-xs sm:text-sm pr-2 text-slate-900 font-medium">
              © 2026 SmartFix Automation.
            </p>

            <span className="hidden sm:block h-8 w-0.5 bg-slate-900/40"></span>

            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <div className="flex items-center gap-1">
                <img
                  src={textlogo}
                  alt="Smartfix"
                  className="h-8 sm:h-10 w-36 sm:w-44 object-contain object-left"
                />
              </div>
            </motion.div>
          </div>

          

          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 font-black text-white sm:text-xl">Quick Links</h3>
            <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
              {footerLinks.map((link) => (
                <motion.li key={link.label} className="transition hover:text-cyan-300" whileHover={{ x: 4 }} transition={{ type: 'spring' }}>
                  <Link to={link.to} className="inline-block">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 font-black text-white sm:text-xl">Our Services</h3>
            <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
              {serviceLinks.map((service) => (
                <motion.li key={service} className="transition hover:text-cyan-300" whileHover={{ x: 4 }} transition={{ type: 'spring' }}>
                  <p className="inline-block">
                    {service}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 font-black text-white sm:text-xl">Contact Info</h3>
            <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
              <motion.li className="transition hover:text-cyan-300" whileHover={{ x: 4 }} transition={{ type: 'spring' }}>
                <a href="tel:+919894571542">+91 9894571542</a>
              </motion.li>
              <motion.li className="transition hover:text-cyan-300" whileHover={{ x: 4 }} transition={{ type: 'spring' }}>
                <a href="mailto:info@smartfixautomation.com">info@smartfixautomation.com</a>
              </motion.li>
              <li className="leading-7 text-slate-300">
                No. 5/12, Chetty Street,<br />
                Poonamallee, Chennai – 600056
              </li>
            </ul>
          </motion.div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
