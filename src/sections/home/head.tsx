import Button from "react-bootstrap/Button";
import "../../style/home/head.css";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router";

export default function HeadConponent() {
  const navigation = useNavigate()
  return (
    <>
      <div className="carousel-container position-relative ">
        <Carousel controls={false} className="pt-5">
          <Carousel.Item interval={3000} style={{ height: "90vh" }}>
            <img
              src="/img/Home/5.jpg"
              alt="slide 3"
              className="d-block w-100"
              style={{ objectFit: "cover", height: "100%" }}
            />
          </Carousel.Item>
          <Carousel.Item interval={3000} style={{ height: "90vh" }}>
            <img
              src="/img/Home/Hero Banner.png"
              alt="slide 3"
              className="d-block w-100"
              style={{ height: "100%" }}
            />
          </Carousel.Item>
          <Carousel.Item interval={3000} style={{ height: "90vh" }}>
            <img
              src="/img/Home/2.jpg"
              alt="slide 1"
              className="d-block w-100"
              style={{ objectFit: "cover", height: "100%" }}
            />
          </Carousel.Item>
          <Carousel.Item interval={3000} style={{ height: "90vh" }}>
            <img
              src="/img/Home/1.png"
              alt="slide 2"
              className="d-block w-100"
              style={{ objectFit: "cover", height: "100%" }}
            />
          </Carousel.Item>
          <Carousel.Item interval={3000} style={{ height: "90vh" }}>
            <img
              src="/img/Home/3.jpg"
              alt="slide 3"
              className="d-block w-100"
              style={{ objectFit: "cover", height: "100%" }}
            />
          </Carousel.Item>
        </Carousel>

        <header className=" header-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-center">
          <div className="headerText">
            <h4 className="main-title">FRESH WHOLESALE FLOWERS</h4>
            <h4 className="sub-title">DIRECT TO YOU</h4>
            <Button
              variant="secondary"
              className=" rounded-4 text-white position-relative"
              onClick={() => navigation("/products")}
            >
              START SHOPPING
            </Button>
          </div>
        </header>
      </div>
    </>
  );
}
