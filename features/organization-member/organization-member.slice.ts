import { createSlice } from "@reduxjs/toolkit";
import organizationMemberApi from "./organization-member.api";
import { OrganizationMember } from "./organization-member.interface";

interface OrganizationMemberState {
  organizationMembers: OrganizationMember[];
}

const initialState: OrganizationMemberState = {
  organizationMembers: [],
};

const organizationMemberSlice = createSlice({
  name: "organizationMember",
  reducerPath: "organizationMember",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        organizationMemberApi.endpoints.getOrganizationMembers.matchFulfilled,
        (state, action) => {
          if (action.payload?.success && action.payload?.data?.members) {
            state.organizationMembers = action.payload.data.members;
          } else {
            state.organizationMembers = [];
          }
        },
      )
      .addMatcher(
        organizationMemberApi.endpoints.getOrganizationMembers.matchRejected,
        (state) => {
          state.organizationMembers = [];
        },
      );
  },
});

export default organizationMemberSlice;
