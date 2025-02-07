import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  shippingAddress: null,
  paymentMethod: null,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.items.find((x) => x.product === item.product);

      if (existItem) {
        state.items = state.items.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.items = [...state.items, item];
      }

      // Calculate prices
      state.itemsPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.shippingPrice = state.itemsPrice > 1000 ? 0 : 100;
      state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
      state.totalPrice = (
        state.itemsPrice +
        state.shippingPrice +
        state.taxPrice
      ).toFixed(2);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.product !== action.payload);

      // Recalculate prices
      state.itemsPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.shippingPrice = state.itemsPrice > 1000 ? 0 : 100;
      state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
      state.totalPrice = (
        state.itemsPrice +
        state.shippingPrice +
        state.taxPrice
      ).toFixed(2);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((x) => x.product === productId);
      if (item) {
        item.quantity = quantity;
      }

      // Recalculate prices
      state.itemsPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.shippingPrice = state.itemsPrice > 1000 ? 0 : 100;
      state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
      state.totalPrice = (
        state.itemsPrice +
        state.shippingPrice +
        state.taxPrice
      ).toFixed(2);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  saveShippingAddress,
  savePaymentMethod,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer; 