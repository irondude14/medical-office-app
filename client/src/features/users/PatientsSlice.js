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
    updatePatient: (state, action) => {
      const patientToUpdate = state.value.find(
        (p) => p.id === action.payload.id
      );
      if (patientToUpdate) {
        Object.assign(patientToUpdate, action.payload);
      }
      return state;
    },
  },
});

export const {
  setPatients,
  addPatient,
  removePatient,
  updatePatient,
} = patientsSlice.actions;

export default patientsSlice.reducer;
