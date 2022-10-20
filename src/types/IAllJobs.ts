import { AppDispatch, RootState } from "../store";
import { IDefaultStatsState, IMonthlyApplications } from "./IStats";

interface IJobValues {
  company: string;
  createdAt: string;
  createdBy: string;
  jobLocation: string;
  jobType: string;
  position: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface IAllJobsResponse {
  jobs: IJobValues[];
  numOfPages: number;
  totalJobs: number;
}

interface IAllJobsFilters {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions?: string[];
}

interface IAllJobsState extends IAllJobsFilters {
  isLoading: boolean;
  jobs: IJobValues[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: IDefaultStatsState;
  monthlyApplications: IMonthlyApplications[];
}

interface IThunkAPI {
  state: RootState;
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
}

export type { IAllJobsState, IAllJobsFilters, IAllJobsResponse, IThunkAPI };
