import { createSlice } from "@reduxjs/toolkit";
import organizationInviteApi from "./organization-invite.api";

interface OrganizationInviteState {
  organizationInvites: any[];
}

const initialState: OrganizationInviteState = {
  organizationInvites: [],
};

const organizationInviteSlice = createSlice({
  name: "organizationInvite",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addMatcher(
        organizationInviteApi.endpoints.getOrganizationInvites.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload?.data?.invites) {
            state.organizationInvites = action.payload.data.invites;
          } else {
            state.organizationInvites = [];
          }
        },
      )
      .addMatcher(
        organizationInviteApi.endpoints.getOrganizationInvites.matchRejected,
        (state) => {
          state.organizationInvites = [];
        },
      );
  },
});

export default organizationInviteSlice;
