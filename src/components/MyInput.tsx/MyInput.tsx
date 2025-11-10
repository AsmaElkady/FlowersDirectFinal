import Form from "react-bootstrap/Form";
import type { InputProps } from "../../types/components/InputsProps";

const MyInput = ({ label, type, placeholder, value, error }: InputProps) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder} value={value} />
      <Form.Text className="text-error">{error}</Form.Text>
    </Form.Group>
  );
};

export default MyInput;
