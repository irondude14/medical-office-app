import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    setAppointments: (state, action) => {
      state.value = action.payload;
    },
    removeAppointment: (state, action) => {
      state.value = state.value.filter(
        (appointment) => appointment.id !== action.payload
      );
    },

    addAppointment: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    updateAppointment: (state, action) => {
      const appointmentToUpdate = state.value.find(
        (p) => p.id === action.payload.id
      );
      if (appointmentToUpdate) {
        Object.assign(appointmentToUpdate, action.payload);
      }
      return state;
    },
  },
});

export const {
  setAppointments,
  removeAppointment,
  addAppointment,
  updateAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
