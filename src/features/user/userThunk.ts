import axios from "axios";

import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { IErrorMsg } from "../../types/IJob";
import { AppDispatch, RootState } from "../../store";

interface IThunkAPI {
  state?: RootState;
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
}

interface IUserThunkParams {
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
}: IUserThunkParams) => {
  try {
    const { data } = await customFetch.post<IUserResponse>(url, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const { msg }: IErrorMsg = error.response.data;
      thunkAPI.rejectWithValue(msg);
    }
    console.log(error);

    throw error;
  }
};

export const loginUserThunk = async ({
  url,
  user,
  thunkAPI,
}: IUserThunkParams) => {
  try {
    const resp = await customFetch.post<any>(url, user);
    return resp.data;
  } catch (error) {
    // if (axios.isAxiosError(error) && error.response?.data) {
    //   const { msg }: IErrorMsg = error.response.data;
    //   thunkAPI.rejectWithValue(msg);
    // }
    console.log(error);

    throw error;
  }
};

interface IUserData {
  email: string;
  name: string;
  lastName: string;
  location: string;
  token: string;
}
export const updateUserThunk = async ({
  url,
  user,
  thunkAPI,
}: IUserThunkParams) => {
  try {
    const { data } = await customFetch.patch<IUserResponse>(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user?.token}`,
      },
    });
    console.log(data);

    return data.user as IUserData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logoutUser());
        thunkAPI.rejectWithValue("Unauthorized! Loggin Out...");
      }
      thunkAPI.rejectWithValue((error.response?.data as IAxiosMsg).msg);
    }

    console.log(error);

    throw error;
  }
};
