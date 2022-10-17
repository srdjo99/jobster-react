import axios from "axios";
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";

interface IJobKeys {
  status: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
}

interface IJobState extends IJobKeys {
  isLoading: boolean;
  isEditing: boolean;
  editJobId: string;
  jobTypeOptions: string[];
  statusOptions: string[];
}

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

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job: any, thunkAPI: any) => {
    console.log(thunkAPI, "tAPI");

    try {
      const resp = await customFetch.post("/jobs", job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      } else {
        console.log(error);
      }
    }
  },
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId: any, thunkAPI: any) => {
    thunkAPI.dispatch(showLoading());
    console.log(jobId, thunkAPI, "ss");
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return resp.data.msg;
    } catch (error: any) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }: any, thunkAPI: any) => {
    try {
      const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data.msg;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      toast.error(payload as any);
    });
    builder.addCase(deleteJob.fulfilled, (state, { payload }) => {
      toast.success(payload);
    });
    builder.addCase(deleteJob.rejected, (state, { payload }) => {
      toast.error(payload as any);
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
      toast.error(payload as any);
    });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
