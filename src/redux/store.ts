import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import FavSlice from "./slices/favSlice";
import CartApi from "./slices/cartApi";
import productSlice from "./slices/productSlice";
import cartReducer from "./slices/cartApi";
import Category from "./slices/category";
import adminSlice from "./slices/AdminSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import orderSlice from "./slices/order.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    FavSlice: FavSlice,
    CartApi,
    products: productSlice,
    Cart: cartReducer,
    Category,
    admin: adminSlice,
    orderSlice: orderSlice,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
