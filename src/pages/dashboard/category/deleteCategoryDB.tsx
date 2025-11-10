import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import Swal from "sweetalert2";
import { deleteCategory, fetchCategory } from "../../../redux/slices/category";
import { Button } from "react-bootstrap";

interface Iprops {
    id:number,
    name:string
}
export default function DeleteCategory({ id , name}: Iprops) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: number) => {
    Swal.fire({
      title: `Are you sure delete ${name}?`,
      text: "You won’t be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id))
          .unwrap()
          .then(() => {
            dispatch(fetchCategory());
            Swal.fire({
              title: "Deleted!",
              text: "The category has been successfully deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting the category.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <>
      <Button
        title="Delete"
        className="text-danger bg-transparent border-0"
        onClick={() => handleDelete(id)}
      >
        <i className="bi bi-trash3"></i>
      </Button>
    </>
  );
}
