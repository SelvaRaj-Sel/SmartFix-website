import { motion } from "framer-motion";

const presets = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale3D: {
    hidden: { opacity: 0, scale: 0.92, rotateX: -8 },
    visible: { opacity: 1, scale: 1, rotateX: 0 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotateX: -12, y: 30 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
};

/**
 * Reusable scroll-triggered animation wrapper.
 *
 * @param {Object} props
 * @param {"fadeUp"|"fadeLeft"|"fadeRight"|"scale3D"|"rotateIn"} [props.variant="fadeUp"]
 * @param {number} [props.delay=0] - Animation delay in seconds
 * @param {number} [props.duration=0.6] - Animation duration
 * @param {number} [props.stagger=0] - Stagger children delay
 * @param {boolean} [props.once=true] - Animate only once
 * @param {number} [props.amount=0.2] - Viewport amount threshold
 * @param {string} [props.className]
 * @param {string} [props.as="div"] - HTML element type
 * @param {React.ReactNode} props.children
 */
const AnimatedSection = ({
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  stagger = 0,
  once = true,
  amount = 0.2,
  className = "",
  as = "div",
  children,
  style,
  ...rest
}) => {
  const preset = presets[variant] || presets.fadeUp;

  const containerVariants = {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: stagger,
      },
    },
  };

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
      style={{ perspective: 1200, ...style }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * Child wrapper for staggered animations.
 */
export const AnimatedItem = ({
  variant = "fadeUp",
  duration = 0.5,
  className = "",
  children,
  style,
  ...rest
}) => {
  const preset = presets[variant] || presets.fadeUp;

  const itemVariants = {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
