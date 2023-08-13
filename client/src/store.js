import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './features/users/UsersSlice';
import doctorsReducer from './features/users/DoctorsSlice';
import patientsReducer from './features/users/PatientsSlice';
import appointmentsReducer from './features/users/AppointmentsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'doctors', 'patients', 'appointments'],
};

const rootReducer = combineReducers({
  user: userReducer,
  doctors: doctorsReducer,
  patients: patientsReducer,
  appointments: appointmentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
});

let persistor = persistStore(store);

export { store, persistor };
