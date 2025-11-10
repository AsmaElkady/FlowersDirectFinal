import Features from "../../sections/home/features.tsx";
import HeadConponent from "../../sections/home/head.tsx";
import HotProduct from "../../sections/home/hotProduct.tsx";
import Delivered from "../../sections/home/delivered.tsx";
import Special from "../../sections/home/special.tsx";
import CategoryHome from "../../sections/home/category.tsx";
import HotProductHome from "../../sections/home/product.tsx";
import { Helmet } from "react-helmet";
export default function HomePage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <meta name="description" content="Flowers store" />
        <link rel="canonical" href="http://mysite.com/" />
      </Helmet>
      <HeadConponent />
      <Features />
      <CategoryHome />
      <HotProduct />

      <HotProductHome />

      <Delivered />

      <Special />
    </>
  );
}
