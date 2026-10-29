"use client";

import { ReactNode, useState } from "react";
import { useParams } from "next/navigation";
import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceSwitchLoader from "../loaders/WorkspaceSwitchLoader";

interface Props {
  children: ReactNode;
}

const WorkspaceLayout = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  if (isSwitching) return <WorkspaceSwitchLoader />;

  return (
    <div className="min-h-screen bg-[#080a10] text-white">
      <WorkspaceSidebar
        mobileOpen={mobileOpen}
        setIsSwitching={setIsSwitching}
        onClose={() => setMobileOpen(false)}
      />

      <main className="h-screen min-w-0 lg:pl-19">
        <WorkspaceHeader onMenuClick={() => setMobileOpen(true)} />
        <div className="h-[calc(100%-76px)] overflow-y-scroll">{children}</div>
      </main>
    </div>
  );
};

export default WorkspaceLayout;
