import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { IProduct } from "../../types/productType";
import type { AppDispatch, RootState } from "../../redux/store";
import { addFavApi, deleteFavItemApi } from "../../redux/slices/favSlice";
import "./ProductCard.css";
import { addOrUpdateCartApi } from "../../redux/slices/cartApi";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { Admin } from "../../classes/users";

type Props = {
  product: IProduct;
};

export default function ProductCard({ product }: Props) {
  const { name, image, price, category, rating, id } = product;
  const cartItems = useSelector(
    (state: RootState) => state.Cart.cart.cartItems
  );
  const favItem = useSelector((state: RootState) => state.FavSlice.favItem);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState<"danger" | "primary">("primary");

  //check admin
  const user = useSelector((state: RootState) => state.auth!.user);
  // const { users, status } = useSelector((state: RootState) => state.admin);
  const checkType = Admin.checkAdmin(user?.email ?? "");

  const showNotification = (message: string, bg: "danger" | "primary") => {
    setToastMessage(message);
    setToastBg(bg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handelAddToCart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(addOrUpdateCartApi({ product }));
      showNotification(`🛒 ${name} added to cart!`, "primary");
    } else {
      Swal.fire({
        title: "You Should Login first",
        html: "Please login to continue",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          title: "swal-title",
          htmlContainer: "swal-text",
        },
        willClose: () => {
          navigate("/Login", { state: { from: "products" } });
        },
      });
    }
    console.log("cart");
  };

  const handelAddToFav = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "You Should Login first",
        html: "Please login to continue",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          title: "swal-title",
          htmlContainer: "swal-text",
        },
        willClose: () => {
          navigate("/Login");
        },
      });
      return;
    }

    const isFav = favItem.some((item: IProduct) => item.id === id);

    if (isFav) {
      dispatch(deleteFavItemApi(id ?? 0));
      showNotification(`💔 ${name} removed from favorites`, "danger");
    } else {
      dispatch(addFavApi({ product }));
      showNotification(`❤️ ${name} added to favorites`, "primary");
    }
  };

  const isFavorite = favItem.some((item: IProduct) => item.id === id);

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
              src={image}
              alt={name}
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
      <div className="main-wrapper">
        <Card
          className="shadow-sm border-0 rounded-4 p-2 category-card-small mx-2"
          style={{ width: 210 }}
        >
          <div className="card-img-container">
            <Link to={`/products/${id}`}>
              <Card.Img
                className="w-100 rounded-3"
                style={{ height: "200px", objectFit: "cover" }}
                variant="top"
                src={image}
                alt={name}
              />
            </Link>
            <div className={`card-icons ${checkType.status ? "d-none" : ""}`}>
              <button
                className={`icon-btn fav-btn ${
                  isFavorite ? "text-primary bg-light" : ""
                }`}
                onClick={handelAddToFav}
              >
                <i className={`fa-heart ${isFavorite ? "fas" : "far"}`}></i>
              </button>
            </div>
          </div>
          <Card.Body className="d-flex flex-column justify-content-between align-items-start">
            <div className="text-start">
              <Card.Title className="fw-semibold">{name}</Card.Title>
              <Card.Subtitle className="text-muted small mb-2">
                {category}
              </Card.Subtitle>
              <Card.Text className="fw-bold mb-1">{price} EGP</Card.Text>
              <Card.Text className="fw-bold">
                <Rating
                  name="half-rating-read"
                  defaultValue={rating}
                  precision={0.5}
                  readOnly
                />
              </Card.Text>
            </div>
            <div className="mt-3 me-4">
              <Button
                variant="outline-primary"
                disabled={
                  product.totalQuantity === 0 ||
                  cartItems.some((item: IProduct) => item.id === id) ||
                  checkType.status
                }
                onClick={handelAddToCart}
              >
                {product.totalQuantity === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
