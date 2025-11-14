import { useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import "./OrderDetails.css";
import { fetchOrders } from "../../redux/slices/order.slice";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import type { Order } from "../../types/order";
import { Admin } from "../../classes/users";
import { Helmet } from "react-helmet";

export default function OrderDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = Admin.checkAdmin(user?.email ?? "").status;

  const { orderId } = useParams<{ orderId: string }>();
  const { orders, loading } = useSelector(
    (state: RootState) => state.orderSlice
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const order: Order | undefined = orders.find((o) => o.id === orderId);

  useEffect(() => {
    if (loading || !order) return;

    const isOwner = user?.id === order.userId;
    const isAdmin = Admin.checkAdmin(user?.email ?? "").status;

    if (!isOwner && !isAdmin) {
      navigate("/");
    }
  }, [order, user, navigate, loading]);

  const getStatusBadge = (status: Order["status"]) => {
    const badges: Record<string, { bg: string; text: string }> = {
      pending: { bg: "warning", text: "Pending" },
      processing: { bg: "info", text: "Processing" },
      shipped: { bg: "primary", text: "Shipped" },
      delivered: { bg: "success", text: "Delivered" },
      cancelled: { bg: "danger", text: "Cancelled" },
    };

    return badges[status ?? "pending"] || { bg: "secondary", text: "Unknown" };
  };

  if (loading) {
    return (
      <div className="order-details-root">
        <Container className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading order details...</p>
        </Container>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-root">
        <Container className="text-center py-5">
          <h3>Order not found</h3>
          <p className="text-muted">
            We couldn't find this order. Please check the order number.
          </p>
        </Container>
      </div>
    );
  }

  const statusBadge = getStatusBadge(order.status);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Order Details</title>
        <link rel="canonical" href="http://mysite.com/OrderDetails" />
      </Helmet>

      <div className="order-details-root">
        <Container className="order-details-container mt-5">
          <div className="text-center mb-5">
            <h2 className="order-details-title mb-2">Order Details</h2>
            <div className="theme-divider mx-auto"></div>
            <p className="text-muted mt-3">Track your order and view details</p>
          </div>

          <div className="order-header-card mb-4">
            <Row className="align-items-center">
              <Col md={4} xs={12} className="mb-3 mb-md-0">
                <div className="order-info-item">
                  <span className="label">Order Number</span>
                  <span className="value">{order.id}</span>
                </div>
              </Col>
              <Col md={4} xs={6} className="mb-3 mb-md-0">
                <div className="order-info-item">
                  <span className="label">Order Date</span>
                  <span className="value">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </Col>
              <Col md={4} xs={6}>
                <div className="order-info-item">
                  <span className="label">Status</span>
                  <Badge bg={statusBadge.bg} className="status-badge">
                    {statusBadge.text}
                  </Badge>
                </div>
              </Col>
            </Row>
          </div>

          <div className="order-progress-card mb-4">
            <h5 className="section-title mb-4">Order Progress</h5>
            <div className="progress-tracker">
              <div
                className={`progress-step ${
                  ["pending", "processing", "shipped", "delivered"].includes(
                    order.status
                  )
                    ? "completed"
                    : ""
                }`}
              >
                <div className="progress-dot"></div>
                <div className="progress-label">Order Placed</div>
              </div>
              <div className="progress-line"></div>
              <div
                className={`progress-step ${
                  ["processing", "shipped", "delivered"].includes(order.status)
                    ? "completed"
                    : ""
                } ${order.status === "pending" ? "active" : ""}`}
              >
                <div className="progress-dot"></div>
                <div className="progress-label">Processing</div>
              </div>
              <div className="progress-line"></div>
              <div
                className={`progress-step ${
                  ["shipped", "delivered"].includes(order.status)
                    ? "completed"
                    : ""
                } ${order.status === "processing" ? "active" : ""}`}
              >
                <div className="progress-dot"></div>
                <div className="progress-label">Shipped</div>
              </div>
              <div className="progress-line"></div>
              <div
                className={`progress-step ${
                  order.status === "delivered" ? "completed" : ""
                } ${order.status === "shipped" ? "active" : ""}`}
              >
                <div className="progress-dot"></div>
                <div className="progress-label">Delivered</div>
              </div>
            </div>
          </div>

          <Row className="g-4">
            <Col lg={7}>
              <div className="order-section-card">
                <h5 className="section-title mb-3">Order Items</h5>
                <div className="theme-divider mb-4"></div>
                <div className="order-items-list">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-quantity">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <div className="item-price">
                        <div className="unit-price">{item.price} EGP</div>
                        <div className="total-price">
                          {item.price * item.quantity} EGP
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col lg={5}>
              <div className="order-section-card mb-4">
                <h5 className="section-title mb-3">Shipping Details</h5>
                <div className="theme-divider mb-4"></div>
                <div className="address-content">
                  <div className="address-icon">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <p className="address-line">{order.address}</p>
                  </div>
                </div>
                {order.note && order.note.trim() !== "" && (
                  <div className="address-content mt-2">
                    <div className="address-icon">
                      <i className="fa-solid fa-note-sticky"></i>
                    </div>
                    <div>
                      <p className="address-line">{order.note}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="order-section-card">
                <h5 className="section-title mb-3">Payment Summary</h5>
                <div className="theme-divider mb-4"></div>
                <div className="payment-details">
                  <div className="payment-row">
                    <span>Subtotal</span>
                    <span>{order.totalPrice} EGP</span>
                  </div>
                  <div className="payment-row">
                    <span>Shipping</span>
                    <span>65 EGP</span>
                  </div>
                  <hr className="payment-divider" />
                  <div className="payment-row total-row">
                    <span>Total</span>
                    <span className="total-amount">
                      {order.totalPrice + 65} EGP
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {!isAdmin && (
            <div className="help-section mt-5 text-center">
              <p className="text-muted">
                Need help with your order?{" "}
                <a href="/contact" className="help-link">
                  Contact Support
                </a>
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
