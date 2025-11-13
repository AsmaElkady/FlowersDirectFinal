import "./carousel.css";
import Container from "react-bootstrap/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import type { IProduct } from "../../types/productType";
// import { addOrUpdateCartApi } from "../../redux/slices/cartApi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import Rating from "@mui/material/Rating";
import { Admin } from "../../classes/users";
import { Toast, ToastContainer } from "react-bootstrap";
import { useState } from "react";
import { handleAddToCartGlobal } from "../../utils/cartHelper";

type Category = {
  id?: number;
  name: string;
  desc: string;
  image: string;
  color?: string;
  category?: string;
  price?: number;
  rating?: number;
  isFavorite?: boolean;
  totalQuantity?: number;
};

interface MultiImageSliderProps {
  title: string;
  all: string;
  data: Category[] | undefined;
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1.2 },
};

export default function MultiImageSlider({
  title,
  all,
  data,
}: MultiImageSliderProps) {
  const displayData = data?.length ? data : [];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(
    (state: RootState) => state.Cart.cart.cartItems
  );
  //check admin
  const user = useSelector((state: RootState) => state.auth.user);
  const checkType = Admin.checkAdmin(user?.email ?? "");
  //add to cart section and toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState<"danger" | "primary">("primary");
  const [toastImg, setToastImg] = useState("");
  const [toastname, setToastname] = useState("");
  const showNotification = (message: string, bg: "danger" | "primary") => {
    setToastMessage(message);
    setToastBg(bg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handelAddtocart = (item: Category) => {
    setToastImg(item.image);
    setToastname(item.name);
    handleAddToCartGlobal(dispatch, navigate, item, showNotification);
  };
  return (
    <>
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast
          bg={toastBg}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <img
              src={toastImg}
              alt={toastname}
              width={30}
              height={30}
              className="rounded me-2"
              style={{ objectFit: "cover" }}
            />
            <strong className="me-auto">Store Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-secondary fw-bold">{title}</h3>
          <Button
            variant="secondary"
            className="rounded-4 text-white px-4"
            onClick={() => navigate("/products")}
          >
            {all}
          </Button>
        </div>

        <Carousel
          autoPlay
          arrows
          swipeable
          draggable
          responsive={responsive}
          infinite
          autoPlaySpeed={2500}
          keyBoardControl
          transitionDuration={600}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {displayData.map((item) => (
            <div
              key={item.id}
              className="category-card-small mx-2"
              style={{ width: 210 , margin:20 }}
            >
              {item.price ? (
                <>
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-100 rounded-3"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-100 rounded-3"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </>
              )}
              {/* <p className="text-center mt-2 fw-bold">{item.name}</p> */}
              <div className="category-text">
                <h6 className="m-2">{item.name}</h6>
                <p>
                  {item.desc
                    ? item.desc.split(" ").slice(0, 6).join(" ") + "..."
                    : ""}
                </p>
                <Rating
                  name="half-rating-read"
                  defaultValue={item.rating ?? 2.5}
                  precision={0.5}
                  readOnly
                />
                <p className="fw-bold">
                  {item.price ? (
                    <>
                      <Button
                        variant="outline-primary"
                        disabled={
                          cartItems.some((p: IProduct) => p.id === item.id) ||
                          checkType.status
                        }
                        onClick={() => handelAddtocart(item)}
                      >
                        Add to Cart
                      </Button>
                    </>
                  ) :null}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </>
  );
}
