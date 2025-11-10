import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/main";
import type { IFav } from "../../types/fav";
import type { IProduct } from "../../types/productType";

//  Helper: Get current user ID safely
const getUserId = (): string | null => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.id || null;
  } catch {
    return null;
  }
};
//  Slice Interface & Initial State
const initialState: IFav = {
  favItem: [],
  loading: false,
  error: null,
};
export const fetchFavApi = createAsyncThunk<IProduct[]>(
  "fav/fetchFavApi",
  async () => {
    const userId = getUserId();
    if (!userId) throw new Error("User not found!");
    const res = await axios.get(baseUrl + "users/" + userId);
    return res.data.favorites || [];
  }
);
export const addFavApi = createAsyncThunk<IProduct[], { product: IProduct }>(
  "fav/addFavApi",
  async ({ product }) => {
    const userId = getUserId();
    if (!userId) throw new Error("User not found!");
    const res = await axios.get(baseUrl + "users/" + userId);
    const currentFav = res.data.favorites || [];
    const updatedFav = [...currentFav, product];
    await axios.patch(baseUrl + "users/" + userId, { favorites: updatedFav });
    return updatedFav;
  }
);

export const deleteFavItemApi = createAsyncThunk<IProduct[], number>(
  "fav/deleteFavItemApi",
  async (productId) => {
    const userId = getUserId();
    if (!userId) throw new Error("User not found!");
    const res = await axios.get(baseUrl + "users/" + userId);
    const currentFav = res.data.favorites || [];
    const updatedFav = currentFav.filter(
      (item: IProduct) => item.id !== productId
    );
    await axios.patch(baseUrl + "users/" + userId, { favorites: updatedFav });
    return updatedFav;
  }
);
//  Clear Cart
export const clearFavApi = createAsyncThunk<IProduct[]>(
  "fav/clearFavApi",
  async () => {
    const userId = getUserId();
    if (!userId) throw new Error("User not found!");
    await axios.patch(baseUrl + "users/" + userId, { favorites: [] });
    return [];
  }
);

//  Slice
const cartSlice = createSlice({
  name: "FavSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchFavApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavApi.fulfilled, (state, action) => {
        state.loading = false;
        state.favItem = action.payload;
      })
      .addCase(fetchFavApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addFavApi.fulfilled, (state, action) => {
        state.loading = false;
        state.favItem = action.payload;
      })

      // Delete
      .addCase(deleteFavItemApi.fulfilled, (state, action) => {
        state.favItem = action.payload;
      })

      // Clear
      .addCase(clearFavApi.fulfilled, (state, action) => {
        state.favItem = action.payload;
      });
  },
});

export default cartSlice.reducer;
