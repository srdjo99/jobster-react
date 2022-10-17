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

// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async (user: IUserFormInputs, thunkAPI) => {
//     try {
//       const resp = await customFetch.post("/auth/register", user);
//       return resp.data;
//     } catch (error) {
//       // const error = err as AxiosError;
//       // AxiosError needs to be imported

//       // better approach
//       if (axios.isAxiosError(error) && error.response?.data) {
//         // approaches
//         // console.log((err.response.data as IAxiosMsg).msg);
//         // const { msg } = err.response.data as IAxiosMsg;

//         return thunkAPI.rejectWithValue((error.response.data as IAxiosMsg).msg);
//       } else {
//         console.log(error);
//       }
//     }
//   },
// );

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: IUserFormInputs, thunkAPI) => {
    return await registerUserThunk({ url: "/auth/register", user, thunkAPI });
  },
);

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (user: IUserFormInputs, thunkAPI) => {
//     try {
//       const resp = await customFetch.post("/auth/login", user);
//       return resp.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response?.data) {
//         return thunkAPI.rejectWithValue((error.response.data as IAxiosMsg).msg);
//       } else {
//         console.log(error);
//       }
//     }
//   },
// );

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: IUserFormInputs, thunkAPI) => {
    return await loginUserThunk({ url: "/auth/login", user, thunkAPI });
  },
);

// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async (user: any, thunkAPI) => {
//     try {
//       const resp = await customFetch.patch("/auth/updateUser", user, {
//         headers: {
//           // getState-entire state, user-slice name, user-property name
//           authorization: `Bearer ${
//             (thunkAPI.getState() as any).user.user.token
//           }`,
//         },
//       });
//       return resp.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 401) {
//           thunkAPI.dispatch(logoutUser());
//           return thunkAPI.rejectWithValue("Unauthorized! Loggin Out...");
//         }
//         return thunkAPI.rejectWithValue(
//           (error.response?.data as IAxiosMsg).msg,
//         );
//       } else {
//         console.log(error);
//       }
//     }
//   },
// );

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: IUserFormInputs, thunkAPI) => {
    return await updateUserThunk({ url: "/auth/updateUser", user, thunkAPI });
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, action: PayloadAction<string | undefined>) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (action.payload) {
        toast.success(action.payload);
      }
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
