import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

import {
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
  createJobThunk,
);

export const deleteJob = createAsyncThunk<IResponseMsg, string, IThunkAPI>(
  "job/deleteJob",
  deleteJobThunk,
);

export const editJob = createAsyncThunk<IUpdatedJob, IEditJob, IThunkAPI>(
  "job/editJob",
  editJobThunk,
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
