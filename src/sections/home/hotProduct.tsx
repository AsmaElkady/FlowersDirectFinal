import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router";



export default function HotProduct() {
    const Navigation = useNavigate();


    return (
        <>
            <div style={{ backgroundColor: "#FBEFF4" }}>
                <Container className="m-auto p-5">
                    <Row>
                        <Col md={3} sm={12}>
                            <h2 className="text-primary">Hot Deals</h2>
                        </Col>
                        <Col md={7} sm={12}>
                            <h5>SAVE 15% OFF ON FILLERS & TULIPS</h5>
                            <p>Shopping Hot Products on September 2022 you will save 15% OFF!</p>
                            <small>Terms and Conditions apply.</small>
                        </Col>
                        <Col md={2} sm={12}>
                            <Button className=" rounded-4 d-inline-block " style={{ backgroundColor: "primary" }}
                            onClick={()=> Navigation('/products')}
                            >SHOP NOW</Button>
                        </Col>

                    </Row>
                </Container>
            </div>
        </>
    )
}