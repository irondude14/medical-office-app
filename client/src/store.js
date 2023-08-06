import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/UsersSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

let store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

let persistor = persistStore(store);

export { store, persistor };
