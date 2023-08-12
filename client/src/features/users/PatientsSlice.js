import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    setPatients: (state, action) => {
      state.value = action.payload;
    },
    removePatient: (state, action) => {
      state.value = state.value.filter(
        (doctor) => doctor.id !== action.payload
      );
    },

    addPatient: (state, action) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { setPatients, addPatient, removePatient } = patientsSlice.actions;

export default patientsSlice.reducer;
