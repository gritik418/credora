import ProjectHeader from "@/components/project/ProjectHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const workspaceId = "mobile-app";
  const projectId = "undefined";

  return (
    <div className="min-h-screen bg-[#070912] text-slate-200">
      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <ProjectHeader workspaceId={workspaceId} projectId={projectId} />
        {children}
      </div>
    </div>
  );
};

export default layout;
