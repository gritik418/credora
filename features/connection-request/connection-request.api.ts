import baseApi from "@/store/api/base-api";
import SendConnectionRequestDto from "./dto/send-connection-request.dto";
import { SendConnectionRequestResponseDto } from "./connection-request.interface";

const connectionRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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

export const { useSendConnectionRequestMutation } = connectionRequestApi;
