import WorkspaceLayout from "@/components/workspace/WorkspaceLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
};

export default Layout;
