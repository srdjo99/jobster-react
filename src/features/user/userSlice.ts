import { toast } from "react-toastify";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  clearStoreThunk,
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
import { clear } from "console";

const initialState: IUserState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk<
  IUserData,
  IUserFormInputs,
  IThunkAPI
>("user/registerUser", registerUserThunk);

export const loginUser = createAsyncThunk<
  IUserData,
  IUserFormInputs,
  IThunkAPI
>("user/loginUser", loginUserThunk);

export const updateUser = createAsyncThunk<
  IUserData,
  IUserFormInputs,
  IThunkAPI
>("user/updateUser", updateUserThunk);

export const clearStore = createAsyncThunk<
  unknown,
  string | undefined,
  IThunkAPI
>("user/clearStore", clearStoreThunk);

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

    // clear store
    builder.addCase(clearStore.rejected, () => {
      toast.error("There was an error while clearing up store");
    });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
