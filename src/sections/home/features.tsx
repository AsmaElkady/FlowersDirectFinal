import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../style/home/feature.css";
export default function Features() {
  return (
    <Container>
      <Row className="transparentSec text-center justify-content-center align-items-center feature-row">
        <Col
          md={3}
          sm={6}
          className="d-flex align-items-center justify-content-center feature-col"
        >
          <img src="/img/nav/2.png" alt="" className="m-1" />
          <div className="text-start">
            <h6 className="mb-1">Wholesale Prices</h6>
            <p className="mb-0 text-muted">
              Vel at henerit urna et maecenas venenatis.
            </p>
          </div>
        </Col>

        <Col
          md={3}
          sm={6}
          className="d-flex align-items-center justify-content-center feature-col"
        >
          <img src="/img/nav/3.png" alt="" className="mx-2" />
          <div className="text-start">
            <h6 className="mb-1">Secure Checkout</h6>
            <p className="mb-0 text-muted">
              Vel at henerit urna et maecenas venenatis.
            </p>
          </div>
        </Col>

        <Col
          md={3}
          sm={6}
          className="d-flex align-items-center justify-content-center feature-col"
        >
          <img src="/img/nav/4.png" alt="" />
          <div className="text-start">
            <h6 className="mb-1">Best Quality</h6>
            <p className="mb-0 text-muted">
              Vel at henerit urna et maecenas venenatis.
            </p>
          </div>
        </Col>

        <Col
          md={3}
          sm={6}
          className="d-flex align-items-center justify-content-center feature-col"
        >
          <img src="/img/nav/5.png" alt="" />
          <div className="text-start">
            <h6 className="mb-1">Client Service</h6>
            <p className="mb-0 text-muted">
              Vel at henerit urna et maecenas venenatis.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
