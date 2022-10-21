import axios from "axios";

import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { IErrorMsg } from "../../types/IJob";
import {
  IUserThunkAPI,
  IUserFormInputs,
  IUserResponse,
} from "../../types/IUser";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

export const registerUserThunk = async (
  user: IUserFormInputs,
  { rejectWithValue }: IUserThunkAPI,
) => {
  try {
    const { data } = await customFetch.post<IUserResponse>(
      "/auth/register",
      user,
    );
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const { msg }: IErrorMsg = error.response.data;
      rejectWithValue(msg);
    }
    throw error;
  }
};

export const loginUserThunk = async (
  user: IUserFormInputs,
  { rejectWithValue }: IUserThunkAPI,
) => {
  try {
    const { data } = await customFetch.post<IUserResponse>("/auth/login", user);
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const { msg }: IErrorMsg = error.response.data;
      rejectWithValue(msg);
    }
    throw error;
  }
};

export const updateUserThunk = async (
  user: IUserFormInputs,
  thunkAPI: IUserThunkAPI,
) => {
  try {
    const { data } = await customFetch.patch<IUserResponse>(
      "/auth/updateUser",
      user,
    );
    return data.user;
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   if (error.response?.status === 401) {
    //     dispatch(logoutUser());
    //     rejectWithValue("Unauthorized! Loggin Out...");
    //   }
    //   rejectWithValue((error.response?.data as IErrorMsg).msg);
    // }
    checkForUnauthorizedResponse(error, thunkAPI);
    throw error;
  }
};

export const clearStoreThunk = (
  message: string | undefined,
  thunkAPI: IUserThunkAPI,
) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
  } catch (error) {
    console.log(error);
    throw error;
  }
};
