import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./checkout.css";
import type { ICart } from "../../types/cart";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { v4 as uuidv4 } from "uuid";
import { addOrder } from "../../redux/slices/order.slice";
import { clearCartApi } from "../../redux/slices/cartApi";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../types/order";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

export default function CheckOut() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.Cart.cart) as ICart;
  const cartItems = cart.cartItems || [];
  console.log(cartItems);

  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const subtotal = cart.totalPrice || 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddress(e.target.value);
  };

  const handlePlaceOrder = () => {
    const userItem = localStorage.getItem("user");
    const userId = userItem ? JSON.parse(userItem).id : "";

    if (!address.trim()) {
      toast.error("Please enter a shipping address.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const order: Order = {
      items: cartItems,
      totalPrice: subtotal,
      id: uuidv4(),
      userId: userId,
      address: address,
      status: "pending",
      note: notes,
    };

    dispatch(addOrder(order));

    dispatch(clearCartApi());
    navigate("/order-details/" + order.id);
    console.log("aua");
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout</title>
        <link rel="canonical" href="http://mysite.com/checkout" />
      </Helmet>

      <div className="checkout-root py-5">
        <Container className="checkout-container pt-5">
          <div className="text-center mb-5">
            <h2 className="checkout-title mb-2">Complete Your Order</h2>
            <div className="theme-divider mx-auto"></div>
            <p className="text-muted mt-3">
              Review your items and provide delivery details
            </p>
          </div>
          <Row className="g-4">
            <Col lg={7}>
              <div className="card p-4 rounded-4 shadow-sm checkout-card">
                <h4 className="mb-2">Shipping address</h4>
                <div className="theme-divider mb-3"></div>
                <Form>
                  <Form.Group className="mb-3" controlId="line1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      name="address"
                      value={address}
                      onChange={handleChange}
                      placeholder="Street, building, unit"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="notes">
                    <Form.Label className="notes-label">
                      Notes (delivery details / instructions)
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      name="notes"
                      placeholder="Add any notes for delivery (e.g. gate code, preferred time)"
                    />
                  </Form.Group>

                  <div className="mt-3">
                    <Button
                      variant="primary"
                      className="theme-btn w-100 py-2"
                      onClick={handlePlaceOrder}
                    >
                      Place order
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>

            <Col lg={5}>
              <div className="card p-4 rounded-4 shadow-sm order-summary checkout-card">
                <h5 className="mb-2">Order summary</h5>
                <div className="theme-divider mb-3"></div>
                {cartItems.length === 0 ? (
                  <p className="text-muted">Your cart is empty.</p>
                ) : (
                  <div className="items-list">
                    {cartItems.map((it) => (
                      <div
                        key={it.id}
                        className="d-flex align-items-center mb-3 order-item-row"
                      >
                        <img
                          src={it.image}
                          alt={it.name}
                          style={{
                            width: 72,
                            height: 54,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                        <div className="ms-3 flex-grow-1">
                          <div className="fw-semibold item-name">{it.name}</div>
                          <div className="text-muted small">
                            {it.quantity} × {it.price} EGP
                          </div>
                        </div>
                        <div
                          className="fw-bold ms-2 item-total"
                          style={{ minWidth: 60, textAlign: "right" }}
                        >
                          {it.price * it.quantity} EGP
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between total-row mt-3">
                  <span className="fw-semibold">Total</span>
                  <span className="fw-bold total-amount">{subtotal} EGP</span>
                </div>
              </div>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </>
  );
}
