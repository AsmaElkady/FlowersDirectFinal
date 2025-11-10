import Form from "react-bootstrap/Form";
import type { InputProps } from "../../types/components/InputsProps";
import { useFormContext, type FieldError } from "react-hook-form";

const MyInput = ({ id, label, type, placeholder, className }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Group className={`mb-2 ${className}`} controlId={id}>
      <Form.Label className="text-primary fs-6">{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register(id,type === "number" ? { valueAsNumber: true } : {})}
        autoComplete={id}
      />
      {errors[id]?.message ? (
        <Form.Text className="text-secondary">
          {(errors[id] as FieldError)?.message}
        </Form.Text>
      ) : (
        <div className="m-4" />
      )}
    </Form.Group>
  );
};

export default MyInput;
