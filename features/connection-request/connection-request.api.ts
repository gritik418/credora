import baseApi from "@/store/api/base-api";
import SendConnectionRequestDto from "./dto/send-connection-request.dto";
import {
  GetConnectionRequestsResponseDto,
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
    sendConnectionRequest: build.mutation<
      SendConnectionRequestResponseDto,
      SendConnectionRequestDto
    >({
      query: (data) => ({
        url: `/connection-requests/send`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetConnectionRequestsQuery,
  useSendConnectionRequestMutation,
} = connectionRequestApi;

export default connectionRequestApi;
