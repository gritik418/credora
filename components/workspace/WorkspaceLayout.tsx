"use client";

import { ReactNode, useState } from "react";
import { useParams } from "next/navigation";
import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceHeader from "./WorkspaceHeader";

interface Props {
  children: ReactNode;
}

const WorkspaceLayout = ({ children }: Props) => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080a10] text-white">
      <WorkspaceSidebar
        workspaceId={workspaceId}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="min-h-screen min-w-0 lg:pl-19">
        <WorkspaceHeader onMenuClick={() => setMobileOpen(true)} />

        {children}
      </main>
    </div>
  );
};

export default WorkspaceLayout;
