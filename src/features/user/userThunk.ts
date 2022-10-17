import axios from "axios";

import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { IErrorMsg, IThunkAPI } from "../../types/IJob";

interface IUserThunkArgs {
  url: string;
  user: any;
  thunkAPI: any;
}

interface IAxiosMsg {
  msg: string;
}

export const registerUserThunk = async ({
  url,
  user,
  thunkAPI,
}: IUserThunkArgs) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return thunkAPI.rejectWithValue((error.response.data as IAxiosMsg).msg);
    } else {
      console.log(error);
    }
  }
};

export const loginUserThunk = async ({
  url,
  user,
  thunkAPI,
}: IUserThunkArgs) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return thunkAPI.rejectWithValue((error.response.data as IAxiosMsg).msg);
    } else {
      console.log(error);
    }
  }
};

export const updateUserThunk = async ({
  url,
  user,
  thunkAPI,
}: IUserThunkArgs) => {
  try {
    const resp = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Loggin Out...");
      }
      return thunkAPI.rejectWithValue((error.response?.data as IAxiosMsg).msg);
    } else {
      console.log(error);
    }
  }
};
