import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Card, Button, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import CloseIcon from "@mui/icons-material/Close";
import { clearFavApi, deleteFavItemApi } from "../../redux/slices/favSlice";
import { addOrUpdateCartApi } from "../../redux/slices/cartApi";
import type { IProduct } from "../../types/productType";

type Props = {
  show: boolean;
  onHide: () => void;
};

export default function FavModel({ show, onHide }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(
    (state: RootState) => state.Cart.cart.cartItems
  );
  const favItems = useSelector((state: RootState) => state.FavSlice.favItem);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(favItems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = favItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Favorites
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {favItems.length > 0 && (
            <Button
              variant="primary"
              onClick={() => dispatch(clearFavApi())}
              className="mb-3"
            >
              Clear All
            </Button>
          )}

          {favItems.length > 0 ? (
            <>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {currentItems.map((item) => (
                  // <Card
                  //   key={item.id}
                  //   className="shadow-sm border-0 rounded-4 p-2 position-relative"
                  //   style={{ width: "220px", minHeight: "350px" }}
                  // >
                  //   <Button
                  //     className="position-absolute"
                  //     style={{
                  //       top: 8,
                  //       right: 8,
                  //       background: "transparent",
                  //       border: "none",
                  //     }}
                  //     onClick={() => dispatch(deleteFavItemApi(item.id ?? 0))}
                  //   >
                  //     <CloseIcon className="text-light" />
                  //   </Button>

                  //   <div className="card-img-container">
                  //     <Card.Img
                  //       className="w-100 rounded-3"
                  //       style={{ height: "200px", objectFit: "cover" }}
                  //       variant="top"
                  //       src={item.image}
                  //       alt={item.name}
                  //     />
                  //     <Card.Body className="d-flex flex-column justify-content-between align-items-start">
                  //       <div className="text-start">
                  //         <Card.Title className="fw-semibold">{item.name}</Card.Title>
                  //         <Card.Subtitle className="text-muted small mb-2">
                  //           {item.category}
                  //         </Card.Subtitle>
                  //         <Card.Text className="fw-bold mb-1">{item.price} EGP</Card.Text>
                  //         <Card.Text className="fw-bold">Rating: {item.rating}</Card.Text>
                  //       </div>
                  //       <div className="mt-3 me-4">
                  //         <Button
                  //           variant="outline-primary"
                  //           disabled={cartItems.some(
                  //             (p: IProduct) => p.id === item.id
                  //           )}
                  //           onClick={() =>
                  //             dispatch(addOrUpdateCartApi({ product: item }))
                  //           }
                  //         >
                  //           Add to Cart
                  //         </Button>
                  //       </div>
                  //     </Card.Body>
                  //   </div>
                  // </Card>
                  <Card
                    className="shadow-sm border-0 rounded-4 p-2 category-card-small mx-2"
                    style={{ width: 210 }}
                  >
                    <Button
                      className="position-absolute"
                      style={{
                        top: 8,
                        right: 8,
                        background: "transparent",
                        border: "none",
                      }}
                      onClick={() => dispatch(deleteFavItemApi(item.id ?? 0))}
                    >
                      <CloseIcon className="text-primary" />
                    </Button>
                    <div className="card-img-container">
                      <Card.Img
                        className="w-100 rounded-3"
                        style={{ height: "200px", objectFit: "cover" }}
                        variant="top"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column justify-content-between align-items-start">
                      <div className="text-start">
                        <Card.Title className="fw-semibold">
                          {item.name}
                        </Card.Title>
                        <Card.Subtitle className="text-muted small mb-2">
                          {item.category}
                        </Card.Subtitle>
                        <Card.Text className="fw-bold mb-1">
                          {item.price} EGP
                        </Card.Text>
                        <Card.Text className="fw-bold">
                          Rating: {item.rating}
                        </Card.Text>
                      </div>
                      <div className="mt-3 me-4">
                        <Button
                          variant="outline-primary"
                          disabled={cartItems.some(
                            (p: IProduct) => p.id === item.id
                          )}
                          onClick={() =>
                            dispatch(addOrUpdateCartApi({ product: item }))
                          }
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>

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
            <h2 className="text-center text-muted mt-4">No favorites yet</h2>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
