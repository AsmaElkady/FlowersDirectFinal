import zod from "zod";

export const addProductSchema = zod.object({
  name: zod.string().min(5, "Product name is required at least 5 characters"),
  desc: zod.string().min(5, "Description must be at least 5 characters"),
  price: zod.number().min(1, "Price must be positive"),
  totalQuantity: zod.number().min(0, "Quantity must be positive"),
  category: zod.string().min(1, "Select a category"),
  color: zod.string().min(1, "Select a color"),
  image: zod.string().min(1, "Image is required"),
  rating: zod.number().optional(),
  isFavorite: zod.boolean().optional(),
});

export type AddProductSchemaType = zod.infer<typeof addProductSchema>;

export const addProductDefaultValues = {
  name: "",
  desc: "",
  price: 0,
  totalQuantity: 0,
  category: "",
  color: "",
  image: "",
  rating: 3.5,
  isFavorite: false,
};
