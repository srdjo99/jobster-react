import React, { ReactElement } from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

interface IUserState {
  isLoading: boolean;
  user: any;
}

interface IUserFormInputs {
  name?: string;
  email: string;
  password: string;
}

const initialState: IUserState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: IUserFormInputs, thunkAPI) => {
    console.log("Register User:", user);
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: IUserFormInputs, thunkAPI) => {
    console.log("Login User:", user);
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export default userSlice.reducer;
