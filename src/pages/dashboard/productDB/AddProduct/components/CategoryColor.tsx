import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

interface Props {
  categories: string[];
  colors: string[];
}

function CategoryColor({ categories, colors }: Props) {
  const { register , formState: { errors }, } = useFormContext();

  return (
    <div className="mt-3">
      <h5>Categories</h5>
      <Form.Label>Product Category</Form.Label>
      <Form.Select className="w-75" {...register("category")}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Form.Select>
      {errors.category && (
        <Form.Text className="text-danger">
          {errors.category.message?.toString()}
        </Form.Text>
      )}

      <hr />

      <h5>Colors</h5>
      <Form.Label>Product Color</Form.Label>
      <Form.Select className="w-75" {...register("color")}>
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </Form.Select>
      {errors.color && (
        <Form.Text className="text-danger">
          {errors.color.message?.toString()}
        </Form.Text>
      )}
    </div>
  );
}

export default CategoryColor;
