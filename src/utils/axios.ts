import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IUserData } from "../types/IUser";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
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
