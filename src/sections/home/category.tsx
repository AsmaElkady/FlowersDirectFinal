import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../constants/main";
import Spinner from "react-bootstrap/Spinner";
import MultiImageSlider from "./carousel";

type Category = {
  id?: number;
  name: string;
  desc: string;
  image: string;
  price?: number;
  rating?: number;
};
const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(baseUrl + "categories");
  console.log(res.data);
  if (Array.isArray(res.data)) return res.data;
  return res.data.categories ?? [];
};

export default function CategoryHome() {
  const { data, isLoading, isError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : isError ? (
        <p className="text-center text-danger">Failed to load categories.</p>
      ) : (
        <MultiImageSlider
          title="Shop by category"
          all="ALL CATEGORY"
          data={data}
        />
      )}
    </>
  );
}
