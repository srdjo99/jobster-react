import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { clearStore } from "../features/user/userSlice";
import { IUserData } from "../types/IUser";
import { getUserFromLocalStorage } from "./localStorage";

const baseURL = process.env.REACT_APP_BASE_ENDPOINT_URL;

const customFetch = axios.create({
  baseURL,
});

customFetch.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const user: IUserData = getUserFromLocalStorage();
    if (user && config?.headers) {
      config.headers.authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => error,
);

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    toast.error("Unauthorized! Logging Out...");
  }
  thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
