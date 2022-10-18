import axios from "axios";

import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { IErrorMsg } from "../../types/IJob";
import { AppDispatch, RootState } from "../../store";

interface IUserThunkArgs {
  url: string;
  user: IUserFormInputs;
  thunkAPI: IThunkAPI;
}

interface IAxiosMsg {
  msg: string;
}

interface IUserFormInputs {
  name?: string;
  email?: string;
  password?: string;
}

interface IThunkAPI {
  state?: RootState;
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
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

export const registerUserThunk = async ({
  url,
  user,
  thunkAPI,
}: IUserThunkArgs) => {
  try {
    const { data } = await customFetch.post<IUserResponse>(url, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const { msg }: IErrorMsg = error.response.data;
      thunkAPI.rejectWithValue(msg);
    }
    throw error;
  }
};

export const loginUserThunk = async ({
  url,
  user,
  thunkAPI,
}: IUserThunkArgs) => {
  try {
    const resp = await customFetch.post<IUserResponse>(url, user);
    console.log(resp);
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      thunkAPI.rejectWithValue((error.response.data as IAxiosMsg).msg);
    }
    throw error;
  }
};

export const updateUserThunk = async ({ url, user, thunkAPI }: any) => {
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
