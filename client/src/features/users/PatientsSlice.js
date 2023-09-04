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
        if (action.payload.newUser) {
          if (!patientToUpdate.users) {
            patientToUpdate.users = [];
          }
          const isUserAlreadyPresent = patientToUpdate.users.find(
            (user) => user.id === action.payload.newUser.id
          );
          if (!isUserAlreadyPresent) {
            patientToUpdate.users.push(action.payload.newUser);
          }
        } else {
          Object.assign(patientToUpdate, action.payload);
        }

        if (action.payload.newAppointment) {
          if (!patientToUpdate.appointments) {
            patientToUpdate.appointments = [];
          }
          patientToUpdate.appointments.push(action.payload.newAppointment);
        }
      }
      return state;
    },
    removeAppointmentFromPatient: (state, action) => {
      const patientToUpdate = state.value.find(
        (p) => p.id === action.payload.patient_id
      );

      if (patientToUpdate) {
        const userOfAppointment = patientToUpdate.users.find(
          (u) => u.id === action.payload.user_id
        );

        if (userOfAppointment) {
          const otherAppointments = patientToUpdate.appointments.filter(
            (a) => a.user_id === action.payload.user_id
          );
          if (otherAppointments.length === 1) {
            patientToUpdate.users = patientToUpdate.users.filter(
              (u) => u.id !== action.payload.user_id
            );
          }
        }
        patientToUpdate.appointments = patientToUpdate.appointments.filter(
          (a) => a.id !== action.payload.id
        );
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
  removeAppointmentFromPatient,
} = patientsSlice.actions;

export default patientsSlice.reducer;
