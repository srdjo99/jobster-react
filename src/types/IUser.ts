import { AppDispatch, RootState } from "../store";

interface IThunkAPI {
  state: RootState;
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
  token: string;
}

export type { IThunkAPI, IUserData, IUserFormInputs, IUserState };
