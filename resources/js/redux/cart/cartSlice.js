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
            const existingProduct = state.cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },

        addMultipleToCart(state, action) {
            const products = action.payload;
            products.forEach(product => {
                const existingProduct = state.cart.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    state.cart.push({ ...product, quantity: 1 });
                }
            });
        },
        
        clearItemFromCart(state, action) {
            const productIdToRemove = action.payload;
            state.cart = state.cart.filter(item => item.id !== productIdToRemove);
        },
        
        clearCart(state) {
            state.cart = [];
        },
        
        increaseQuantity(state, action) {
            const productId = action.payload;
            const product = state.cart.find(item => item.id === productId);
            if (product) {
                product.quantity += 1;
            }
        },
        
        decreaseQuantity(state, action) {
            const productId = action.payload;
            const product = state.cart.find(item => item.id === productId);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        }
    },
});

export const { addToCart, addMultipleToCart, clearItemFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
