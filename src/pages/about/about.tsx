import { Helmet } from "react-helmet";
import "../../style/about/about.css";
import { Accordion, Col, Container, Row } from "react-bootstrap";

export default function About() {
  const services = [
    {
      image: "/img/about/service1.png",
      title: "Decoration",
      desc: "We create elegant flower decorations for homes, offices, shops, and other locations. Contact us if you want to demonstrate your style and taste to your guests, clients or visitors.",
    },
    {
      image: "/img/about/service2.png",
      title: "Events",
      desc: "We know that details matter. That’s why we provide and arrange flowers for private and corporate celebrations, charity galas, product launches, and other important events.",
    },
    {
      image: "/img/about/service3.png",
      title: "Floral Design",
      desc: "Our design team is always here to arrange unique and beautiful bouquets and flower compositions.",
    },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us</title>
        <link rel="canonical" href="http://mysite.com/about" />
      </Helmet>
      <div style={{ position: "relative", borderRadius: "50px" }}>
        <video autoPlay muted loop className="bg-video" style={{
          width: "100%",
          height: "80vh",
          objectFit: "cover",
          marginTop: "5rem"
        }}>
          <source src="/img/about/video.mp4" type="video/mp4" />
        </video>
        <header className="header-overlay">
          <div className="headerText">
            <h4 className="main-title">WHERE FLOWERS ARE <br />OUR INSPIRATION</h4>
          </div>
        </header>
      </div>
      <div className="px-0 position-relative" >
        <img src="/img/about/Vector.png" alt="about us"
          style={{ width: "300px", height: "250px" }} className="mt-5 start-0" />
        <div className="about">
          About Us
        </div>
      </div>
      <Container className="mt-5">
        <Row className="gap-5">
          <Col>
            My brother & future sister-in-law were looking for 400 stems of Sonia Dyed Blue dendrobium
            Orchids for their wedding reception. After shopping around, they realized there were no
            wholesaler willing to sell to them and the best priced option was a grocery store. I was
            shocked to believe they would have to pay $1600 for stale grocery store quality flowers.
            However, the biggest shock was that it was practically impossible to find a wholesale floral
            supplier open to the public! I took matters into my own hands & contacted an orchid farm in
            Thailand willing to sell boxes for a fraction of the price! My future sister in law was
            excited to have fresh orchids direct from the farm and my brother was happy to save over a $1000!
            <div className="mt-4">
              A few weeks later my sister’s friends contacted me about her wedding flowers.
              She was looking for 400 roses and asked if I could help. It was at that time I realized;
              “Why is it so difficult to get quality bulk flowers at wholesale prices?” In 2006,
              Prama International was established and since then, we have been offering Fresh Wholesale
              Flowers & Greens to the public AND industry professionals.
            </div>
          </Col>
          <Col>
            <div className="oval-image-wrapper ms-auto">
              <img src="/img/about/about.png" alt="about" className="oval-image" />
            </div>
          </Col>
        </Row>
      </Container>
      <div className="mt-5 container-fluid d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#eee6e9", height: "200px" }}>
        <p>Our goal has been and always will be to offer:</p>
        <h3>best quality flowers</h3>
      </div>
      <Container className="mt-5 flex-wrap">
        <h3 className="mb-4 text-center">Services We Provide</h3>
        <Row className="justify-content-center">
          {services.map((service, index) => (
          <Col
            key={index}
            md={3}
            className="mb-3 text-center"
          >
            <div>
              <img
                src={service.image}
                alt={service.title}
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "400px",
                  objectFit: "cover",
                }}
                className="mb-3"
              />
              <Accordion>
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header>{service.title}</Accordion.Header>
                  <Accordion.Body>{service.desc}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        ))}
        </Row>
      </Container>
    </>
  );
}