import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useRef } from "react";

const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };

/**
 * Reusable 3D tilt hook for card elements.
 * @param {Object} options
 * @param {number} [options.maxRotation=8] - Maximum tilt angle in degrees
 * @param {number} [options.perspective=1200] - CSS perspective value in px
 * @param {number} [options.scale=1.02] - Scale on hover
 * @param {number} [options.shadowIntensity=0.25] - Shadow opacity multiplier
 */
export function use3DTilt({
  maxRotation = 8,
  perspective = 1200,
  scale = 1.02,
  shadowIntensity = 0.25,
} = {}) {
  const ref = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const z = useMotionValue(0);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springZ = useSpring(z, springConfig);

  const shadowX = useTransform(springRotateY, [-maxRotation, maxRotation], [12, -12]);
  const shadowY = useTransform(springRotateX, [-maxRotation, maxRotation], [-12, 12]);

  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) =>
      `${sx}px ${sy}px 35px rgba(0, 0, 0, ${shadowIntensity}), 0 0 20px rgba(34, 211, 238, 0.08)`
  );

  const transform = useTransform(
    [springRotateX, springRotateY, springZ],
    ([rx, ry, zVal]) =>
      `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${zVal > 0 ? scale : 1}, ${zVal > 0 ? scale : 1}, 1)`
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      // Skip on touch devices
      if ("ontouchstart" in window) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      rotateX.set(-percentY * maxRotation);
      rotateY.set(percentX * maxRotation);
      z.set(1);
    },
    [maxRotation, rotateX, rotateY, z]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
  }, [rotateX, rotateY, z]);

  return {
    ref,
    style: {
      transform,
      boxShadow,
      transformStyle: "preserve-3d",
      willChange: "transform",
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
