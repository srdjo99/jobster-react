import axios from "axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { AppDispatch, RootState } from "../../store";

interface IJobTypes {
  position?: string;
  company?: string;
  jobLocation?: string;
  jobType?: string;
  status?: string;
}

interface IThunkAPI {
  state: RootState;
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg: string | undefined) => void;
}

interface IErrorMsg {
  msg?: string;
}

export const createJobThunk = async (job: IJobTypes, thunkAPI: IThunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
      if (error.response?.data) {
        const { msg }: IErrorMsg = error.response?.data;
        return thunkAPI.rejectWithValue(msg);
      }
      console.log(error);
    }
    // if (error instanceof Error) {
    //   const { msg } = error.response?.data;
    // }
    // if (axios.isAxiosError(error) && error.response?.status === 401) {
    //   thunkAPI.dispatch(logoutUser());
    //   return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    // } else {
    //   const { msg } = error.response.data;
    //   return thunkAPI.rejectWithValue("");
    // }
  }
};
