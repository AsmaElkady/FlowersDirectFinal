import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { PasswordProps } from "../../types/components/InputsProps";
import { useFormContext, type FieldError } from "react-hook-form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../style/auth.css";

const Password = ({
  id = "password",
  label = "Password",
  forgetPass = false,
  className,
}: PasswordProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [show, setShow] = useState<boolean>(false);

  return (
    <Form.Group className={`mb-2  ${className}`} controlId={id}>
      <Form.Label className="text-primary fs-6">{label}</Form.Label>
      <InputGroup className="box-shadow  rounded-2 input-group">
        <Form.Control
          className="border-end-0 shadow-none form-control"
          style={{ textShadow: "2px" }}
          type={show ? "text" : "password"}
          {...register(id)}
        />
        <Button
          className="border-start-0 text-primary bg-white"
          style={{ borderColor: "#DEE2E6" }}
          variant="primary"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </Button>
      </InputGroup>

      {errors[id]?.message ? (
        <Form.Text className="text-secondary">
          {(errors[id] as FieldError)?.message}
        </Form.Text>
      ) : (
        <div className="pb-3" />
      )}
      {forgetPass && (
        <Row className="justify-content-center align-items-center d-flex">
          {/* <Col>
            <Form.Check
              className="small"
              type="checkbox"
              label="remember me?"
            />
          </Col> */}
          <Col>
            <Link
              to={"/ForgetPassword"}
              className="text-md-end text-start d-block small text-decoration-none"
            >
              Forget password ?
            </Link>
          </Col>
        </Row>
      )}
    </Form.Group>
  );
};

export default Password;
