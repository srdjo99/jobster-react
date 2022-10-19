import axios from "axios";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { AppDispatch, RootState } from "../../store";

import {
  IErrorMsg,
  IJobTypes,
  IJobKeys,
  IJobState,
  IThunkAPI,
  IResponseData,
  IEditJob,
  IUpdatedJob,
  IResponseMsg,
} from "../../types/IJob";

export const createJob = createAsyncThunk<IResponseData, IJobTypes, IThunkAPI>(
  "job/createJob",
  async (job, thunkAPI) => {
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
  },
);

export const deleteJob = createAsyncThunk<IResponseMsg, string, IThunkAPI>(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const { data } = await customFetch.delete<IResponseMsg>(
        `/jobs/${jobId}`,
        {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user?.token}`,
          },
        },
      );
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
  },
);

export const editJob = createAsyncThunk<IUpdatedJob, IEditJob, IThunkAPI>(
  "job/editJob",
  async ({ jobId, job }, thunkAPI) => {
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
      throw error;
    }
  },
);

const initialState: IJobState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remove", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state: IJobState, action) => {
      const { name, value } = action.payload;
      state[name as keyof IJobKeys] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("Job Created");
    });
    builder.addCase(createJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload as string);
    });
    builder.addCase(deleteJob.fulfilled, (state, { payload }) => {
      toast.success(payload?.msg);
    });
    builder.addCase(deleteJob.rejected, (state, { payload }) => {
      toast.error(payload as string);
    });
    builder.addCase(editJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("Job modified...");
    });
    builder.addCase(editJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload as string);
    });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
