import { useFormContext } from "react-hook-form";
import Form from "react-bootstrap/Form";
import MyInput from "../../../../../components/Inputs/MyInput";

function BasicDetails() {
  const { register , formState: {errors} } = useFormContext();
  return (
    <>
      <h4 className="mb-3">Basic Details</h4>
      <MyInput id="name" label="Product Name" type="text" className="w-50" {...register("name")} />
      <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write a short description..."
              {...register("desc")}
            />
            {errors.desc && (
          <p className="text-danger mt-1">{errors.desc.message?.toString()}</p>
        )}
          </Form.Group>
      <hr />
    </>
  )
}

export default BasicDetails
