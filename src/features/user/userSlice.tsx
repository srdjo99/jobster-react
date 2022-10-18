import React, { ReactElement } from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";

import customFetch from "../../utils/axios";
import { IThunkAPI } from "../../types/IJob";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";

interface IUserState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: any;
}

interface IUserFormInputs {
  name?: string;
  email?: string;
  password?: string;
}

const initialState: IUserState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

interface IAxiosMsg {
  msg: string;
}

interface IUserResponse {
  user: {
    email: string;
    name: string;
    lastName: string;
    location: string;
    token: string;
  };
}

export const registerUser = createAsyncThunk<
  IUserResponse,
  IUserFormInputs,
  IThunkAPI
>("user/registerUser", async (user, thunkAPI) => {
  return await registerUserThunk({
    url: "/auth/register",
    user,
    thunkAPI,
  });
});

export const loginUser = createAsyncThunk<
  IUserResponse,
  IUserFormInputs,
  IThunkAPI
>("user/loginUser", async (user, thunkAPI) => {
  return await loginUserThunk({ url: "/auth/login", user, thunkAPI });
});

export const updateUser = createAsyncThunk<
  IUserResponse,
  IUserFormInputs,
  IThunkAPI
>("user/updateUser", async (user, thunkAPI) => {
  return await updateUserThunk({ url: "/auth/updateUser", user, thunkAPI });
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    // eslint-disable-next-line
    logoutUser: (state, { payload }: PayloadAction<string | undefined>) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      toast.success(payload);
    },
  },
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

    // update user
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success("User updated!");
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload as string);
    });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
