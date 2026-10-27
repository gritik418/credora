import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReceivedOrganizationInvite } from "./user.interface";
import userApi from "./user.api";

interface UserState {
  receivedOrganizationInvites: ReceivedOrganizationInvite[];
}

const initialState: UserState = {
  receivedOrganizationInvites: [],
};

const userSlice = createSlice({
  name: "user",
  reducerPath: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.getReceivedOrganizationInvites.matchFulfilled,
        (state, { payload }) => {
          if (payload.success && payload.data?.invites) {
            state.receivedOrganizationInvites = payload.data.invites;
          } else {
            state.receivedOrganizationInvites = [];
          }
        },
      )
      .addMatcher(
        userApi.endpoints.getReceivedOrganizationInvites.matchRejected,
        (state) => {
          state.receivedOrganizationInvites = [];
        },
      );
  },
});

export default userSlice;
