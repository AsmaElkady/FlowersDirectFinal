import { motion } from "motion/react";
import type { IScaleContainerProps } from "../../types/components/AnimationProps";

const ScaleContainer = ({ children, className }: IScaleContainerProps) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleContainer;
