import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import customFetch from "../../utils/axios";
import {
  IAllJobsFilters,
  IAllJobsState,
  IAllJobsResponse,
  IThunkAPI,
} from "../../types/IAllJobs";
import { IStats } from "../../types/IStats";

const initialFiltersState: IAllJobsFilters = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: IAllJobsState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk<
  IAllJobsResponse,
  undefined,
  IThunkAPI
>("allJobs/getJobs", async (_, thunkAPI) => {
  // eslint-disable-next-line
  let url = `/jobs`;
  try {
    const { data } = await customFetch.get<IAllJobsResponse>(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
});

export const showStats = createAsyncThunk<IStats, undefined>(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const { data } = await customFetch.get<IStats>("/jobs/stats");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      // state.page = 1 later
      state[name as keyof IAllJobsFilters] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
  },
  // all jobs
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload.jobs;
    });
    builder.addCase(getAllJobs.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload as string);
    });
    // stats
    builder.addCase(showStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(showStats.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    });
    builder.addCase(showStats.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload as string);
    });
  },
});

export const { showLoading, hideLoading, handleChange, clearFilters } =
  allJobsSlice.actions;

export default allJobsSlice.reducer;
