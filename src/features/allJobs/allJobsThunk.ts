import { IStats } from "../../types/IStats";
import { IAllJobsResponse } from "../../types/IAllJobs";
import { AppDispatch, RootState } from "../../store";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

interface IThunkAPI {
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
}

export const getAllJobsThunk = async (_: any, thunkAPI: IThunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const { data } = await customFetch.get<IAllJobsResponse>(url);
    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
    throw error;
  }
};

export const showStatsThunk = async (_: undefined, thunkAPI: IThunkAPI) => {
  try {
    const { data } = await customFetch.get<IStats>("/jobs/stats");
    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
    throw error;
  }
};
