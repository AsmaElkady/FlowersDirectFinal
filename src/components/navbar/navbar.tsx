import { Navbar, Container, Nav, Button } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { RootState } from "../../redux/store";
// import FavModel from "../../pages/favModel/test";
import FavModel from "../../pages/favModel/favModel";
import { logoutUser } from "../../redux/slices/authSlice";

export default function MyNavbar() {
  const [modalShow, setModalShow] = useState(false);
  const favlength = useSelector(
    (state: RootState) => state.FavSlice.favItem.length
  );
  const cartlength = useSelector(
    (state: RootState) => state.Cart.cart.cartItems.length
  );

  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary position-fixed w-100 z-3"
      >
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand>
            <Link to={"/"}>
              <img src="/img/nav/1.png" alt="logo" style={{ height: "40px" }} />
            </Link>
          </Navbar.Brand>

          <div className="d-flex align-items-center order-lg-3">
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="border-0 order-lg-2 ms-2"
            />

            <Nav className="d-flex flex-row justify-content-center align-items-center">
              <Link to="/cart" className="position-relative mx-1">
                <ShoppingCartIcon className="text-primary fs-4" />
                <span className="cart-badge text-primary cart">
                  {cartlength}
                </span>
              </Link>

              <Button
                onClick={() => setModalShow(true)}
                className="border-0 bg-transparent position-relative mx-1"
              >
                <FavoriteIcon className="text-primary fs-4" />
                <span className="cart-badge text-primary fav">{favlength}</span>
              </Button>
            </Nav>

            {token == null ? (
              <Link to="/Login">
                <i className="fa-solid fa-right-to-bracket fs-5"></i>
              </Link>
            ) : (
              <>
                <Link to="/Profile" className="mx-1">
                  <PersonIcon className="text-primary" />
                </Link>
                <Button
                  className="btn bg-transparent btn-outline border-0 text-primary fs-5"
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/Login", { replace: true });
                  }}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                </Button>
              </>
            )}
          </div>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="order-lg-1 justify-content-center"
          >
            <Nav>
              <div className="d-flex  flex-column flex-lg-row gap-3 gap-lg-4 ">
                <Link to="/" className="text-decoration-none hover_link">
                  HOME
                </Link>
                <Link
                  to="/products"
                  className="text-decoration-none hover_link"
                >
                  PRODUCTS
                </Link>
                <Link to="/about" className=" text-decoration-none hover_link">
                  ABOUT
                </Link>
                <Link to="/contact" className="text-decoration-none hover_link">
                  CONTACT
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Model */}
      <FavModel show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
