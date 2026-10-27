import { createSlice } from "@reduxjs/toolkit";
import userApi from "../user/user.api";
import organizationApi from "./organization.api";
import { Organization } from "./organization.interface";
import { ProjectWithWorkspace } from "../project/project.interface";

interface OrganizationState {
  organizations: Organization[];
  selectedOrganization: Organization | null;
  organizationProjects: ProjectWithWorkspace[];
}

const initialState: OrganizationState = {
  organizations: [],
  selectedOrganization: null,
  organizationProjects: [],
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
        userApi.endpoints.getSelectedOrganization.matchFulfilled,
        (state, action) => {
          if (action.payload.data) {
            state.selectedOrganization = action.payload.data.organization;
          } else {
            state.selectedOrganization = null;
          }
        },
      )
      .addMatcher(
        userApi.endpoints.getSelectedOrganization.matchRejected,
        (state) => {
          state.selectedOrganization = null;
        },
      )
      .addMatcher(
        organizationApi.endpoints.getOrganizationProjects.matchFulfilled,
        (state, action) => {
          if (action.payload.data) {
            state.organizationProjects = action.payload.data.projects;
          } else {
            state.organizationProjects = [];
          }
        },
      )
      .addMatcher(
        organizationApi.endpoints.getOrganizationProjects.matchRejected,
        (state) => {
          state.organizationProjects = [];
        },
      );
  },
});

export default organizationSlice;
