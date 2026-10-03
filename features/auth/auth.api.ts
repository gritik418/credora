import baseApi from "@/store/api/base-api";
import RegisterDto from "./dto/register.dto";
import { RegisterResponseDto } from "./auth.interface";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponseDto, RegisterDto>({
      query: (body: RegisterDto) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;

export default authApi;
