import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
