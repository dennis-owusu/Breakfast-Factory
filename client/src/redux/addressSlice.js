import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [],
  currentAddress: null,
  loading: false,
  error: null
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    // Start loading addresses
    fetchAddressesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Successfully fetched addresses
    fetchAddressesSuccess: (state, action) => {
      state.addresses = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Failed to fetch addresses
    fetchAddressesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Start adding a new address
    addAddressStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Successfully added a new address
    addAddressSuccess: (state, action) => {
      state.addresses.push(action.payload);
      state.currentAddress = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Failed to add a new address
    addAddressFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Set the current address
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    // Clear the current address
    clearCurrentAddress: (state) => {
      state.currentAddress = null;
    }
  }
});

export const {
  fetchAddressesStart,
  fetchAddressesSuccess,
  fetchAddressesFailure,
  addAddressStart,
  addAddressSuccess,
  addAddressFailure,
  setCurrentAddress,
  clearCurrentAddress
} = addressSlice.actions;

export default addressSlice.reducer;