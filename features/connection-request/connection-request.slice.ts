import { createSlice } from "@reduxjs/toolkit";
import { ConnectionRequest } from "./connection-request.interface";
import connectionRequestApi from "./connection-request.api";

interface ConnectionRequestState {
  connectionRequests: ConnectionRequest[];
  connectionRequestIds: string[];
}

const initialState: ConnectionRequestState = {
  connectionRequests: [],
  connectionRequestIds: [],
};

const connectionRequestSlice = createSlice({
  name: "connectionRequest",
  reducerPath: "connectionRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        connectionRequestApi.endpoints.getConnectionRequests.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload.data) {
            state.connectionRequests = action.payload.data.connectionRequests;
            state.connectionRequestIds =
              action.payload.data.connectionRequests.map(
                (connectionRequest) => connectionRequest.id,
              );
          } else {
            state.connectionRequests = [];
            state.connectionRequestIds = [];
          }
        },
      )
      .addMatcher(
        connectionRequestApi.endpoints.sendConnectionRequest.matchRejected,
        (state) => {
          state.connectionRequests = [];
          state.connectionRequestIds = [];
        },
      );
  },
});

export default connectionRequestSlice;
