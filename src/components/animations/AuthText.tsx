import { motion } from "motion/react";
import type { IAuthTextProps } from "../../types/components/AnimationProps";

const AuthText = ({ title }: IAuthTextProps) => {
  return (
    <motion.h1
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="text-primary text-center fs-1 mb-4"
      style={{ textShadow: "2px 1px 2px #3C1D30" }}
    >
      {title}
    </motion.h1>
  );
};

export default AuthText;
