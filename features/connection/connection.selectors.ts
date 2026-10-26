import { RootState } from "@/store";

export const selectConnections = (state: RootState) =>
  state.connection.connections;

export const selectConnectedUserIds = (state: RootState) =>
  state.connection.connectedUserIds;
