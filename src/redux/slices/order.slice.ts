import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Order, orderState } from "../../types/order";
import { Product } from "../../classes/productClass";
import { updateProduct } from "./productSlice";

// import { update } from './../../../node_modules/sweetalert2/src/instanceMethods/update';

const initialState: orderState = {
  orders: [],
  loading: false,
};

const user = JSON.parse(localStorage.getItem("user") || "null");

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (order: Order, { dispatch }) => {
    const res = await axios.post("http://localhost:3000/orders", order);

    for (const item of order.items) {
      const updatedProduct: Product = new Product(
        item.name,
        item.price,
        item.image,
        item.desc,
        item.category,
        item.color,
        item.rating ?? 0,
        item.isFavorite ?? false,
        item.totalQuantity - item.quantity,
        item.id
      );

      dispatch(updateProduct(updatedProduct));
    }

    return res.data;
  }
);

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const res = await axios.get(`http://localhost:3000/orders`);
  return res.data;
});

export const fetchOrdersByUserId = createAsyncThunk(
  "order/fetchOrdersByUserId",
  async () => {
    const userId = user?.id;
    const res = await axios.get(
      `http://localhost:3000/orders?userId=${userId}`
    );
    return res.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }: { orderId: string; status: string }) => {
    const res = await axios.patch(`http://localhost:3000/orders/${orderId}`, {
      status,
    });

    return res.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId: string) => {
    await axios.delete(`http://localhost:3000/orders/${orderId}`);
    return orderId;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    });
    builder.addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrdersByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrdersByUserId.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default orderSlice.reducer;
