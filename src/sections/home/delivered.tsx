import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "../../style/home/deliver.css";
import Button from "react-bootstrap/esm/Button";

export default function Delivered() {
  return (
    <>
      <div className="py-5">
        <div className="deliver d-flex justify-content-center align-items-center w-100 overflow-hidden">
          <Row>
            <Col md={6} sm={0}></Col>
            <Col md={6} sm={12} style={{ padding: "30px" }}>
              <h2>We wholesale the best flowers delivered directly to you.</h2>
              <h5 className="text-black">
                Flowers-Direct is a Canadian owned floral & greens wholesaler.
                We have a wide variety of flowers and our focus is on quality
                flowers & excellent customer service.
              </h5>
              <p className="text-black">The process is as simple as:</p>
              <p className="one text-black">Select a delivery date</p>
              <p className="two text-black">
                Add flowers to your shopping cart
              </p>
              <p className="three text-black">Checkout & receive the flowers</p>

              <div className=" d-flex justify-content-end">
                <Button className=" text-primary bg-light  mx-4 rounded-4">
                  {" "}
                  LEARN MORE
                </Button>
                <Button className=" bg-primary  rounded-4">
                  {" "}
                  START SHOPPING
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
