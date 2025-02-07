import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice'; // Import the reducer
import vendorReducer from './vendorSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    vendor: vendorReducer,
  },
});
