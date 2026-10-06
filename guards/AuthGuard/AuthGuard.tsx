"use client";

import CredoraLoader from "@/components/common/CredoraLoader";
import { useGetMeQuery } from "@/features/auth/auth.api";
import { OnboardingStep } from "@/features/auth/auth.interface";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/auth.selectors";
import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PUBLIC_ROUTES = ["/"];

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/register/success",
  "/verify-email",
  "/forgot-password",
];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  const { isLoading, isError } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const getOnboardingRoute = (step: OnboardingStep) => {
    switch (step) {
      case OnboardingStep.BASIC_INFO:
        return "/onboarding";
      case OnboardingStep.PROFESSIONAL:
        return "/onboarding/professional";
      case OnboardingStep.EXPERIENCE:
        return "/onboarding/experience";
      case OnboardingStep.SUMMARY:
        return "/onboarding/summary";
      case OnboardingStep.LOCATION:
        return "/onboarding/location";
      case OnboardingStep.SKILLS:
        return "/onboarding/skills";
      case OnboardingStep.EDUCATION:
        return "/onboarding/education";
      case OnboardingStep.AVAILABILITY:
        return "/onboarding/availability";
      case OnboardingStep.COMPLETED:
        return "/onboarding/completed";
      default:
        return "/onboarding";
    }
  };

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isOnboardingRoute =
      pathname.startsWith("/onboarding") &&
      pathname !== "/onboarding/completed";

    if (isError && !isPublicRoute && !isAuthRoute) {
      router.replace("/login");
      return;
    }

    if (!isAuthenticated || !user) return;

    if (isAuthRoute) {
      router.replace("/");
      return;
    }

    if (!user.onboarding.isCompleted) {
      const onboardingRoute = getOnboardingRoute(user.onboarding.currentStep);

      if (pathname !== onboardingRoute) {
        router.replace(onboardingRoute);
      }

      return;
    }

    if (user.onboarding.isCompleted && isOnboardingRoute) {
      router.replace("/");
    }
  }, [isAuthenticated, isError, isLoading, pathname, router, user]);
  if (isLoading) {
    return <CredoraLoader />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
