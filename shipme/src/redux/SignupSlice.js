import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {signUpApi,signInApi} from "../api/auth";
import Cookies from "js-cookie";



const signUpThunk = createAsyncThunk(
  "users/signUpThunk",
  async (user, thunkAPI) => {
    return signUpApi(user);
  }
);

const signInThunk = createAsyncThunk(
  "users/signInThunk",
  async (user, thunkAPI) => {
    return signInApi(user);
  }
)

const SignupSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    jwt: undefined,
    loading: "idle",
    message: undefined,
    saveMe: false,
   
  },
  reducers: {
   
  },
  extraReducers: {
    [signUpThunk.fulfilled]: (state, action) => {
      setState(state,action);
    },
    [signInThunk.fulfilled]: (state, action) => {
      setState(state,action);
    },
  }
    


});

const setState =(state,action) =>{
  console.log(action.payload);
  const { jwt, user, message,saveMe } = action.payload;
  state.message = message;
  state.jwt = jwt;
  state.user = user;
  console.log(jwt);
  if(jwt){
  Cookies.set("jwt", jwt);
  }
}



export const { showSignUp } = SignupSlice.actions;

export const signUpDispatch = signUpThunk;

export const signInDispatch = signInThunk;

export default SignupSlice.reducer;
