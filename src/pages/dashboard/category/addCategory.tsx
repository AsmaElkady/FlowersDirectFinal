
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AddCategorySchemaType } from "../../../utils/schema";
import { useDispatch } from "react-redux";
import { AddCategory } from "../../../redux/slices/category";
import Swal from "sweetalert2";
import type { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router";
import {
  addCategoryDefaultValues,
  addCategorySchema,
} from "../../../utils/schema/addCategorySchema";

interface IHandelAddProps {
  showM: boolean;
  onClose: () => void;
}

export default function HandelAdd({ showM, onClose }: IHandelAddProps) {
  const [show, setShow] = useState(showM);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AddCategorySchemaType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: addCategoryDefaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    setShow(showM);
  }, [showM]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const onSubmit = async (data: AddCategorySchemaType) => {
    try {
      await dispatch(AddCategory({ category: data })).unwrap();

      Swal.fire({
        title: "Added!",
        text: "Category has been added successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigation("/dashboard/categories");
      });
      reset();
      handleClose();
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while adding the category.",
        icon: "error",
      });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue("image", base64, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="mt-5"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Rose"
              {...register("name")}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write a short description..."
              {...register("desc")}
            />
            {errors.desc && (
              <small className="text-danger">{errors.desc.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              // placeholder="https://example.com/image.png"
              // {...register("image")}
            />
            {errors.image && (
              <small className="text-danger">{errors.image.message}</small>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
