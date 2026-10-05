import baseApi from "@/store/api/base-api";
import { UpdateBasicOnboardingInfoResponseDto } from "./onboarding.interface";

const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateBasicInfo: builder.mutation<
      UpdateBasicOnboardingInfoResponseDto,
      FormData
    >({
      query: (data) => ({
        url: "/onboarding/basic-info",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Onboarding"],
    }),
  }),
});

export const { useUpdateBasicInfoMutation } = onboardingApi;

export default onboardingApi;
