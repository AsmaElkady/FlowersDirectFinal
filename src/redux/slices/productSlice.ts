import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../classes/productClass";
import { baseUrl } from "../../constants/main";

// GET
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    try {
        const res = await axios.get(baseUrl + "products",
            {
                headers: {
                    "Cache-Control": "no-store",
                    Pragma: "no-cache",
                },
            });
        return res.data;
    } catch (err) {
        return err;
    }
});

// POST
export const addProduct = createAsyncThunk(
    "products/add",
    async (product: Product) => {
        const res = await axios.post(baseUrl + "products", product);
        return res.data;
    }
);

// DELETE
export const deleteProduct = createAsyncThunk("products/delete", async (id: number) => {
    await axios.delete(`${baseUrl}products/${id}`);
    return id;
});

// UPDATE
export const updateProduct = createAsyncThunk("products/update", async (product: Product) => {
    const res = await axios.put(`${baseUrl}products/${product.id}`, product);
    return res.data;
}
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [] as Product[],
        loading: false,
        error: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load products";
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.items.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
               const idx = state.items.findIndex((p) => p.id === action.payload);
               state.items.splice(idx,1);
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default productsSlice.reducer;
