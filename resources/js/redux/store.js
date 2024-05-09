import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import cartReducer from './cart/cartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
});

const userPersistConfig = {
    key: 'user',
    storage,
    version: 1,
};

const cartPersistConfig = {
    key: 'cart',
    storage,
    version: 1,
    blacklist: [], // Add any non-serializable properties here
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Ignore serializability check
        }),
});

export const persistor = persistStore(store);
