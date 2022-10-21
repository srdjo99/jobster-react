import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { IStats } from "../../types/IStats";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";
import {
  IAllJobsFilters,
  IAllJobsState,
  IAllJobsResponse,
  IThunkAPI,
} from "../../types/IAllJobs";

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
>("allJobs/getJobs", getAllJobsThunk);

export const showStats = createAsyncThunk<IStats, undefined, IThunkAPI>(
  "allJobs/showStats",
  showStatsThunk,
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
      state.page = 1;
      state[name as keyof IAllJobsFilters] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: () => initialState,
  },
  // all jobs
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllJobs.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
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

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
