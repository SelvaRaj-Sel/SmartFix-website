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
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
  accent: "#C41230",
  logo: rockwellLogo,
  logoClass: "h-10 w-full object-contain sm:h-12",
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
  logoClass: "h-10 w-full object-contain sm:h-12",
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

  const showPreviousProduct = () => {
    setActiveSlide((current) =>
      current === 0 ? product.productlist.length - 1 : current - 1,
    );
  };

  const showNextProduct = () => {
    setActiveSlide((current) => (current + 1) % product.productlist.length);
  };

  useEffect(() => {
    if (hovered || product.productlist.length < 2) return undefined;

    const slider = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % product.productlist.length);
    }, 4500);

    return () => window.clearInterval(slider);
  }, [hovered, product.productlist]);

  return (
    <article
      className="group relative flex h-full min-w-0 w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-(--dark2) text-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_18px_50px_rgba(2,6,23,0.35)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-x-0 top-0 z-20 h-1" style={{ backgroundColor: product.accent }} />

      <div className="relative z-10 border-b border-white/10 p-4 sm:p-5">
        <div className="grid items-start gap-3 sm:grid-cols-[minmax(130px,0.65fr)_minmax(0,1.35fr)]">
          <div className="flex h-10 items-center justify-center sm:h-16">
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
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10 hover:text-white"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
  key={activeProduct.id}
  initial={{ opacity: 0, x: 56 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -56 }}
  transition={{
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    grid
    flex-1
    grid-cols-[minmax(100px,35%)_minmax(0,65%)]
    overflow-hidden
    rounded-2xl
    bg-white/[0.025]
    sm:grid-cols-[minmax(120px,32%)_minmax(0,68%)]
  "
>
  {/* ================= LEFT SIDE - IMAGE ================= */}
  <div
    className="
      relative
      flex
      min-h-44
      flex-col
      border-r
      border-white/10
      bg-white
      
      sm:min-h-52
      sm:p-4
    "
  >
    {/* Product Image */}
    <div className="flex min-h-0 flex-1 justify-center">
      <img
        src={activeProduct.img}
        alt={activeProduct.title}
        className="
          max-h-[100px]
          w-full
          object-contain
          transition-transform
          duration-500
          group-hover:scale-110
          sm:max-h-[120px]
        "
      />
    </div>

    {/* Description - hidden on small mobile */}
    <div
      className="
        
        border-t
        border-slate-200
        pt-3
        flex
        items-center
      "
    >
      <p className="text-center text-xs leading-5 text-slate-600">
        {product.description}
      </p>
    </div>
  </div>

  {/* ================= RIGHT SIDE - CONTENT ================= */}
  <div
    className="
      relative
      min-w-0
      p-3
      sm:p-7
    "
  >
    {/* Product Title */}
    <h3
      className="
        text-base
        font-semibold
        leading-tight
        text-white
        sm:text-2xl
      "
    >
      {activeProduct.title}
    </h3>

    {/* Applications */}
    <div
      className="
        mt-3
        border-t
        border-white/10
        pt-3
        sm:mt-5
        sm:pt-4
      "
    >
      <p
        className="
          text-[0.6rem]
          font-bold
          uppercase
          tracking-[0.15em]
          text-(--primary)
          sm:text-[0.65rem]
          sm:tracking-[0.18em]
        "
      >
        Applications
      </p>

      <ul
        className="
          mt-2
          grid
          w-full
          grid-cols-1
          gap-y-1.5
          sm:mt-3
          xl:grid-cols-2
          xl:gap-x-3
        "
      >
        {activeProduct.application.map((application, index) => (
          <li
            key={`${application}-${index}`}
            className="
              flex
              min-w-0
              items-start
              gap-1.5
              text-[0.68rem]
              leading-4
              text-slate-300
              transition-colors
              hover:text-white
              sm:gap-2
              sm:text-xs
              sm:leading-5
            "
          >
            <Check
              className="
                mt-0.5
                h-3.5
                w-3.5
                shrink-0
                sm:h-4
                sm:w-4
              "
              aria-hidden="true"
              style={{ color: product.accent }}
            />

            <span className="min-w-0">
              {application}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
        <button
          type="button"
          onClick={showPreviousProduct}
          aria-label="Show previous product"
          className="grid shrink-0 place-items-center rounded-full text-white  transition  hover:bg-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary)"
        >
          <ChevronLeft size={15} aria-hidden="true" />
        </button>

        <div className="flex min-w-0 items-center justify-center gap-1.5" aria-label="Product slideshow progress">
          {product.productlist.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === activeSlide ? "true" : undefined}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeSlide ? "w-5 bg-(--primary)" : "w-1 bg-slate-400/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={showNextProduct}
          aria-label="Show next product"
          className="grid shrink-0 place-items-center rounded-full  text-white transition hover:bg-(--primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary)"
        >
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

const BrandsAbout = () => {
  return (
    <section id="brands" className="relative isolate min-h-[calc(100svh-var(--navbar-height))] overflow-hidden bg-[#020d1a] py-8 text-white sm:py-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,168,232,0.2),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection variant="fadeUp" className="mb-3 max-w-5xl sm:mb-6">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-(--primary)">
            <p className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-(--primary)">
            
            Our Brands
          </p>
            
          </div>
          <h2 className="mt-3 text-[clamp(1.65rem,3vw,3.5rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white">
            The technology behind
            <span className="block text-(--primary)">better operations.</span>
          </h2>
          <p className="mt-5 max-w-[550px] text-[clamp(0.8rem,1vw,1rem)] leading-[1.85] text-slate-300">
            We specialize in two of the world's most trusted automation brands, delivering certified expertise and genuine product solutions.
          </p>
        </AnimatedSection>

        <AnimatedSection
  variant="scale3D"
  stagger={0.15}
  className="grid w-full grid-cols-1 items-stretch gap-4 sm:gap-5 lg:grid-cols-[repeat(2,minmax(0,1fr))_150px]"
>
  {products.map((product) => (
    <BrandCard key={product.logo} product={product} />
  ))}

  <div
    className="relative z-10 flex w-full flex-row flex-wrap items-center justify-around gap-2 rounded-2xl bg-gray-200 p-2 sm:gap-3 sm:p-3
      lg:w-[150px]
      lg:flex-col
      lg:flex-nowrap
      lg:justify-around
      lg:p-0
    "
  >
    {brandslogo.map((brand, idx) => (
  <div
    key={idx}
    className={`
      flex
      h-14
      w-[120px]
      items-center
      justify-center
      
      p-3
      transition-transform
      duration-300
      hover:scale-105

      sm:h-16
      sm:w-[140px]
      sm:p-4

      lg:w-[150px]
      lg:p-5

      ${
        idx !== brandslogo.length - 1
          ? "border-b border-slate-300 sm:border-r-0"
          : ""
      }
    `}
  >
    <img
      src={brand}
      alt="Brand logo"
      className="
        max-h-10
        w-auto
        max-w-full
        object-contain
        sm:max-h-12
      "
    />
  </div>
))}
  </div>
</AnimatedSection>
        
      </div>
    </section>
  );
};

export default BrandsAbout;
