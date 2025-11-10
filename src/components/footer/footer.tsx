import { Col, Container, Row } from "react-bootstrap";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./footer.css";

export default function Footer() {
  return (
    <>
      <footer className="bg-light mt-5 position-static bottom-0">
        <Container className="py-5">
          <Row>
            <Col>
              <h4>COMPANY</h4>
              <p>About Us</p>
              <p>Privacy Policy</p>
            </Col>
            <Col>
              <h4>SOCIAL MEDIA</h4>
              <Row>
                <Col>
                  <div>
                    <InstagramIcon />
                    <p className="d-inline-block px-3">Instagram</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <FacebookIcon />
                    <p className="d-inline-block px-3">Facebook</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <img src="/img/nav/1.png" alt="" />
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
