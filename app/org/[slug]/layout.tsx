import OrganizationHeader from "@/components/organization/OrganizationHeader";
import OrganizationSidebar from "@/components/organization/OrganizationSidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const OrganizationLayout = ({ children }: Props) => {
  return (
    <div className="org-shell h-screen flex org-background">
      <OrganizationSidebar />

      <div className="flex flex-col h-screen overflow-y-scroll w-full">
        <OrganizationHeader />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1600px] p-5 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizationLayout;
