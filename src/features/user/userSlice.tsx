import React, { ReactElement } from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

interface IUserState {
  isLoading: boolean;
  user: any;
}

const initialState: IUserState = {
  isLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export default userSlice.reducer;
