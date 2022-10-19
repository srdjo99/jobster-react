import { AppDispatch, RootState } from "../store";

interface IThunkAPI {
  state: RootState;
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
}

interface IUserThunkAPI {
  dispatch: AppDispatch;
  getState: () => RootState;
  rejectWithValue: (msg?: string) => void;
}

interface IUserState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: IUserData | null;
}

interface IUserFormInputs {
  name?: string;
  lastname?: string;
  location?: string;
  email?: string;
  password?: string;
}

interface IUserData {
  email: string;
  name: string;
  lastName: string;
  location: string;
  token?: string;
  isMember?: boolean;
  password?: string;
}

interface IUserThunkParams {
  url: string;
  user: IUserFormInputs;
  thunkAPI: IThunkAPI;
}

interface IUserResponse {
  user: {
    email: string;
    name: string;
    lastName: string;
    location: string;
    token: string;
  };
}

export type {
  IThunkAPI,
  IUserData,
  IUserFormInputs,
  IUserState,
  IUserThunkParams,
  IUserResponse,
  IUserThunkAPI,
};
