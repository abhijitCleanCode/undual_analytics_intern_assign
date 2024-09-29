import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    selectedCategory: null
}

const productSlice = createSlice({
    name: "products",
    initialState,

    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        selectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        appendProducts: (state, action) => {
            state.products = [...state.products, ...action.payload];
          },
    }
})

export const { setProducts, selectedCategory, appendProducts } = productSlice.actions;

export default productSlice.reducer;