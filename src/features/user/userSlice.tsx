import React, { ReactElement } from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import customFetch from "../../utils/axios";
// import { IThunkAPI } from "../../types/IJob";
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
import { AppDispatch, RootState } from "../../store";
import { IUser } from "../../types/IUser";

export interface IThunkAPI {
  state: RootState;
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
}

interface IUserResponse {
  email: string;
  name: string;
  lastName: string;
  location: string;
  token: string;
}

interface IUserState {
  isLoading?: boolean;
  isSidebarOpen?: boolean;
  user: IUserData | null;
}

interface IUserFormInputs {
  name?: string;
  lastname?: string;
  location?: string;
  email?: string;
  password?: string;
}

interface IUserData {
  email: string;
  name: string;
  lastName: string;
  location: string;
  token: string;
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

const initialState: IUserState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk<any, IUserFormInputs, IThunkAPI>(
  "user/registerUser",
  async (user, thunkAPI: any) => {
    return await registerUserThunk({
      url: "/auth/register",
      user,
      thunkAPI,
    });
  },
);

export const loginUser = createAsyncThunk<any, IUserFormInputs, IThunkAPI>(
  "user/loginUser",
  async (user, thunkAPI: any) => {
    return await loginUserThunk({ url: "/auth/login", user, thunkAPI });
  },
);

export const updateUser = createAsyncThunk<
  IUserData,
  IUserFormInputs,
  IThunkAPI
>("user/updateUser", async (user, thunkAPI) => {
  console.log(thunkAPI, "thunkara");
  const data = await updateUserThunk({
    url: "/auth/updateUser",
    user,
    thunkAPI,
  });
  console.log(data, "data");

  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
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
      state.isLoading = false;
      console.log(payload, state, "mocniii");
      console.log(state.user, "stejt user");
      const user = payload;

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
