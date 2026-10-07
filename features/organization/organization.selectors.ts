import { RootState } from "@/store";

export const selectOrganizations = (state: RootState) =>
  state.organization.organizations;
