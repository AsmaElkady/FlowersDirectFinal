import { Button, Col, Form, Row } from "react-bootstrap";
import {
  type AppDispatch,
  useAppDispatch,
  type RootState,
} from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { Product } from "../../../../classes/productClass";
import BasicDetails from "./components/BasicDetails";
import PriceInventory from "./components/PriceInventory";
import ImageUpload from "./components/ImageUpload";
import CategoryColor from "./components/CategoryColor";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { FormProvider, useForm } from "react-hook-form";
import type { IProduct } from "../../../../types/productType";
import {
  addProductDefaultValues,
  addProductSchema,
  type AddProductSchemaType,
} from "../../../../utils/schema/addProductSchema";
import { useNavigate } from "react-router";

function AddProduct() {
  const dispatch = useAppDispatch<AppDispatch>();
  const navigation = useNavigate();

  const { items: products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(Product.getProducts());
  }, [dispatch]);

  const methods = useForm<IProduct>({
    resolver: zodResolver(addProductSchema),
    defaultValues: addProductDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return Array.from(unique);
  }, [products]);

  const colors = useMemo(() => {
    const unique = new Set(products.map((p) => p.color));
    return Array.from(unique);
  }, [products]);

  const onSubmit = async (data: AddProductSchemaType) => {
    const newProduct = new Product(
      data.name,
      Number(data.price),
      data.image,
      data.desc,
      data.category,
      data.color,
      data.rating ?? 3.5,
      data.isFavorite ?? false,
      Number(data.totalQuantity)
    );

    try {
      await dispatch(Product.addProduct(newProduct)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product added successfully!",
        confirmButtonColor: "#4e0629",
        background: "#fbeff4",
      });
      reset();
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to add product. Please try again.",
        confirmButtonColor: "#dc466a",
        background: "#fbeff4",
      });
    }
    navigation("/dashboard/products");
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Add New Product</h4>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <div className="p-4 border-1 border-black shadow">
                <BasicDetails />
                <PriceInventory />
              </div>
            </Col>
            <Col md={6}>
              <div className="p-4 border-1 border-black shadow">
                <ImageUpload />
                <CategoryColor categories={categories} colors={colors} />
              </div>
            </Col>
          </Row>
          <Button
            type="submit"
            variant="primary"
            className="d-block mt-3 ms-auto"
          >
            Publish Product
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}

export default AddProduct;
