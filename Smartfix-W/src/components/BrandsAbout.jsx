import rockwellLogo from "../assets/rockwell-logo1.png";
import siemensLogo from "../assets/Siemens-Logo.png";
import festologo from "../assets/festo-logo.png";
import prosoftlogo from "../assets/Prosoft-Logo.png";
import AnimatedSection from "./AnimatedSection.jsx";
import mitsubilogo from "../assets/mitsubi-logo.png";
import weintek from "../assets/WEINTEK-LOGO.png";
import micro800 from "../assets/Rockwell/micro 800.jpg"
import abblogo from "../assets/ABB_logo.png"
import schneiderlogo from "../assets/schneider-logo.png"
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const products = [
  {
  accent: "#C41230",
  logo: rockwellLogo,
  logoClass: "h-12 w-full object-contain sm:h-14",
  specialistcontent: "We are handling PLCs and HMI VFD and servo vision system and field instruments ",
  category:["micro 800","micro 800","micro 800","micro 800","micro 800","micro 800","micro 800","micro 800","micro 800"],
  description: "Complete Allen-Bradley and Rockwell Automation solutions for dependable machine control.",
  productlist: [
    { id: 1, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging", "Small machine control", "Packaging", "Packaging", "Packaging", "Packaging", "Packaging",] },
    { id: 2, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 3, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 4, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 5, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 6, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 7, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 8, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 9, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 10, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 11, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 12, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 13, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 14, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 15, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
  ],
},
{
  accent: "#009999",
  logo: siemensLogo,
  logoClass: "h-11 w-full object-contain sm:h-13",
  specialistcontent: "We are handling PLCs and HMI VFD and servo vision system and field instruments ",
  category:["micro 800","micro 800","micro 800","micro 800","micro 800","micro 800","micro 800","micro 800","micro 800"],
  description: "Integrated Siemens technology for efficient, scalable industrial control systems.",
  productlist: [
    { id: 1, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 2, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 3, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 4, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 5, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 6, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 7, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 8, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 9, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 10, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 11, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 12, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 13, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
    { id: 14, img: micro800, title: "Micro ", application:["Small machine control", "Packaging"] },
    { id: 15, img: micro800, title: "Micro 800", application:["Small machine control", "Packaging"] },
  ],
},
];

const brandslogo =[festologo, prosoftlogo, mitsubilogo, weintek, abblogo, schneiderlogo];

const BrandCard = ({ product }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeProduct = product.productlist[activeSlide];
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered || product.productlist.length < 2) return undefined;

    const slider = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % product.productlist.length);
    }, 4500);

    return () => window.clearInterval(slider);
  }, [hovered, product.productlist]);

  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-white/15 bg-(--dark2) text-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_18px_50px_rgba(2,6,23,0.35)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-x-0 top-0 z-20 h-1" style={{ backgroundColor: product.accent }} />

      <div className="relative z-10 border-b border-white/10 p-5 sm:p-6">
        <div className="grid items-start gap-3 sm:grid-cols-[minmax(130px,0.65fr)_minmax(0,1.35fr)]">
          <div className="flex h-14 items-center justify-center sm:h-16">
            <img
              src={product.logo}
              alt="Automation brand"
              className={`${product.logoClass} `}
            />
          </div>

          <div className="min-w-0 sm:border-l sm:border-white/10 sm:pl-5">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-(--primary)">
              Our specialization
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {product.specialistcontent}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t  border-white/10 pt-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-(--primary)">
            Categories
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.category.map((category, index) => (
              <span
                key={`${category}-${index}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, x: 56 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -56 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid overflow-hidden rounded-2xl bg-white/[0.025] sm:grid-cols-[32%_68%]"
          >
            <div className="relative flex min-h-56 flex-col border-b border-white/10 bg-white p-4 sm:min-h-72 sm:border-r sm:border-b-0 sm:p-5">
              <div className="flex min-h-0 flex-[3] items-center justify-center">
                <img
                  src={activeProduct.img}
                  alt={activeProduct.title}
                  className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-[2] items-center border-t border-slate-200 pt-3">
                <p className="text-center text-[0.65rem] leading-4 text-slate-600 sm:text-xs sm:leading-5">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="relative min-w-0 p-5 sm:p-7">
              <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
              {activeProduct.title}
              </h3>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-(--primary)">
                  Applications
                </p>
                <ul className="mt-3 flex flex-col w-50 hover:text-white">
                  {activeProduct.application.map((application, index) => (
                    <li
                      key={`${application}-${index}`}
                      className="flex min-w-0 items-start gap-2 rounded-lg  text-xs leading-5 text-slate-300"
                    >
                      <Check className="mt-0.5 shrink-0 h-4 font-bold" aria-hidden="true" style={{ color: product.accent }}/>
                      <span>{application}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5" aria-label="Product slideshow progress">
        {product.productlist.map((item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show ${item.title}`}
            aria-current={index === activeSlide ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeSlide ? "w-5 bg-(--primary)" : "w-1.5 bg-slate-400/60"
            }`}
          />
        ))}
      </div>
    </article>
  );
};

const BrandsAbout = () => {
  return (
    <section id="brands" className="relative isolate overflow-hidden bg-[#020d1a] py-12 text-white sm:py-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,168,232,0.2),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection variant="fadeUp" className="mb-3 max-w-5xl sm:mb-6">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-(--primary)">
            <p className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-(--primary)">
            Our Brands
          </p>
            
          </div>
          <h2 className="mt-3 text-[2.75rem] text-white font-semibold leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-[4.25rem]">
            The technology behind
            <span className="block text-(--primary)">better operations.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            We specialize in two of the world's most trusted automation brands, delivering certified expertise and genuine product solutions.
          </p>
        </AnimatedSection>

        <AnimatedSection variant="scale3D" stagger={0.15} className="flex gap-5">
          {products.map((product) => (
            <BrandCard key={product.logo} product={product} />
          ))}
          <div className="relative z-10 flex flex-col justify-around bg-gray-200 rounded-2xl">
          {brandslogo.map((brand, idx) => (
            <div key={idx} className="flex h-16 w-[150px] gap-5 items-center justify-center rounded-2xl p-5 transition-transform duration-300 hover:scale-105">
              <img src={brand} alt="Brand logo" className="max-h-12 w-auto max-w-full object-contain" />
            </div>
          ))}
        </div>
        </AnimatedSection>
        
      </div>
    </section>
  );
};

export default BrandsAbout;
