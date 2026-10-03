import baseApi from "@/store/api/base-api";
import RegisterDto from "./dto/register.dto";
import {
  RegisterResponseDto,
  ResendVerificationEmailResponseDto,
} from "./auth.interface";
import ResendVerificationEmailDto from "./dto/resend-verification-email.dto";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponseDto, RegisterDto>({
      query: (body: RegisterDto) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    resendVerificationEmail: builder.mutation<
      ResendVerificationEmailResponseDto,
      ResendVerificationEmailDto
    >({
      query: (body: ResendVerificationEmailDto) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useResendVerificationEmailMutation } =
  authApi;

export default authApi;
