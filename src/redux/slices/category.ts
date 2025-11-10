import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../constants/main";

export interface ICategory {
  id: number;
  name: string;
  desc: string;
  image?: string | undefined;
}

interface CategoryState {
  category: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  category: [],
  loading: false,
  error: null,
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const res = await axios.get(baseUrl + "categories");
    return res.data as ICategory[];
  }
);

export const AddCategory = createAsyncThunk(
  "category/addCategory",
  async ({ category }: { category: Omit<ICategory, "id"> }) => {
    const res = await axios.post(baseUrl + "categories", category);
    return res.data as ICategory;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number) => {
    await axios.delete(`${baseUrl}categories/${id}`);
    return id;
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, category }: { id: number; category: Omit<ICategory, "id"> }) => {
    const res = await axios.put(`${baseUrl}categories/${id}`, category);
    console.log(res);
    return res.data;
  }
);
// Slice
const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });

    // add
    builder.addCase(AddCategory.fulfilled, (state, action) => {
      state.category.push(action.payload);
    });

    // delete
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.category = state.category.filter(
        (cat) => cat.id !== action.payload
      );
    });
    builder.addCase(editCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default categorySlice.reducer;
