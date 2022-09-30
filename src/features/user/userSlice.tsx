import React, { ReactElement } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";

import customFetch from "../../utils/axios";

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

interface IAxiosMsg {
  msg: string;
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: IUserFormInputs, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/testingRegister", user);
      console.log(resp);
    } catch (err) {
      // const error = err as AxiosError;
      // AxiosError needs to be imported

      // better approach
      if (axios.isAxiosError(err) && err.response?.data) {
        // approaches
        // console.log((err.response.data as IAxiosMsg).msg);
        // const { msg } = err.response.data as IAxiosMsg;

        toast.error((err.response.data as IAxiosMsg).msg);
      } else {
        console.log(err);
      }
    }
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
