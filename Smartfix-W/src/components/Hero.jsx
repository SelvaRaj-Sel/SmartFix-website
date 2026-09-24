import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import heroImage from "../assets/hero.jpg";
import heroBackground from "../assets/hero-bg.jpg";
import heroIndustrial from "../assets/hero1.jpg";
import rockwell from "../assets/rockwell-logo1.png";
import siemens from "../assets/Siemens-Logo.png";
import weinteck from "../assets/WEINTEK-LOGO.png";
import prosoft from "../assets/Prosoft-Logo.png";
import "./Hero.css";

const slides = [heroImage, heroBackground, heroIndustrial];
const brands = [
  { name: "Rockwell Automation", logo: rockwell },
  { name: "Siemens", logo: siemens },
  { name: "Weintek", logo: weinteck },
  { name: "Prosoft", logo: prosoft },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <AnimatePresence initial={false}>
        <motion.img
          key={activeSlide}
          src={slides[activeSlide]}
          alt=""
          aria-hidden="true"
          className="hero-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.2 }}
        />
      </AnimatePresence>
      <div className="hero-overlay" />
      <div className="hero-container max-w-8xl px-5 sm:px-8 lg:px-12">
        <div className="hero-layout">
          <div className="hero-copy">
  <p className="m-0 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-(--primary)">
  We Are System Integrator
</p>

  <h1
    id="hero-title"
    className="
      mt-4
      text-[clamp(1.65rem,3vw,3.5rem)]
      font-semibold
      leading-[1.18]
      tracking-[-0.035em]
    "
  >
    <span className="block">
      Industrial Automation
    </span>

    <span className="mt-1 block text-(--primary)">
      Powered by the Best
    </span>
  </h1>

  <p
    className="
      mt-5
      max-w-[550px]
      text-[clamp(0.8rem,1vw,1rem)]
      leading-[1.85]
      text-slate-300
    "
  >
    Your trusted product for Rockwell Automation and Siemens solutions.
    We deliver expert system integration, commissioning, migration, and
    24/7 support for industries across India.
  </p>
</div>
 

        </div>

        <div className="hero-brands">
          <div className="hero-brands-heading">
            <p className="m-0 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Our Clients</p>

          </div>
          <div className="hero-logo-window">
            <div className="hero-logo-track">
              {[0, 1, 2].map((copy) => (
                <div className="hero-logo-group" key={copy} aria-hidden={copy > 0 ? true : undefined}>
                  {brands.map((brand) => (
                    <div className="hero-brand" key={brand.name}>
                      <img src={brand.logo} alt={copy === 0 ? brand.name : ""} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
