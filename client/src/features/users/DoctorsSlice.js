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
    removeDoctor: (state, action) => {
      state.value = state.value.filter(
        (doctor) => doctor.id !== action.payload
      );
    },

    addDoctor: (state, action) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { setDoctors, removeDoctor, addDoctor } = doctorsSlice.actions;

export default doctorsSlice.reducer;
