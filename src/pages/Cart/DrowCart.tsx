import { useDispatch } from "react-redux";
import type { ICartProduct } from "../../types/cart";
import {
  decreaseQuantityApi,
  deleteCartItemApi,
  increaseQuantityApi,
} from "../../redux/slices/cartApi";
import type { AppDispatch } from "../../redux/store";

type props = {
  item: ICartProduct;
};
export default function DrowCart({ item }: props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div
        key={item.id}
        className="cart-item d-flex align-items-center p-3 rounded-4 shadow-sm mb-3"
      >
        <div className="thumb me-3">
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: 120,
              height: 90,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </div>
        <div className="flex-grow-1">
          <h5 className="mb-1">{item.name}</h5>
          <p className="mb-1 text-muted small">{item.desc}</p>
          <div className="d-flex align-items-center gap-3">
            <div className="qty-controls d-flex align-items-center">
              <button
                className="qty-btn"
                disabled={item.quantity <= 1}
                aria-label="decrease"
                onClick={() =>
                  dispatch(decreaseQuantityApi({ productId: item.id ??0 }))
                }
              >
                −
              </button>
              <div className="quantity-badge">{item.quantity}</div>

              <button
                className="qty-btn"
                aria-label="increase"
                disabled={item.quantity >= item.totalQuantity}
                onClick={() =>
                  dispatch(increaseQuantityApi({ productId: item.id ?? 0 }))
                }
              >
                +
              </button>
            </div>
            <div className="fw-bold">{item.total} EGP</div>
            <button
              className="btn btn-outline-primary btn-sm ms-auto"
              onClick={() => dispatch(deleteCartItemApi(item.id ??0))}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
