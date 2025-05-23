import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartReducer } from './cartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart:cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: import.meta.env.MODE === 'production' ? ['sensitiveReducer'] : [], // blacklist sensitive data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: import.meta.env.MODE === 'development', // Enable only in development
});

export const persistor = persistStore(store);