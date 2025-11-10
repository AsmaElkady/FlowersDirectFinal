import { Button, Col, Container, Row, Form } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { contactDefaultValues, contactSchema, type ContactFormValues,} from "../../utils/schema/contactUsSchema";
import MyInput from "../../components/Inputs/MyInput";
import { Helmet } from "react-helmet";

function ContactUs() {
  const methods = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await emailjs.send(
        "service_ydejxjv",
        "template_edpwqbq",
        {
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
        {
          publicKey: "-DsfewcayxGr5KGt7",
        }
      );

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us. We’ll get back to you soon.",
        confirmButtonColor: "#0d6efd",
      });

      reset();
    } catch (error) {
      console.error("Email send error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us</title>
        <link rel="canonical" href="http://mysite.com/contact" />
      </Helmet>
    <Container style={{ paddingTop: "100px" }}>
      <Row className="gap-5">
        <Col md={4}>
          <h2 className="mb-5">Contact Us</h2>
          <p>
            We strive to provide a great customer experience and beautifully
            fresh flowers. If you have any comments, compliments, or questions,
            please contact us! A representative from the Flowers-Direct team
            will be in touch within 24–48 hours.
          </p>
        </Col>

        <Col md={6}>
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <MyInput
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              <MyInput
                id="phone"
                label="Phone"
                type="text"
                placeholder="Enter your phone number"
              />

              <Form.Group className="mb-3">
                <Form.Label className="text-primary fs-6">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Type your message here..."
                  {...methods.register("message")}
                />
                {methods.formState.errors.message && (
                  <Form.Text className="text-secondary">
                    {methods.formState.errors.message.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="mt-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          </FormProvider>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default ContactUs;
