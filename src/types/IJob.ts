import { ReactElement } from "react";
import { AppDispatch, RootState } from "../store";

interface IErrorMsg {
  msg?: string;
}
interface IResponseMsg {
  msg: string;
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
  jobId?: string;
  job?: IJobState;
}
interface IResponseData {
  job?: IJobState;
}
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

interface IJobTypes {
  position?: string;
  company?: string;
  jobLocation?: string;
  jobType?: string;
  status?: string;
}

interface IUpdatedJob {
  updatedJob: IJobValues;
}

interface IThunkAPI {
  state: RootState;
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
}

interface IJobProps {
  company: string;
  createdAt: string;
  jobLocation: string;
  jobType: string;
  position: string;
  status: string;
  _id: string;
}
interface IJobInfoProps {
  icon: ReactElement;
  text: string;
}

export type {
  IThunkAPI,
  IJobTypes,
  IErrorMsg,
  IJobKeys,
  IJobState,
  IJobValues,
  IJobProps,
  IJobInfoProps,
  IEditJob,
  IUpdatedJob,
  IResponseData,
  IResponseMsg,
};
