import { useForm, FormProvider } from "react-hook-form";
import {
  useAppDispatch,
  type AppDispatch,
  type RootState,
} from "../../../../../redux/store";
import type { IProduct } from "../../../../../types/productType";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import {
  addProductSchema,
  type AddProductSchemaType,
} from "../../../../../utils/schema/addProductSchema";
import { useEffect } from "react";
import { Product } from "../../../../../classes/productClass";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import MyInput from "../../../../../components/Inputs/MyInput";
import { useSelector } from "react-redux";
import { fetchCategory } from "../../../../../redux/slices/category";

interface EditProductModalProps {
  show: boolean;
  handleClose: () => void;
  product: IProduct;
}

function EditProductModal({
  show,
  handleClose,
  product,
}: EditProductModalProps) {
  const dispatch = useAppDispatch<AppDispatch>();
  const { category, loading } = useSelector(
    (state: RootState) => state.Category
  );

  const methods = useForm<IProduct>({
    resolver: zodResolver(addProductSchema),
    defaultValues: product ?? {},
  });

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      methods.reset(product);
    }
  }, [product, methods]);

  const onSubmit = async (data: AddProductSchemaType) => {
    try {
      if (!product?.id) return;

      const updatedProduct = new Product(
        data.name,
        data.price,
        product.image,
        product.desc,
        data.category,
        product.color,
        product.rating ?? 3.5,
        product.isFavorite ?? false,
        data.totalQuantity,
        product.id
      );

      await dispatch(Product.updateProduct(updatedProduct));
      handleClose();

      Swal.fire({
        icon: "success",
        title: "Product updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update product",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MyInput id="name" label="Product Name" type="text" />
            {/* <MyInput id="category" label="Category" type="text"/> */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select {...methods.register("category")}>
                <option value="">Select Category</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  category.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
            <MyInput id="price" label="Price" type="number" />
            <MyInput id="totalQuantity" label="Quantity" type="number" />
            {/* <MyInput id="image" label="Image URL" type="text" placeholder="Enter image URL" /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </FormProvider>
    </Modal>
  );
}

export default EditProductModal;
