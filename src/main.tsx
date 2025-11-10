import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import LayOut from "./layout/layout.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomePage from "./pages/home/home.tsx";
import "./style/main.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import UsersDB from "./pages/dashboard/users/usersDB.tsx";
import OrdersAdmin from "./pages/dashboard/orders/ordersAdmin.tsx";
import OverView from "./pages/dashboard/overview/overview.tsx";
import CategoryDB from "./pages/dashboard/category/categoryDB.tsx";
import AddProduct from "./pages/dashboard/productDB/AddProduct/AddProduct.tsx";
import ProductListAdmin from "./pages/dashboard/productDB/productList/ProductListAdmin.tsx";
import Login from "./pages/login/login.tsx";
import ContactUs from "./pages/contact/contact.tsx";
import OrderDetails from "./pages/OrderDetails/OrderDetails.tsx";

const rout = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "about",
        lazy: async () => {
          const x = await import("./pages/about/about.tsx");
          return { Component: x.default };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const x = await import("./pages/notFound/notFound.tsx");
          return { Component: x.default };
        },
      },
      {path:"contact",element:<ContactUs/>},
      {
        path: "products",
        lazy: async () => {
          const x = await import("./pages/products/products.tsx");
          return { Component: x.default };
        },
      },
      {
        path: "products/:id",
        lazy: async () => {
          const x = await import("./pages/ProductDetails/ProductDetails.tsx");
          return { Component: x.default };
        },
      },
      {
        path: "cart",
        lazy: async () => {
          const x = await import("./pages/Cart/Cart.tsx");
          return { Component: x.default };
        },
      },
      {
        path: "checkout",
        lazy: async () => {
          const x = await import("./pages/CheckOut/CheckOut.tsx");
          return { Component: x.default };
        },
      },
      {
        path: "order-details/:orderId",
        lazy: async () => {
          const x = await import("./pages/OrderDetails/OrderDetails.tsx");
          return { Component: x.default };
        },
      },
      {
        path: "profile",
        lazy: async () => {
          const x = await import("./pages/userProfile/userProfile.tsx");
          return { Component: x.default };
        },
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
    // lazy: async () => {
    //   const x = await import("./pages/login/login.tsx");
    //   return { Component: x.default };
    // },
  },
  {
    path: "/Signup",
    lazy: async () => {
      const x = await import("./pages/signup/signup.tsx");
      return { Component: x.default };
    },
  },
  {
    path: "/ForgetPassword",
    lazy: async () => {
      const x = await import("./pages/forgetPassword/forgetPassword.tsx");
      return { Component: x.default };
    },
  },
  {
    path: "/ResetPassword",
    lazy: async () => {
      const x = await import("./pages/resetPassword/resetPassword.tsx");
      return { Component: x.default };
    },
  },
  {
    path: "/Profile",
    lazy: async () => {
      const x = await import("./pages/userProfile/userProfile.tsx");
      return { Component: x.default };
    },
  },
  {
    path: "/dashboard",
    lazy: async () => {
      const x = await import("./pages/dashboard/layout/layout.tsx");
      return { Component: x.default };
    },
    children: [
      { index: true, element: <OverView /> },
      { path: "categories", element: <CategoryDB /> },
      { path: "AddProduct", element: <AddProduct /> },
      { path: "products", element: <ProductListAdmin /> },
      { path: "orders", element: <OrdersAdmin /> },
      { path: "orders/:orderId", element: <OrderDetails /> },

      { path: "users", element: <UsersDB /> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <ThemeProvider>
          <Suspense fallback={<h2>Loading ... </h2>}>
            <RouterProvider router={rout}></RouterProvider>
          </Suspense>
        </ThemeProvider>
      </StrictMode>
    </QueryClientProvider>
  </Provider>
);
