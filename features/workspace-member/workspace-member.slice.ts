import { createSlice } from "@reduxjs/toolkit";
import { WorkspaceMember } from "./workspace-member.interface";
import workspaceMemberApi from "./workspace-member.api";

interface WorkspaceMemberState {
  members: WorkspaceMember[];
}

const initialState: WorkspaceMemberState = {
  members: [],
};

const workspaceMemberSlice = createSlice({
  name: "workspaceMember",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        workspaceMemberApi.endpoints.getWorkspaceMembers.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload.data?.members?.length) {
            state.members = action.payload.data.members;
          } else {
            state.members = [];
          }
        },
      )
      .addMatcher(
        workspaceMemberApi.endpoints.getWorkspaceMembers.matchRejected,
        (state) => {
          state.members = [];
        },
      );
  },
});

export default workspaceMemberSlice;
