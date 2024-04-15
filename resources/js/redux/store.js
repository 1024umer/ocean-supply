import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

export const persistor = persistStore(store);

export default store;
