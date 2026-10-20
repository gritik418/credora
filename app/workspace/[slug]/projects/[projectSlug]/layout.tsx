import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectProvider from "@/components/project/ProjectProvider";
import React from "react";

interface Props {
  children: React.ReactNode;
  params: Promise<{ projectSlug: string }>;
}

const layout = async ({ children, params }: Props) => {
  const { projectSlug } = await params;

  return (
    <ProjectProvider projectSlug={projectSlug}>
      <div className="min-h-screen bg-[#070912] text-slate-200">
        <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <ProjectHeader />
          {children}
        </div>
      </div>
    </ProjectProvider>
  );
};

export default layout;
