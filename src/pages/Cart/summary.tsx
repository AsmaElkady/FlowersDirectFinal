import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router";
export default function CartSummary() {
  const cartItems = useSelector(
    (state: RootState) => state.Cart.cart.cartItems
  );
  const totalPrice = useSelector(
    (state: RootState) => state.Cart.cart.totalPrice
  );
const navigate = useNavigate();
    return(
        <>
            <div className="summary p-4 rounded-4 shadow-sm bg-white">
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                    <div>Subtotal</div>
                    <div className="fw-bold">
                        {totalPrice}
                        {/* {cartItems.reduce((acc, item) => acc + item.price, 0)} EGP */}
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3 text-muted small">
                    <div>Estimated delivery</div>
                    <div>2–4 days</div>
                </div>
                <button className="btn btn-primary w-100" disabled={cartItems.length === 0} onClick={() => navigate('/checkout')}>
                    Checkout
                </button>
            </div>
        </>
    )
}
