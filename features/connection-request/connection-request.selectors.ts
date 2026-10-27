import { RootState } from "@/store";

export const selectConnectionRequests = (state: RootState) =>
  state.connectionRequest.connectionRequests;

export const selectConnectionRequestIds = (state: RootState) =>
  state.connectionRequest.connectionRequestIds;

export const selectSentConnectionRequests = (state: RootState) =>
  state.connectionRequest.sentConnectionRequests;

export const selectSentConnectionRequestIds = (state: RootState) =>
  state.connectionRequest.sentConnectionRequestIds;
