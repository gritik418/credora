import baseApi from "@/store/api/base-api";

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({}),
});

export default taskApi;
