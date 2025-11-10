import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { motion } from "motion/react";
import type { IButtonProps } from "../../types/components/ButtonsProps";

const MyButton = ({
  varient,
  title,
  type,
  isLoading,
  onClick,
}: IButtonProps) => {
  return (
    <motion.div
      className="rounded-2"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 0px 5px #3C1D30",
      }}
    >
      <Button
        variant={varient}
        disabled={isLoading}
        type={type}
        onClick={onClick}
        className="w-100"
      >
        {isLoading ? <Spinner animation="grow" /> : title}
      </Button>
    </motion.div>
  );
};

export default MyButton;
