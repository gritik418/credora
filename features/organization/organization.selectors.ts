import { RootState } from "@/store";

export const selectOrganizations = (state: RootState) =>
  state.organization.organizations;

export const selectSelectedOrganization = (state: RootState) =>
  state.organization.selectedOrganization;
