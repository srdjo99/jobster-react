import axios from "axios";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";

import {
  IErrorMsg,
  IJobKeys,
  IJobState,
  ICreateJob,
  IThunkAPI,
  IResponseData,
  IEditJob,
} from "../../types/IJobSlice";

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

export const createJob = createAsyncThunk<
  IResponseData | undefined,
  ICreateJob,
  IThunkAPI
>("job/createJob", async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, {
      headers: {
        authorization: `Berer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data as IResponseData;
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
});

export const deleteJob = createAsyncThunk<string, string, IThunkAPI>(
  "job/deleteJob",
  async (jobId, thunkAPI: any) => {
    thunkAPI.dispatch(showLoading());
    console.log(jobId, thunkAPI, "ss");
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return resp.data.msg as string;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      if (axios.isAxiosError(error) && error.response?.data) {
        const { msg }: IErrorMsg = error.response.data;
        return thunkAPI.rejectWithValue(msg);
      }
      console.log(error);
    }
  },
);

export const editJob = createAsyncThunk<string, IEditJob, IThunkAPI>(
  "job/editJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data.msg;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const { msg }: IErrorMsg = error.response?.data;
        return thunkAPI.rejectWithValue(msg);
      }
      console.log(error);
      throw error;
    }
  },
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, action) => {
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
      // toast.error(action.payload as string);
    });
    builder.addCase(deleteJob.fulfilled, (state, { payload }) => {
      toast.success(payload);
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
