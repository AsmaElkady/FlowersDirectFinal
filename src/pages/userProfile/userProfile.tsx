import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import "./../../style/auth.css";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../components/Modal/Modal";
import EditModal from "./EditModal";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Lottie from "lottie-react";
import Flower from "../../../public/lottie/Profile.json";
import "./stepper.css";
import Search from "../../components/Inputs/Search";
import SearchIcon from "@mui/icons-material/Search";
import { fetchOrdersByUserId } from "../../redux/slices/order.slice";
import type { OrderItem } from "../../types/order";

const UserProfile = () => {
  const user = useSelector(
    (state: RootState) => (state.auth as RootState["auth"]).user!
  );
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const { orders, loading } = useSelector(
    (state: RootState) => state.orderSlice
  );
  //const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!user) {
      navigate("/Login", { replace: true });
    } else {
      dispatch(fetchOrdersByUserId());
    }
  }, [user, navigate, dispatch]);

  const handleEdit = ({ status, msg }: { status: boolean; msg: string }) => {
    if (status) {
      setShowModal(!showModal);
      toast("Your info changed correctly");
    } else {
      setShowModal(!showModal);
      toast.error(msg);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(search) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
  );

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

  return (
    <div className="pt-5">
      <Container fluid style={{ height: "100%" }}>
        <Row className="align-items-center " style={{ height: "35vh" }}>
          <div className="position-absolute d-flex flex-column align-items-center ">
            <Lottie animationData={Flower} style={{ width: "10vw" }} />
            <div className="d-flex align-items-center justify-content-center">
              <h2 className="text-center">
                {user?.username}
                <span></span>
              </h2>
              <i
                className="fas fa-edit  ps-2"
                style={{ cursor: "pointer" }}
                onClick={() => setShowModal(true)}
              ></i>
            </div>
            <h5 className="text-center">{user?.email}</h5>
          </div>
        </Row>
        <div className="order-progress-card mb-4">
          <div className="d-flex align-items-end justify-content-between mb-4">
            <h5 className="section-title">Order History</h5>
            <div className="d-flex align-items-center">
              <div>
                <Search
                  handleSearch={(e) => {
                    setSearch(e.target.value);
                  }}
                  show={showInput}
                />
              </div>
              <Button
                className="bg-light text-primary mx-2"
                onClick={() => setShowInput(!showInput)}
              >
                <SearchIcon />
              </Button>
            </div>
          </div>
        </div>
        <Row className="g-4 pb-4">
          <Col>
            {filteredOrders.length > 0 ? (
              <Accordion defaultActiveKey="0">
                {filteredOrders.map((order, index) => (
                  <Accordion.Item
                    eventKey={String(index)}
                    key={order.id}
                    className="mb-3"
                  >
                    <Accordion.Header>
                      <div className="d-flex justify-content-between w-100 pe-3">
                        <span>Order ID: #{order.id}</span>

                        <span className="text-capitalize">
                          Status: {order.status}
                        </span>
                        <span>Total: {order.totalPrice} EGP</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <h5 className="section-title mb-3">Order Summary</h5>
                      <div className="order-items-list">
                        {order.items.map((item: OrderItem) => (
                          <div
                            key={item.id}
                            className="d-flex justify-content-between py-2 border-bottom"
                          >
                            <div className="item-details">
                              <div className="item-name fw-bold">
                                {item.name}
                              </div>
                              <div className="item-quantity text-muted">
                                Quantity: {item.quantity}
                              </div>
                            </div>
                            <div className="unit-price align-self-center">
                              {item.price} EGP
                            </div>
                          </div>
                        ))}
                        <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded-3 shadow-sm">
                          <div className="fw-bold fs-5 text-dark">
                            Total:{" "}
                            <span className="text-success">
                              {order.totalPrice} EGP
                            </span>
                          </div>

                          <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm fw-semibold"
                            onClick={() =>
                              navigate(`/order-details/${order.id}`)
                            }
                          >
                            Order Details
                          </Button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-5">
                <h3>No orders found</h3>
                <p className="text-muted">
                  There are no orders matching your current filters.
                </p>
              </div>
            )}
          </Col>
        </Row>
        <ModalComponent
          show={showModal}
          title={"Edit User"}
          body={
            <>
              <EditModal
                user={user}
                checkEditStatus={({
                  status,
                  msg,
                }: {
                  status: boolean;
                  msg: string;
                }) => handleEdit({ status, msg })}
              />
            </>
          }
          showActions={false}
          handleClose={() => setShowModal(false)}
        />
      </Container>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
