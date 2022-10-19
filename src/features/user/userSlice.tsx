import { toast } from "react-toastify";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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
import {
  IThunkAPI,
  IUserData,
  IUserFormInputs,
  IUserState,
} from "../../types/IUser";
import { AppDispatch, RootState } from "../../store";

const initialState: IUserState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk<
  IUserData,
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
  IUserData,
  IUserFormInputs,
  IThunkAPI
>("user/loginUser", async (user, thunkAPI) => {
  return await loginUserThunk({ url: "/auth/login", user, thunkAPI });
});

export const updateUser = createAsyncThunk<
  IUserData,
  IUserFormInputs,
  IThunkAPI
>("user/updateUser", async (user, thunkAPI) => {
  const data = await updateUserThunk({
    url: "/auth/updateUser",
    user,
    thunkAPI,
  });
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
    builder.addCase(registerUser.fulfilled, (state, { payload: user }) => {
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
    builder.addCase(loginUser.fulfilled, (state, { payload: user }) => {
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
    builder.addCase(updateUser.fulfilled, (state, { payload: user }) => {
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
