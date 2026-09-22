import rockwellLogo from "../assets/rockwell-logo1.png";
import siemensLogo from "../assets/Siemens-Logo.png";
import festologo from "../assets/festo-logo.png";
import prosoftlogo from "../assets/prosoft-logo.jpg";
import AnimatedSection from "./AnimatedSection.jsx";
import mitsubilogo from "../assets/mitsubi_logo.png";
import weintek from "../assets/WEINTEK-LOGO.png";

const products = [
  {
    description:
      "As specialists in Allen-Bradley and Rockwell Automation products, we provide complete solutions from CompactLogix & ControlLogix PLCs to PanelView HMIs, PowerFlex VFDs, Kinetix Servo Drives, and integrated safety systems.",
    accent: "#C41230",
    logo: rockwellLogo,
    logoClass: "h-12 w-full object-contain sm:h-14",
    features: ["Micro 800","CompactLogix","ControlLogix", "PanelView Plus 7","FT Optix", "PowerFlex VFDs", "Kinetix servo drives", "GuardLogix", "FactoryTalk", "Stratix"],
  },
  {
   description:
      "As authorized Siemens solution providers, we deliver SIMATIC S7-1200 & S7-1500 PLCs, SINAMICS drives, SIMOTICS servo motors, Comfort Panel HMIs, and TIA Portal integrated engineering solutions.",
    accent: "#009999",
    logo: siemensLogo,
    logoClass: "h-11 w-full object-contain sm:h-13",
    features: ["SIMATIC S7-1200 & S7-1500", "SINAMICS drives", "SIMOTICS servo motors", "TIA Portal engineering", "Comfort Panels", "PROFINET", "WinCC"],
  },
];

const brandslogo =[festologo, prosoftlogo, mitsubilogo, weintek];

const BrandCard = ({ product }) => {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-white/15 bg-(--dark2) p-5 text-white transition-[border-color,box-shadow] duration-300 hover:border-white/30 hover:shadow-[0_18px_50px_rgba(2,6,23,0.35)] sm:p-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.06),transparent_55%)]" aria-hidden="true" />

      <div
        className="absolute inset-x-0 top-0 z-0 h-1"
        style={{ backgroundColor: product.accent }}
      />
      <div className="absolute -right-20 -top-24 z-0 h-44 w-44 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:scale-110 group-hover:opacity-20" />
      <div className="flex items-start justify-between gap-5">
        <div className="relative z-10 w-full">
          <div className="flex h-14 w-fit max-w-48 items-center justify-center rounded-xl px-1">
            <img src={product.logo} alt="industrial automation logo" className={product.logoClass} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-1 flex-1">
       
        <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
          {product.description}
        </p>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-2">
        {product.features.map((feature) => (
          <span key={feature} className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white hover:shadow-[0_8px_20px_rgba(34,211,238,0.12)]">
            
            {feature}
          </span>
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

        <AnimatedSection variant="scale3D" stagger={0.15} className="grid gap-5 lg:grid-cols-2">
          {products.map((product) => (
            <BrandCard key={product.description} product={product} />
          ))}
        </AnimatedSection>
        <div className="relative z-10 mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brandslogo.map((brand, idx) => (
            <div key={idx} className="flex h-16 w-full items-center justify-center rounded-2xl bg-amber-50 p-2 transition-transform duration-300 hover:scale-105">
              <img src={brand} alt="Brand logo" className="max-h-12 w-auto max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsAbout;
