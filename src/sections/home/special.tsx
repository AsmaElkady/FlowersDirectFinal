import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "../../style/home/special.css"
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router";


export default function Special() {
        const Navigation = useNavigate();

    return (
        <>
            <Container className="mt-5 d-flex justify-content-center align-items-center">

                <Row className="d-flex justify-content-center align-items-center">
                    <Col md={3} sm={12} className=" first mx-2">
                        <div className="first"  >
                            <h2>Spacial Orders</h2>
                            <img src="/img/Home/10.png" alt="" />
                            <p className="mt-2">Don't see what your looking for? We have access to other flowers and greens which may not be listed on our website.</p>

                        </div>
                    </Col>
                    <Col md={3} sm={12} className="p-0 sec mx-2">

                    </Col >
                    <Col md={3} sm={12} className="p-0">
                        <div className="third " >
                            <p>Send your request and a Flowers Direct team member will get back to you with prices.</p>
<Button
                  className="bg-primary text-light"
                  onClick={() => Navigation("/contact")}
                  >
                  CONTACT US
                </Button>
                                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}