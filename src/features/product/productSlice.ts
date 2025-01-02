import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  liked: boolean;
  favorit: boolean;
}

interface IProductState {
  products: IProduct[];
  favorites: number[];
  loading: boolean;
  error: string | null;
  visibleProductsCount: number;
}

const initialState: IProductState = {
  products: JSON.parse(localStorage.getItem("products") || "[]"),
  favorites: [],
  loading: false,
  error: null,
  visibleProductsCount: parseInt(
    localStorage.getItem("visibleProductsCount") || "10",
    10
  ),
};

const saveProductsToLocalStorage = (products: IProduct[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const fetchProducts = createAsyncThunk<
  IProduct[],
  void,
  { rejectValue: string }
>("product/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch products"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      if (state.favorites.includes(productId)) {
        state.favorites = state.favorites.filter((id) => id !== productId);
      } else {
        state.favorites.push(productId);
      }
    },
    removeProductFromState: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
      state.visibleProductsCount = Math.max(state.visibleProductsCount - 1, 1);
      saveProductsToLocalStorage(state.products);
      localStorage.setItem(
        "visibleProductsCount",
        state.visibleProductsCount.toString()
      );
    },
    addLocalProduct: (state, action) => {
      const newProduct = action.payload;
      const newId = state.products.length
        ? Math.max(...state.products.map((product) => product.id)) + 1
        : 1;
      const productWithId = { ...newProduct, id: newId };
      state.products.unshift(productWithId);
      state.visibleProductsCount += 1; 
      saveProductsToLocalStorage(state.products);
      localStorage.setItem(
        "visibleProductsCount",
        state.visibleProductsCount.toString()
      );
    },
    editProductLocally: (state, action) => {
      const { id, updates } = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...updates,
        };
      }
      saveProductsToLocalStorage(state.products);
    },
    toggleLike: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        state.products[productIndex].liked =
          !state.products[productIndex].liked;
      }
      saveProductsToLocalStorage(state.products);
    },
    toggleFavoriteStatus: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        state.products[productIndex].favorit =
          !state.products[productIndex].favorit;
      }
      saveProductsToLocalStorage(state.products);
    },
    updateVisibleProductsCount: (state, action) => {
      state.visibleProductsCount = action.payload;
      localStorage.setItem(
        "visibleProductsCount",
        state.visibleProductsCount.toString()
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;

        state.visibleProductsCount = 10;
        localStorage.setItem("visibleProductsCount", "10");

        saveProductsToLocalStorage(state.products);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  toggleFavorite,
  editProductLocally,
  removeProductFromState,
  addLocalProduct,
  toggleLike,
  toggleFavoriteStatus,
  updateVisibleProductsCount,
} = productSlice.actions;

export default productSlice.reducer;
