import axios from "axios";
import customFetch from "../../utils/axios";
import { clearValues } from "./jobSlice";
import { logoutUser } from "../user/userSlice";
import { AppDispatch, RootState } from "../../store";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import {
  IResponseData,
  IJobTypes,
  IResponseMsg,
  IUpdatedJob,
  IEditJob,
  IErrorMsg,
} from "../../types/IJob";

interface IThunkAPI {
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
}

export const createJobThunk = async (job: IJobTypes, thunkAPI: IThunkAPI) => {
  try {
    const { data } = await customFetch.post<IResponseData>("/jobs", job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user?.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logoutUser());
        thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
      if (error.response?.data) {
        const { msg }: IErrorMsg = error.response?.data;
        thunkAPI.rejectWithValue(msg);
      }
    }
    throw error;
  }
};
export const deleteJobThunk = async (jobId: string, thunkAPI: IThunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const { data } = await customFetch.delete<IResponseMsg>(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user?.token}`,
      },
    });
    thunkAPI.dispatch(getAllJobs());
    return data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    if (axios.isAxiosError(error) && error.response?.data) {
      const { msg }: IErrorMsg = error.response.data;
      thunkAPI.rejectWithValue(msg);
    }
    throw error;
  }
};
export const editJobThunk = async (
  { jobId, job }: IEditJob,
  thunkAPI: IThunkAPI,
) => {
  try {
    const { data } = await customFetch.patch<IUpdatedJob>(
      `/jobs/${jobId}`,
      job,
      {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user?.token}`,
        },
      },
    );
    thunkAPI.dispatch(clearValues());
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const { msg }: IErrorMsg = error.response?.data;
      thunkAPI.rejectWithValue(msg);
    }
    console.log(error);

    throw error;
  }
};
