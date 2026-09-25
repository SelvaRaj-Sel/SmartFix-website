import {Cable,Cpu,Gauge,Network,MonitorSmartphone,ScanEye,Settings,Zap,} from "lucide-react";
import { motion } from "framer-motion";
import PLC1 from "../assets/plc_1.png";
import PLC2 from "../assets/plc_2.png";
import PLC3 from "../assets/plc_3.png";
import PLC4 from "../assets/plc_4.png";

import rockwellLogo from "../assets/rockwell-logo1.png";
import siemensLogo from "../assets/Siemens-Logo.png";
import mitsubishiLogo from "../assets/mitsubi-logo.png";
import omronLogo from "../assets/Omron-Logo.png";
import abbLogo from "../assets/ABB_logo.png";
import schneiderLogo from "../assets/schneider-logo.png";
import festoLogo from "../assets/festo-logo.png";
import prosoftLogo from "../assets/Prosoft-Logo.png";


const products = [
  {
    id: 1,
    icon: Cpu,
    title: "PLC Systems",
    description:
      "CompactLogix, ControlLogix, GuardLogix, SIMATIC S7-1200 and S7-1500 programmable logic controllers.",

    image: PLC1,

    brands: [
      "Rockwell Automation","Siemens", "Mitsubishi Electric","Omron",]  
  },

  {
    id: 2,
    icon: MonitorSmartphone,
    title: "HMI Panels",
    description:
      "Industrial HMI panels and operator interfaces for machine visualization, monitoring and control.",

    image: PLC2,

    brands: [
      "Rockwell Automation","Siemens", "Mitsubishi Electric","Omron",] 
  },

  {
    id: 3,
    icon: Gauge,
    title: "VFD Drives",
    description:
      "Variable frequency drives for reliable speed control, motor protection and energy-efficient operation.",

    image: PLC3,

    brands: [
      "Rockwell Automation","Siemens", "Mitsubishi Electric","Omron",] 
  },

  {
    id: 4,
    icon: Zap,
    title: "Servo Systems",
    description:
      "High-performance servo drives and motors for robotics, positioning and precision motion applications.",

    image: PLC4,

    brands: [
      "Rockwell Automation","Siemens", "Mitsubishi Electric","Omron",] 
  },

  {
    id: 5,
    icon: ScanEye,
    title: "Vision Systems",
    description:
      "Industrial vision cameras, sensors and inspection systems for automated quality and identification.",

    image: PLC1,

    brands: [
      "Rockwell Automation","Siemens", "Mitsubishi Electric","Omron",] 
  },

  {
    id: 6,
    icon: Cable,
    title: "Field Instruments",
    description:
      "Sensors, transmitters, I/O modules and industrial field components for reliable process measurement.",

    image: PLC2,

    brands: [
      "Rockwell Automation","Siemens", "Mitsubishi Electric","Omron",] 
  },

  {
    id: 7,
    icon: Network,
    title: "Industrial Networks",
    description:
      "Managed switches, gateways and protocol converters for secure and reliable industrial communication.",

    image: PLC3,

    brands: [
      "Rockwell Automation","Siemens", "Mitsubishi Electric","Omron",] 
  },

  {
    id: 8,
    icon: Settings,
    title: "Control Components",
    description:
      "Contactors, relays, power supplies, circuit protection and accessories for industrial control panels.",

    image: PLC4,

    brands: [
      "Rockwell Automation","Siemens", "Mitsubishi Electric","Omron",] 
  },
];

// ============================================================
// PRODUCT CARD
// ============================================================

const ProductCard = ({
  icon: Icon,
  title,
  description,
  image,
  brands = [],
}) => {
  return (
    <motion.article
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="
        group
        relative
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-(--dark2)
        shadow-[0_10px_30px_rgba(2,6,23,0.18)]
        transition-[border-color,box-shadow]
        duration-300
        hover:border-cyan-300/35
        hover:shadow-[0_18px_45px_rgba(0,160,210,0.14)]
      "
    >
      {/* ====================================================
          PRODUCT IMAGE
      ==================================================== */}

      <div
        className="
          relative
          h-32
          w-full
          shrink-0
          overflow-hidden
          bg-[#071827]
          sm:h-36
          lg:h-40
          xl:h-44
        "
      >
        <img
          src={image}
          alt={`${title} product`}
          loading="lazy"
          className="
            h-full
            w-full
            object-
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.05]
          "
        />

        {/* Image dark overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#020d1a]/50
            via-transparent
            to-transparent
          "
        />

        {/* Hover cyan line */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-cyan-400/70
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />
      </div>

      {/* ====================================================
          PRODUCT CONTENT
      ==================================================== */}

      <div className="relative flex flex-1 flex-col p-4 sm:p-5">
        {/* Product title */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="
              flex
              h-8
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-cyan-400/20
              bg-cyan-400/5
              text-(--primary)
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:border-cyan-300/40
              group-hover:bg-cyan-400/10
            "
          >
            <Icon
              size={19}
              className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />
          </div>

          <h3
            className="
              text-[1rem]
              font-semibold
              leading-tight
              text-white
              transition-colors
              duration-300
              group-hover:text-cyan-100
              sm:text-[1.05rem]
            "
          >
            {title}
          </h3>
        </div>

        {/* Product description */}
        <p
          className="
            mt-3
            flex-1
            text-[0.8rem]
            leading-5
            text-slate-400
            transition-colors
            duration-300
            group-hover:text-slate-300
          "
        >
          {description}
        </p>

        {/* ==================================================
            MULTIPLE BRAND LOGOS
        ================================================== */}

        
          {/* <div
            className="
              mt-5
              border-t
              border-white/10
              pt-4
            "
          >
          
            <p
              className="
                mb-3
                text-[0.58rem]
                font-bold
                uppercase
                tracking-[0.16em]
                text-slate-500
              "
            >
              We handling types
            </p>

            
            <div
              className="
                flex
              "
            >
              {brands.map((brand, index) => (
  <div
    key={index}
    className="group/brand"
  >
    <p
      className="
        text-sm
        
        text-slate-300
        transition-all
        duration-300
        ease-out
        hover:text-cyan-300
      "
    >
      {brand}
    </p>
  </div>
))}
            </div>
          </div> */}
      
        
      </div>

      {/* ====================================================
          CARD HOVER BORDER
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          border
          border-cyan-300/0
          opacity-0
          transition-all
          duration-500
          group-hover:border-cyan-300/20
          group-hover:opacity-100
        "
      />
    </motion.article>
  );
};

// ============================================================
// EXCLUSIVE PRODUCTS SECTION
// ============================================================

const ExclusiveProducts = () => {
  return (
    <section
      id="products"
      className="
        relative
        overflow-hidden
        bg-[#020d1a]
        py-8
        sm:py-10
        lg:py-12
      "
      aria-labelledby="product-catalog-heading"
    >
      {/* Top separator */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-[linear-gradient(90deg,transparent,rgba(0,168,232,0.2),transparent)]
        "
        aria-hidden="true"
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-8xl
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <motion.header
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            mb-8
            flex
            flex-col
            gap-6
            sm:mb-10
            lg:mb-12
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-2xl">
            <p
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-cyan-400/25
                bg-cyan-500/10
                px-3
                py-1.5
                text-[0.7rem]
                font-bold
                uppercase
                tracking-[0.22em]
                text-(--primary)
              "
            >
              Our Product
            </p>

            <h2
              id="product-catalog-heading"
              className="
                mt-3
                text-[clamp(1.65rem,3vw,3.5rem)]
                font-semibold
                leading-[1.18]
                tracking-[-0.035em]
                text-white
              "
            >
              Automation Product{" "}
              <span className="text-(--primary)">
                Categories
              </span>
            </h2>
          </div>
        </motion.header>

        {/* ==================================================
            PRODUCT GRID

            Mobile  = 1 column
            Tablet  = 2 columns
            Desktop = 4 columns

            8 products = 2 rows × 4 columns
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            items-stretch
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-4
            xl:gap-6
          "
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.4,
                delay: (index % 4) * 0.06,
              }}
              className="h-full"
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveProducts;