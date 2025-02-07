import { createSlice } from '@reduxjs/toolkit';

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    vendors: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchVendorsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchVendorsSuccess(state, action) {
      state.loading = false;
      state.vendors = action.payload;
    },
    fetchVendorsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerVendor(state, action) {
      state.vendors.push(action.payload);
    },
  },
});

export const {
  fetchVendorsStart,
  fetchVendorsSuccess,
  fetchVendorsFailure,
  registerVendor,
} = vendorSlice.actions;

export default vendorSlice.reducer;