import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Container, Spinner } from "react-bootstrap";
import MultiImageSlider from "./carousel";

export default function HotProductHome() {
  async function getProducts() {
    const res = await axios.get(`http://localhost:3000/products?_limit=10`, {
      headers: {
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
    });
    return res.data;
  }

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  return (
    <>
      <Container className="py-5">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="secondary" />
          </div>
        ) : isError ? (
          <p className="text-center text-danger">Failed to load categories.</p>
        ) : (
          <MultiImageSlider
            title="Hot products"
            all="ALL HOT PRODUCTS"
            data={data}
          />
        )}
      </Container>
    </>
  );
}
