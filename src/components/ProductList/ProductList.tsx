import { Row, Col, Pagination } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import type { IProduct } from "../../types/productType";

interface ProductListProps {
  products: IProduct[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function ProductList({
  products,
  currentPage,
  totalPages,
  setCurrentPage,
}: ProductListProps) {
  return (
    <>
      {products.length === 0 ? (
        <div className="text-center mt-5 text-muted fs-5">
          No products found matching your filters.
        </div>
      ) : (
        <>
          <Row className="g-4">
            {products.map((product) => (
              <Col
                key={product.id}
                md={4}
                className=" d-flex align-items-center justify-content-center"
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </>
      )}
    </>
  );
}
