import { useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const springConfig = { stiffness: 90, damping: 30, mass: 0.8 };

/**
 * Tracks the global mouse position with spring-smoothed Framer Motion values.
 * Automatically disables on touch-only devices.
 *
 * @returns {{ x: MotionValue, y: MotionValue, opacity: MotionValue, isPointerDevice: boolean }}
 */
export function useMouseGlow() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const rawX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const rawY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const rawOpacity = useMotionValue(0);

  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 25 });

  const handleMouseMove = useCallback(
    (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      rawOpacity.set(1);
    },
    [rawX, rawY, rawOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    rawOpacity.set(0);
  }, [rawOpacity]);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse / trackpad)
    const mql = window.matchMedia("(pointer: fine)");
    setIsPointerDevice(mql.matches);

    const updatePointer = (e) => setIsPointerDevice(e.matches);
    mql.addEventListener("change", updatePointer);

    if (mql.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      mql.removeEventListener("change", updatePointer);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { x, y, opacity, isPointerDevice };
}
