import { createSlice } from "@reduxjs/toolkit";
import {
  ConnectionRequest,
  SentConnectionRequest,
} from "./connection-request.interface";
import connectionRequestApi from "./connection-request.api";

interface ConnectionRequestState {
  connectionRequests: ConnectionRequest[];
  connectionRequestIds: string[];
  sentConnectionRequests: SentConnectionRequest[];
  sentConnectionRequestIds: string[];
}

const initialState: ConnectionRequestState = {
  connectionRequests: [],
  connectionRequestIds: [],
  sentConnectionRequests: [],
  sentConnectionRequestIds: [],
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
        connectionRequestApi.endpoints.getConnectionRequests.matchRejected,
        (state) => {
          state.connectionRequests = [];
          state.connectionRequestIds = [];
        },
      )
      .addMatcher(
        connectionRequestApi.endpoints.getSentConnectionRequests.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload.data) {
            state.sentConnectionRequests =
              action.payload.data.connectionRequests;
            state.sentConnectionRequestIds =
              action.payload.data.connectionRequests.map(
                (connectionRequest) => connectionRequest.receiverId,
              );
          } else {
            state.sentConnectionRequests = [];
            state.sentConnectionRequestIds = [];
          }
        },
      )
      .addMatcher(
        connectionRequestApi.endpoints.getSentConnectionRequests.matchRejected,
        (state) => {
          state.sentConnectionRequests = [];
          state.sentConnectionRequestIds = [];
        },
      );
  },
});

export default connectionRequestSlice;
