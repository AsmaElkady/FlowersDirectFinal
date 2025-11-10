import { Container, Row, Col, Spinner } from "react-bootstrap";
import Filter from "../../components/Filter/Filter";
import "../../index.css";
import ProductList from "../../components/ProductList/ProductList";
import type { IProduct } from "../../types/productType";
import { Helmet } from "react-helmet";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { Product } from "../../classes/productClass";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: data,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const [filters, setFilters] = useState({
    color: "",
    category: "",
    price: 500,
  });

  useEffect(() => {
    dispatch(Product.getProducts());
  }, [dispatch]);

  const minPrice = useMemo(() => {
    return data.length > 0
      ? Math.min(...data.map((p: IProduct) => p.price))
      : 0;
  }, [data]);

  const maxPrice = useMemo(() => {
    return data.length > 0
      ? Math.max(...data.map((p: IProduct) => p.price))
      : 0;
  }, [data]);

  const filteredProducts = useMemo(() => {
    if (!data || data.length === 0) return [];

    const noFiltersApplied =
      !filters.color && !filters.category && filters.price === 0;

    if (noFiltersApplied) return data;

    return data.filter((product: IProduct) => {
      const matchesColor = filters.color
        ? product.color?.toLowerCase() === filters.color.toLowerCase()
        : true;
      const matchesCategory = filters.category
        ? product.category?.toLowerCase() === filters.category.toLowerCase()
        : true;
      const matchesPrice = filters.price
        ? product.price <= filters.price
        : true;

      return matchesColor && matchesCategory && matchesPrice;
    });
  }, [data, filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  if (error)
    return <h2>Errors....Failed to load products, Please try again later.</h2>;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/products" />
      </Helmet>
      <Container className="py-5">
        <h2 className="fw-bold mb-4 text-primary mt-5">Shop All Flowers</h2>
        <Row>
          <Col md={3}>
            <Filter
              onFilterChange={setFilters}
              minPrice={minPrice}
              maxPrice={maxPrice}
              allProducts={data}
            />
          </Col>
          <Col md={9}>
            <ProductList
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
