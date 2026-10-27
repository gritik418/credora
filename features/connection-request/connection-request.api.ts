import baseApi from "@/store/api/base-api";
import SendConnectionRequestDto from "./dto/send-connection-request.dto";
import {
  GetConnectionRequestsResponseDto,
  GetSentConnectionRequestsResponseDto,
  SendConnectionRequestResponseDto,
} from "./connection-request.interface";

const connectionRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConnectionRequests: build.query<GetConnectionRequestsResponseDto, void>({
      query: () => ({
        url: `/connection-requests`,
        method: "GET",
      }),
    }),
    getSentConnectionRequests: build.query<
      GetSentConnectionRequestsResponseDto,
      void
    >({
      query: () => ({
        url: `/connection-requests/sent`,
        method: "GET",
      }),
      providesTags: ["ConnectionRequestSend"],
    }),
    sendConnectionRequest: build.mutation<
      SendConnectionRequestResponseDto,
      SendConnectionRequestDto
    >({
      query: (data) => ({
        url: `/connection-requests/send`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ConnectionRequestSend"],
    }),
  }),
});

export const {
  useGetConnectionRequestsQuery,
  useSendConnectionRequestMutation,
  useGetSentConnectionRequestsQuery,
} = connectionRequestApi;

export default connectionRequestApi;
