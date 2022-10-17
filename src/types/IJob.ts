import { AppDispatch, RootState } from "../store";

interface IErrorMsg {
  msg?: string;
}
interface IResponseMsg {
  msg?: string;
}
interface IJobKeys {
  status?: string;
  position?: string;
  company?: string;
  jobLocation?: string;
  jobType?: string;
}

interface IJobState extends IJobKeys {
  isLoading?: boolean;
  isEditing?: boolean;
  editJobId?: string;
  jobTypeOptions?: string[];
  statusOptions?: string[];
}
interface IEditJob {
  jobId: string;
  job: IJobState;
}

interface IJobValues {
  company?: string;
  createdAt?: string;
  createdBy?: string;
  jobLocation?: string;
  jobType?: string;
  position?: string;
  status?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}

interface IResponseData {
  job: IJobValues;
}

interface IAllJobsResponse {
  jobs: IResponseData[];
}

interface IJobTypes {
  position?: string;
  company?: string;
  jobLocation?: string;
  jobType?: string;
  status?: string;
}

interface IThunkAPI {
  state: RootState;
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg: string | undefined) => void;
}

export type {
  IThunkAPI,
  IJobTypes,
  IErrorMsg,
  IJobKeys,
  IJobState,
  IJobValues,
  IEditJob,
  IResponseData,
  IResponseMsg,
  IAllJobsResponse,
};
