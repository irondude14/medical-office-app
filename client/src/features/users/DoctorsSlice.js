import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    setDoctors: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDoctors } = doctorsSlice.actions;

export default doctorsSlice.reducer;
