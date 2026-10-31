import baseApi from "@/store/api/base-api";
import {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  GetTasksRequestDto,
  GetTasksResponseDto,
} from "./task.interface";

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<CreateTaskResponseDto, CreateTaskRequestDto>({
      query: ({ projectId, data }) => ({
        url: `projects/${projectId}/tasks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    getTasks: build.query<GetTasksResponseDto, GetTasksRequestDto>({
      query: ({ pagination, projectId, query }) => {
        const params = new URLSearchParams();
        if (pagination.limit) params.set("limit", pagination.limit.toString());
        if (pagination.page) params.set("page", pagination.page.toString());
        if (query.search) params.set("search", query.search);
        if (query.status) params.set("status", query.status);
        if (query.priority) params.set("priority", query.priority);
        if (query.sortBy) params.set("sortBy", query.sortBy);
        if (query.sortOrder) params.set("sortOrder", query.sortOrder);

        return {
          url: `projects/${projectId}/tasks`,
          params,
        };
      },
      providesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = taskApi;

export default taskApi;
