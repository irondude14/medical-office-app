import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      email: '',
      name: '',
      type: '',
      specialization: '',
      phone: '',
      appointments: {},
      patients: {},
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
