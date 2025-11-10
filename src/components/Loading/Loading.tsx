import Lottie from "lottie-react";
import Flower from "../../../public/lottie/flower.json";

const Loading = () => {
  return <Lottie animationData={Flower} style={{ width: "10vw" }} />;
};

export default Loading;
