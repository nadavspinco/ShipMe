import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
  } from "@reduxjs/toolkit";
  import SignupSlice from "./SignupSlice";
  const store = configureStore({
    reducer: SignupSlice,
    middleware: [...getDefaultMiddleware()],
    actions: SignupSlice.actions
  });
  
  export default store;
  