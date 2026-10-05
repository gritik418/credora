import baseApi from "@/store/api/base-api";
import RegisterDto from "./dto/register.dto";
import {
  GetMeResponseDto,
  LoginResponseDto,
  RegisterResponseDto,
  ResendVerificationEmailResponseDto,
  VerifyEmailResponseDto,
} from "./auth.interface";
import ResendVerificationEmailDto from "./dto/resend-verification-email.dto";
import LoginDto from "./dto/login.dto";
import VerifyEmailDto from "./dto/verify-email.dto";

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
    login: builder.mutation<LoginResponseDto, LoginDto>({
      query: (body: LoginDto) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: builder.mutation<VerifyEmailResponseDto, VerifyEmailDto>({
      query: (body: VerifyEmailDto) => ({
        url: "/auth/verify-email",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<GetMeResponseDto, void>({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Auth", "Onboarding"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
} = authApi;

export default authApi;
