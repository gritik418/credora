import { createSlice } from "@reduxjs/toolkit";
import { ProjectMember } from "./project-member.interface";
import projectMemberApi from "./project-member.api";

interface ProjectMemberState {
  members: ProjectMember[];
  memberIds: string[];
}

const initialState: ProjectMemberState = {
  members: [],
  memberIds: [],
};

const projectMemberSlice = createSlice({
  name: "projectMember",
  reducerPath: "projectMember",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        projectMemberApi.endpoints.getProjectMembers.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload.data) {
            state.members = action.payload.data.members;
            state.memberIds =
              action.payload.data.members.map((member) => member.userId) || [];
          } else {
            state.members = [];
            state.memberIds = [];
          }
        },
      )
      .addMatcher(
        projectMemberApi.endpoints.getProjectMembers.matchRejected,
        (state) => {
          state.members = [];
          state.memberIds = [];
        },
      );
  },
});

export default projectMemberSlice;
