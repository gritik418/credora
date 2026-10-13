import WorkspaceLayout from "@/components/workspace/WorkspaceLayout";
import WorkspaceProvider from "@/components/workspace/WorkspaceProvider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;

  if (!slug) return null;
  return (
    <WorkspaceProvider slug={slug}>
      <WorkspaceLayout>{children}</WorkspaceLayout>
    </WorkspaceProvider>
  );
};

export default Layout;
