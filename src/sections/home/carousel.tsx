
import "./carousel.css";
import Container from "react-bootstrap/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import type { IProduct } from "../../types/productType";
import { addOrUpdateCartApi } from "../../redux/slices/cartApi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import Rating from "@mui/material/Rating";
import { Admin } from "../../classes/users";

type Category = {
  id?: number;
  name: string;
  desc: string;
  image: string;
  price?: number;
  rating?: number;
};

interface MultiImageSliderProps {
  title: string;
  all: string;
  data: Category[] | undefined;
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1.2 },
};

export default function MultiImageSlider({
  title,
  all,
  data,
}: MultiImageSliderProps) {
  const displayData = data?.length ? data : [];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(
    (state: RootState) => state.Cart.cart.cartItems
  );
    //check admin
    const user = useSelector((state: RootState) => state.auth.user);
    // const { users, status } = useSelector((state: RootState) => state.admin);
    const checkType = Admin.checkAdmin(user?.email ?? "");
  
  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-secondary fw-bold">{title}</h3>
        <Button
          variant="secondary"
          className="rounded-4 text-white px-4"
          onClick={() => navigate("/products")}
        >
          {all}
        </Button>
      </div>

      <Carousel
        autoPlay
        arrows
        swipeable
        draggable
        responsive={responsive}
        infinite
        autoPlaySpeed={2500}
        keyBoardControl
        transitionDuration={600}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {displayData.map((item) => (
          <div
            key={item.id}
            className="category-card-small mx-2"
            style={{ width: 210 }}
          >
            {item.price ? (
              <>
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-100 rounded-3"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
              </>
            ) : (
              <>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-100 rounded-3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </>
            )}
            {/* <p className="text-center mt-2 fw-bold">{item.name}</p> */}
            <div className="category-text">
              <h6 className="m-2">{item.name}</h6>
              <p>
                {item.desc
                  ? item.desc.split(" ").slice(0, 6).join(" ") + "..."
                  : ""}
              </p>
              <Rating
                name="half-rating-read"
                defaultValue={item.rating ?? 2.5}
                precision={0.5}
                readOnly
              />
              <p className="fw-bold">
                {item.price ? (
                  <>
                    <Button
                      variant="outline-primary"
                      disabled={
                        cartItems.some((p: IProduct) => p.id === item.id) ||
                        checkType.status
                      }
                      onClick={() =>
                        dispatch(
                          addOrUpdateCartApi({ product: item as IProduct })
                        )
                      }
                    >
                      Add to Cart
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </Container>
  );
}
