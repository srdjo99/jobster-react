import axios from "axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { AppDispatch, RootState } from "../../store";
import { IJobTypes, IThunkAPI, IErrorMsg } from "../../types/IJob";

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
  }
};
