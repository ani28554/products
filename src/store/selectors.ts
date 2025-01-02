
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store"; 


const selectAllProducts = (state: RootState) => state.product.products;

export const selectFavorites = createSelector([selectAllProducts], (products) =>
  products.filter((product) => product.favorit)
);
