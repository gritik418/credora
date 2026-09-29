"use client";

import { usePathname } from "next/navigation";
import React from "react";
import PageWrapper from "./PageWrapper";
import Navbar from "../navbar/Navbar";

const AUTH_PAGES = ["/login", "/register"];

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuth = AUTH_PAGES.includes(pathname);

  return isAuth ? (
    <>{children}</>
  ) : (
    <PageWrapper>
      <Navbar />
      {children}
    </PageWrapper>
  );
};

export default LayoutWrapper;
