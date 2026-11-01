"use client";

import { ReactNode, useState } from "react";
import WorkspaceSwitchLoader from "../loaders/WorkspaceSwitchLoader";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceSidebar from "./WorkspaceSidebar";

interface Props {
  children: ReactNode;
}

const WorkspaceLayout = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  if (isSwitching) return <WorkspaceSwitchLoader />;

  return (
    <div className="h-screen! bg-[#080a10] text-white">
      <WorkspaceSidebar
        mobileOpen={mobileOpen}
        setIsSwitching={setIsSwitching}
        onClose={() => setMobileOpen(false)}
      />

      <main className="h-screen overflow-hidden lg:pl-19">
        <WorkspaceHeader onMenuClick={() => setMobileOpen(true)} />
        <div className="h-[calc(100%-76px)]! overflow-y-scroll">{children}</div>
      </main>
    </div>
  );
};

export default WorkspaceLayout;
