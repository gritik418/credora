"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../navbar/Navbar";
import PageWrapper from "./PageWrapper";

const AUTH_PAGES = [
  "/login",
  "/register",
  "/register/success",
  "/verify-email",
];

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuth = AUTH_PAGES.includes(pathname);

  return isAuth ? (
    <>{children}</>
  ) : (
    <PageWrapper>
      {pathname.startsWith("/org/") ? null : <Navbar />}
      {children}
    </PageWrapper>
  );
};

export default LayoutWrapper;
