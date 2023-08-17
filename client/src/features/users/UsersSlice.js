import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = initialStateValue;
    },
    addTestResult: (state, action) => {
      state.value.test_results.push(action.payload);
    },
    updateTestResult: (state, action) => {
      const testToUpdate = state.value.test_results.find(
        (t) => t.id === action.payload.id
      );
      if (testToUpdate) {
        Object.assign(testToUpdate, action.payload);
      }
      return state;
    },
  },
});

export const {
  login,
  logout,
  addTestResult,
  updateTestResult,
} = userSlice.actions;

export default userSlice.reducer;
