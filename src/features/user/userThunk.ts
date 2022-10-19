import axios from "axios";

import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { IErrorMsg } from "../../types/IJob";
import {
  IUserThunkAPI,
  IUserFormInputs,
  IUserResponse,
} from "../../types/IUser";

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
  { getState, dispatch, rejectWithValue }: IUserThunkAPI,
) => {
  try {
    const { data } = await customFetch.patch<IUserResponse>(
      "/auth/updateUser",
      user,
      {
        headers: {
          authorization: `Bearer ${getState().user.user?.token}`,
        },
      },
    );
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        rejectWithValue("Unauthorized! Loggin Out...");
      }
      rejectWithValue((error.response?.data as IErrorMsg).msg);
    }
    throw error;
  }
};
