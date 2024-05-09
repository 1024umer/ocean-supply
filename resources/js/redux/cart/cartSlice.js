import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    loading: false,
    error: null,
    count:0,
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            state.count++;
            return {
                ...state,
                cart: [...state.cart, product],
            };
        },

        addMultipleToCart(state, action) {
            const products = action.payload;
            return {
                ...state,
                cart: [...state.cart, ...products],
            };
        },
    },
});

export const { addToCart, addMultipleToCart } = cartSlice.actions;

export default cartSlice.reducer;
