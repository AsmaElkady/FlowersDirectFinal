import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/main";
import type { IProduct } from "../../types/productType";
import type { CartState, ICartProduct } from "../../types/cart";

//  Helper: Get current user ID safely

const getUserId = (): number | null => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.id || null;
  } catch {
    return null;
  }
};

const initialState: CartState = {
  cart: {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  loading: false,
  error: null,
};
// ==================================================
//  Helper: Calculate totals

const calcTotals = (cartItems: ICartProduct[]) => {
  const updatedCartItems = cartItems.map((item) => ({
    ...item,
    total: item.price! * item.quantity,
  }));

  const totalQuantity = updatedCartItems.reduce(
    (sum, i) => sum + i.quantity,
    0
  );
  const totalPrice = updatedCartItems.reduce((sum, i) => sum + i.total, 0);

  return { cartItems: updatedCartItems, totalQuantity, totalPrice };
};

// ==================================================
//  Fetch user's cart

export const fetchCartApi = createAsyncThunk("cart/fetchCartApi", async () => {
  const userId = getUserId();
  if (!userId) throw new Error("User not found!");

  const res = await axios.get(baseUrl + "users/" + userId);
  const user = res.data;
  return user.cart[0] || calcTotals([]);
});

// ==================================================
//  Add or Update Cart Item

export const addOrUpdateCartApi = createAsyncThunk(
  "cart/addOrUpdateCartApi",
  async ({ product }: { product: IProduct }) => {
    const userId = getUserId();
    if (!userId) throw new Error("User not found!");
    const res = await axios.get(baseUrl + "users/" + userId);
    const user = res.data;
    const currentCart = user.cart[0] || calcTotals([]);
    const updatedCartItems = [
      ...currentCart.cartItems,
      { ...product, quantity: 1 },
    ];
    const updatedCart = calcTotals(updatedCartItems);
    await axios.patch(baseUrl + "users/" + userId, { cart: [updatedCart] });
    return updatedCart;
  }
);

// ==================================================
// Increase Quantity
export const increaseQuantityApi = createAsyncThunk(
  "cart/increaseQuantityApi",
  async ({ productId }: { productId: number }) => {
    const userId = getUserId();
    if (!userId) throw new Error("User not found!");

    const res = await axios.get(baseUrl + "users/" + userId);
    const user = res.data;
    const currentCart = user.cart[0] || calcTotals([]);

    const updatedCartItems = currentCart.cartItems.map((i: ICartProduct) =>
      i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
    );

    const updatedCart = calcTotals(updatedCartItems);
    await axios.patch(baseUrl + "users/" + userId, { cart: [updatedCart] });
    return updatedCart;
  }
);

// ==================================================
//  Decrease Quantity

export const decreaseQuantityApi = createAsyncThunk(
  "cart/decreaseQuantityApi",
  async ({ productId }: { productId: number }) => {
    const userId = getUserId();
    if (!userId) throw new Error("User not found!");

    const res = await axios.get(baseUrl + "users/" + userId);
    const user = res.data;
    const currentCart = user.cart[0] || calcTotals([]);

    const updatedCartItems = currentCart.cartItems.map((i: ICartProduct) =>
      i.id === productId
        ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 }
        : i
    );

    const updatedCart = calcTotals(updatedCartItems);
    await axios.patch(baseUrl + "users/" + userId, { cart: [updatedCart] });
    return updatedCart;
  }
);

// ==================================================
//  Delete single product
export const deleteCartItemApi = createAsyncThunk(
  "cart/deleteCartItemApi",
  async (productId: number) => {
    const userId = getUserId();
    if (!userId) throw new Error("User not found!");

    const res = await axios.get(baseUrl + "users/" + userId);
    const user = res.data;
    const currentCart = user.cart[0] || calcTotals([]);

    const updatedCartItems = currentCart.cartItems.filter(
      (i: ICartProduct) => i.id !== productId
    );
    const updatedCart = calcTotals(updatedCartItems);

    await axios.patch(baseUrl + "users/" + userId, { cart: [updatedCart] });
    return updatedCart;
  }
);

//  Clear Cart
export const clearCartApi = createAsyncThunk("cart/clearCartApi", async () => {
  const userId = getUserId();
  if (!userId) throw new Error("User not found!");

  const clearedCart = calcTotals([]);
  await axios.patch(baseUrl + "users/" + userId, { cart: [clearedCart] });
  return clearedCart;
});

//  Slice
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartApi.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addOrUpdateCartApi.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(increaseQuantityApi.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(decreaseQuantityApi.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(deleteCartItemApi.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCartApi.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
