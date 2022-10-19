import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
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

export default customFetch;
