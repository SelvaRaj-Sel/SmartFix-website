import { motion, useTransform } from "framer-motion";
import { useMouseGlow } from "../hooks/useMouseGlow.js";

const GLOW_SIZE = 300; // px – diameter of the soft radial circle

/**
 * Fixed-position ambient glow that follows the mouse cursor.
 * Renders behind all page content with pointer-events: none.
 */
const MouseGlow = () => {
  const { x, y, opacity, isPointerDevice } = useMouseGlow();

  // Centre the glow circle on the cursor
  const translateX = useTransform(x, (v) => v - GLOW_SIZE / 2);
  const translateY = useTransform(y, (v) => v - GLOW_SIZE / 2);

  // Don't render anything on touch devices
  if (!isPointerDevice) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: GLOW_SIZE,
        height: GLOW_SIZE,
        x: translateX,
        y: translateY,
        opacity,
        pointerEvents: "none",
        zIndex: 1,
        background:
          "radial-gradient(circle, rgba(34,211,238,0.08) 0%, rgba(34,211,238,0.04) 25%, rgba(34,211,238,0.01) 50%, transparent 70%)",
        borderRadius: "40%",
        filter: "blur(12px)",
        willChange: "transform, opacity",
      }}
    />
  );
};

export default MouseGlow;
