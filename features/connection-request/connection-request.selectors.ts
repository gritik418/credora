import { RootState } from "@/store";

export const selectConnectionRequests = (state: RootState) =>
  state.connectionRequest.connectionRequests;

export const selectConnectionRequestIds = (state: RootState) =>
  state.connectionRequest.connectionRequestIds;
