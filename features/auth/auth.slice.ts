import { createSlice } from "@reduxjs/toolkit";
import authApi from "./auth.api";
import { ICurrentUser } from "./auth.interface";

interface AuthState {
  isAuthenticated: boolean;
  user: ICurrentUser | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  reducerPath: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          if (action.payload.data) {
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
          } else {
            state.isAuthenticated = false;
            state.user = null;
          }
        } else {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice;
