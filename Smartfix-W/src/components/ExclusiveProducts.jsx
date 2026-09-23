import {
  Cable,
  Cpu,
  Gauge,
  MonitorSmartphone,
  ScanEye,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PLC1 from "../assets/plc_1.png";
import PLC2 from "../assets/plc_2.png";
import PLC3 from "../assets/plc_3.png";
import PLC4 from "../assets/plc_4.png";

const products = [
  {
    id: 1,
    icon: Cpu,
    title: "PLC Systems",
    description:
      "CompactLogix, ControlLogix, GuardLogix, SIMATIC S7-1200, S7-1500 programmable logic controllers.",
    images: [PLC1, PLC2, PLC3, PLC4],
    applications:
      "Machine control, process automation, safety systems, and plant-wide control architectures.",
    specifications: [
      "CompactLogix and ControlLogix",
      "GuardLogix safety control",
      "SIMATIC S7-1200 and S7-1500",
      "Scalable I/O and networking",
    ],
  },
  {
    id: 2,
    icon: MonitorSmartphone,
    title: "HMI Panels",
    description:
      "PanelView Plus, PanelView 5000, Siemens Comfort Panels, Basic and advanced operator interfaces.",
    images: [PLC2],
    applications:
      "Operator stations, production monitoring, machine visualization, and HMI upgrades.",
    specifications: [
      "PanelView Plus and PanelView 5000",
      "Siemens Comfort Panels",
      "Touchscreen operator interfaces",
      "Alarm and recipe management",
    ],
  },
  {
    id: 3,
    icon: Gauge,
    title: "VFD Drives",
    description:
      "PowerFlex 523/755, Siemens SINAMICS G120, V20, V30 variable frequency drives for motor control.",
    images: [PLC1],
    applications:
      "Pumps, conveyors, fans, compressors, mixers, and other variable-speed motor applications.",
    specifications: [
      "PowerFlex 523 and 755",
      "SINAMICS G120, V20, and V30",
      "Energy-efficient speed control",
      "Motor protection and diagnostics",
    ],
  },
  {
    id: 4,
    icon: Zap,
    title: "Servo Systems",
    description:
      "Kinetix 5500/5700 servo drives, SIMOTICS servo motors, and high-precision motion control systems.",
    images: [PLC3],
    applications:
      "Packaging, robotics, material handling, and precision machine motion.",
    specifications: [
      "Kinetix 5500 and 5700",
      "SIMOTICS servo motors",
      "High-speed positioning",
      "Coordinated multi-axis motion",
    ],
  },
  {
    id: 5,
    icon: ScanEye,
    title: "Vision Systems",
    description:
      "Machine vision cameras, sensors, barcode readers, and inspection systems for quality assurance.",
    images: [PLC4],
    applications:
      "Defect detection, measurement, identification, alignment, and automated quality inspection.",
    specifications: [
      "Industrial cameras and sensors",
      "Barcode and code readers",
      "Vision-based inspection",
      "Quality data and traceability",
    ],
  },
  {
    id: 6,
    icon: Cable,
    title: "Field Instruments",
    description:
      "Sensors, transmitters, I/O modules, communication adapters, network switches, and safety relays.",
    images: [PLC1],
    applications:
      "Field measurement, machine connectivity, industrial networking, and equipment safety.",
    specifications: [
      "Industrial sensors and transmitters",
      "Remote I/O modules",
      "Communication adapters",
      "Network switches and safety relays",
    ],
  },
];

const ProductCard = ({
  icon: Icon,
  title,
  description,
  images = [],
  onSelect,
  isSelected,
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length < 2) return;

    const imageTimer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(imageTimer);
  }, [images.length]);

  return (
    <motion.article
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative mx-auto w-full max-w-[500px] cursor-pointer overflow-hidden rounded-2xl border bg-(--dark2) shadow-[0_10px_30px_rgba(2,6,23,0.18)] transition-all duration-500 ease-out hover:border-cyan-300/30${
        isSelected
          ? "border-cyan-300/60 ring-1 ring-cyan-300/30"
          : "border-white/10"
      }`}
    >
      <div className="relative h-[250px] w-full overflow-hidden bg-[#071827]">
        {images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={images[activeImage]}
              alt={`${title} product image ${activeImage + 1}`}
              initial={{
                x: 80,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: isHovered ? 1.08 : 1,
              }}
              exit={{
                x: -80,
                opacity: 0,
              }}
              transition={{
                x: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 0.3,
                },
                scale: {
                  duration: 0.5,
                },
              }}
              className="
    absolute
    inset-0
    h-full
    w-full
    object-cover
  "
            />
          </AnimatePresence>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">
            <Icon size={38} />
          </div>
        )}

        {/* <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-gradient-to-t
          from-[#02152c]
          via-[#020d1a]/30
          to-[#020d1a]/10
          transition-all duration-700
          group-hover:from-[#020d1a]/60
          group-hover:via-[#020d1a]/20
          group-hover:to-[#020d1a]/10
     
    "
  /> */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020d1a]/55 via-transparent to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="relative p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/5 text-(--primary) transition-all duration-500 group-hover:border-cyan-300/40 group-hover:bg-cyan-400/10 group-hover:scale-105">
            <Icon
              size={19}
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <h3 className="line-clamp-1 text-[1rem] font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-cyan-100">
            {title}
          </h3>
        </div>

        <p className="mt-2.5 text-[0.78rem] leading-5 text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
          {description}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-xl border border-cyan-300/0 opacity-0 transition-all duration-500 group-hover:border-cyan-300/25 group-hover:opacity-100" />
    </motion.article>
  );
};

const ProductDetails = ({ product }) => {
  if (!product) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={product.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.35 }}
        className="mt-8 overflow-hidden rounded-2xl border min-h-[280px] h-auto border-cyan-300/25 bg-[#071827] shadow-[0_18px_45px_rgba(0,160,210,0.12)]"
        aria-live="polite"
      >
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.7fr_1.3fr] lg:p-8">
          <div>
            <img
              src={product.images[0]}
              alt={`${product.title} product`}
              className="h-48 w-full rounded-xl object-cover sm:h-56 lg:h-full lg:min-h-56"
            />
          </div>

          <div>
            <h3 className="mt-1 text-2xl font-semibold text-white">
              {product.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {product.description}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              <span className="font-semibold text-slate-200">
                Best suited for:{" "}
              </span>
              {product.applications}
            </p>
            <h4 className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-(--primary)">
              Specifications
            </h4>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.specifications.map((specification) => (
                <li
                  key={specification}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {specification}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

const ExclusiveProducts = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const carouselRef = useRef(null);
  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1,
      );
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxCarouselIndex = Math.max(products.length - visibleCards, 0);

  const scrollToProduct = (index) => {
    const nextIndex = Math.min(Math.max(index, 0), maxCarouselIndex);
    setCarouselIndex(nextIndex);
    carouselRef.current?.children[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const selectProduct = (product, index) => {
    setSelectedProductId(product.id);
    scrollToProduct(index);
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#020d1a] py-12 sm:py-14"
      aria-labelledby="product-catalog-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,168,232,0.2),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-(--primary)">
              Our Product
            </p>
            <h2
              id="product-catalog-heading"
              className="mt-3 text-[2.75rem] text-white font-semibold leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-[4.25rem]"
            >
              Automation Product
              <span className="text-(--primary)"> Categories</span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-slate-300 lg:text-lg">
            Complete range of industrial automation hardware and software from
            <span className="text-(--rockwell-red) hover:text-red-500">
              {" "}
              Rockwell{" "}
            </span>
            and
            <span className="text-(--siemens-teal) hover:text-cyan-500">
              {" "}
              Siemens.
            </span>
          </p>
        </motion.header>

        <div className="relative mx-auto max-w-8xl px-7 sm:px-9">
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => scrollToProduct(carouselIndex - 1)}
            disabled={carouselIndex === 0}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2  p-1.5 text-(--primary) shadow-lg transition hover:text-cyan-600 disabled:pointer-events-none disabled:opacity-30 sm:left-1"
          >
            <FaChevronLeft className="h-10" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-hidden py-2 scroll-smooth sm:gap-5"
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="w-full shrink-0 snap-start md:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_2.5rem)/3)]"
              >
                <ProductCard
                  {...product}
                  isSelected={product.id === selectedProductId}
                  onSelect={() => selectProduct(product, index)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next products"
            onClick={() => scrollToProduct(carouselIndex + 1)}
            disabled={carouselIndex === maxCarouselIndex}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 p-1.5 text-(--primary) shadow-lg transition hover:text-cyan-600 disabled:pointer-events-none disabled:opacity-30 sm:right-1"
          >
            <FaChevronRight className="h-10" />
          </button>
        </div>

        <ProductDetails product={selectedProduct} />
      </div>
    </section>
  );
};

export default ExclusiveProducts;
