import React, { ReactElement } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";

import customFetch from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

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
  user: getUserFromLocalStorage(),
};

interface IAxiosMsg {
  msg: string;
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: IUserFormInputs, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);

      return resp.data;
    } catch (error) {
      // const error = err as AxiosError;
      // AxiosError needs to be imported

      // better approach
      if (axios.isAxiosError(error) && error.response?.data) {
        // approaches
        // console.log((err.response.data as IAxiosMsg).msg);
        // const { msg } = err.response.data as IAxiosMsg;

        return thunkAPI.rejectWithValue((error.response.data as IAxiosMsg).msg);
      } else {
        console.log(error);
      }
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: IUserFormInputs, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return thunkAPI.rejectWithValue((error.response.data as IAxiosMsg).msg);
      } else {
        console.log(error);
      }
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello there ${user.name}`);
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload as string);
    });

    // login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome back ${user.name}`);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload as string);
    });
  },
});

export default userSlice.reducer;
