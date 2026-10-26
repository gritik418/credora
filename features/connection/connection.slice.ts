import { createSlice } from "@reduxjs/toolkit";
import { Connection } from "./connection.interface";
import connectionApi from "./connection.api";

interface ConnectionState {
  connections: Connection[];
  connectedUserIds: string[];
}

const initialState: ConnectionState = {
  connections: [],
  connectedUserIds: [],
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        connectionApi.endpoints.getConnections.matchFulfilled,
        (state, { payload }) => {
          if (payload?.success && payload?.data?.connections) {
            state.connections = payload.data.connections;
            state.connectedUserIds = payload.data.connections.map(
              (connection) => connection.userId,
            );
          } else {
            state.connections = [];
            state.connectedUserIds = [];
          }
        },
      )
      .addMatcher(
        connectionApi.endpoints.getConnections.matchRejected,
        (state) => {
          state.connections = [];
          state.connectedUserIds = [];
        },
      );
  },
});

export default connectionSlice;
