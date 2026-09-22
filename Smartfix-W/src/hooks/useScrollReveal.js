import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Custom scroll-reveal hook using Framer Motion's useInView.
 * @param {Object} options
 * @param {boolean} [options.once=true] - Only trigger once
 * @param {number} [options.amount=0.2] - Percentage of element visible to trigger (0-1)
 * @param {string} [options.margin="0px 0px -80px 0px"] - Root margin
 */
export function useScrollReveal({
  once = true,
  amount = 0.2,
  margin = "0px 0px -80px 0px",
} = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount, margin });

  return { ref, isInView };
}
