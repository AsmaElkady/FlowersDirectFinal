import { motion } from "motion/react";
import type { IScaleContainerProps } from "../../types/components/AnimationProps";

const Smooth = ({ children, className }: IScaleContainerProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Smooth;
