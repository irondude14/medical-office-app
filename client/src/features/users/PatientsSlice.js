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
  },
});

export const { setPatients } = patientsSlice.actions;

export default patientsSlice.reducer;
