import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; x?: number };

/** Fades content up into view once when it scrolls into the viewport. */
export function Reveal({ delay = 0, y = 40, x = 0, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
