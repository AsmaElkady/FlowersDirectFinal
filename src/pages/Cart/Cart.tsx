import { useDispatch, useSelector } from "react-redux";
import "../../style/cart.css";
import type { AppDispatch, RootState } from "../../redux/store";
import DrowCart from "./DrowCart";
import CartSummary from "./summary";
import { clearCartApi } from "../../redux/slices/cartApi";
import { Helmet } from "react-helmet";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
////////////////////////
export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(
    (state: RootState) => state.Cart.cart.cartItems
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = cartItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <link rel="canonical" href="http://mysite.com/cart" />
      </Helmet>
      <div className="cart-root container py-4 vh-100">
        <h2 className="cart-title text-center m-5">Your Flower Basket</h2>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="list">
              {cartItems.length > 0 ? (
                <button
                  className="btn btn-primary ms-auto d-block mb-3"
                  onClick={() => {
                    dispatch(clearCartApi());
                  }}
                >
                  Clear All
                </button>
              ) : (
                ""
              )}

              {cartItems.length > 0 ? (
                <>
                  {currentItems.map((item) => (
                    <div key={item.id}>
                      <DrowCart item={item} />
                    </div>
                  ))}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                      <Pagination>
                        <Pagination.First
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(1)}
                        />
                        <Pagination.Prev
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                        />
                        {[...Array(totalPages)].map((_, index) => (
                          <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                        />
                        <Pagination.Last
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(totalPages)}
                        />
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <h4 className="text-center text-muted">There are no items</h4>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <CartSummary />
          </div>
        </div>
      </div>
    </>
  );
}
