import { createSlice } from "@reduxjs/toolkit";
import { Organization } from "./organization.interface";
import organizationApi from "./organization.api";

interface OrganizationState {
  organizations: Organization[];
  selectedOrganization: Organization | null;
}

const initialState: OrganizationState = {
  organizations: [],
  selectedOrganization: null,
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
      )
      .addMatcher(
        organizationApi.endpoints.getOrganizationBySlug.matchFulfilled,
        (state, action) => {
          if (action.payload.data) {
            state.selectedOrganization = action.payload.data.organization;
          } else {
            state.selectedOrganization = null;
          }
        },
      )
      .addMatcher(
        organizationApi.endpoints.getOrganizationBySlug.matchRejected,
        (state) => {
          state.selectedOrganization = null;
        },
      );
  },
});

export default organizationSlice;
