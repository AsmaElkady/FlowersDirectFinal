import Swal from "sweetalert2";
import type { IProduct } from "../types/productType";
import type { AppDispatch } from "../redux/store";
import { addOrUpdateCartApi } from "../redux/slices/cartApi";

/**
 * Handles adding a product to cart globally.
 *
 * @param dispatch Redux dispatch function
 * @param navigate React router navigate function
 * @param product The product to add
 * @param showNotification Optional callback to show success messages
 */
export const handleAddToCartGlobal = (
  dispatch: AppDispatch,
  navigate: (path: string) => void,
  product: IProduct,
  showNotification?: (message: string, bg: "danger" | "primary") => void
) => {
  const token = localStorage.getItem("token");

  if (token) {
    dispatch(addOrUpdateCartApi({ product }));
    if (showNotification) {
      showNotification(`🛒 ${product.name} added to cart!`, "primary");
    }
  } else {
    Swal.fire({
      title: "You Should Login first",
      html: "Please login to continue",
      icon: "error",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        title: "swal-title",
        htmlContainer: "swal-text",
      },
      willClose: () => {
        navigate("/Login");
      },
    });
  }
};
