import { createSlice } from "@reduxjs/toolkit";
import { Organization } from "./organization.interface";
import organizationApi from "./organization.api";

interface OrganizationState {
  organizations: Organization[];
}

const initialState: OrganizationState = {
  organizations: [],
};

const organizationSlice = createSlice({
  name: "organization",
  reducerPath: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        organizationApi.endpoints.getOrganizations.matchFulfilled,
        (state, action) => {
          if (action.payload.data) {
            state.organizations = action.payload.data.organizations;
          } else {
            state.organizations = [];
          }
        },
      )
      .addMatcher(
        organizationApi.endpoints.getOrganizations.matchRejected,
        (state) => {
          state.organizations = [];
        },
      );
  },
});

export default organizationSlice;
