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
    updateDoctor: (state, action) => {
      const doctorToUpdate = state.value.find(
        (p) => p.id === action.payload.id
      );
      if (doctorToUpdate) {
        Object.assign(doctorToUpdate, action.payload);
      }
      return state;
    },
  },
});

export const {
  setDoctors,
  removeDoctor,
  addDoctor,
  updateDoctor,
} = doctorsSlice.actions;

export default doctorsSlice.reducer;
