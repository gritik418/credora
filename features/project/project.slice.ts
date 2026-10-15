import { createSlice } from "@reduxjs/toolkit";
import { Project } from "./project.interface";

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "project",
  reducerPath: "project",
  initialState,
  reducers: {},
});

export default projectSlice;
