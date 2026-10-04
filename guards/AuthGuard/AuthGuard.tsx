"use client";

import CredoraLoader from "@/components/common/CredoraLoader";
import { useGetMeQuery } from "@/features/auth/auth.api";
import { selectIsAuthenticated } from "@/features/auth/auth.selectors";
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

  const { isLoading, isError } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    if (isError && !isPublicRoute && !isAuthRoute) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && isAuthRoute) {
      router.replace("/");
    }
  }, [isAuthenticated, isError, isLoading, pathname, router]);

  if (isLoading) {
    return <CredoraLoader />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
