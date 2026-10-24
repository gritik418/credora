import baseApi from "@/store/api/base-api";
import { CreateTaskRequestDto, CreateTaskResponseDto } from "./task.interface";

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<CreateTaskResponseDto, CreateTaskRequestDto>({
      query: ({ projectId, data }) => ({
        url: `projects/${projectId}/tasks`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateTaskMutation } = taskApi;

export default taskApi;
