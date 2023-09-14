import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { authReducer } from "./auth/authSlice";

const persistConfig = {
  key: "auch",
  storage: AsyncStorage,
  whitelist: ["accessToken"],
};

const rootReducer = combineReducers({
  [authReducer.name]: persistReducer(persistConfig, authReducer),
  // [postSlice.name]: postSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


