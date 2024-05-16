import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    loading: false,
    error: null,
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
                state.cart.push(product)
        },

        addMultipleToCart(state, action) {
            const products = action.payload;
            return {
                ...state,
                cart: [...state.cart, ...products],
            };
        },
        clearItemFromCart(state, action) {
            const productIdToRemove = action.payload;
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== productIdToRemove),
            };
        },

        clearCart(state) {
            return {
                ...state,
                cart: [],
            };
        },
    },
});

export const { addToCart, addMultipleToCart, clearItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
