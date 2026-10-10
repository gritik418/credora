import OrganizationHeader from "@/components/organization/OrganizationHeader";
import OrganizationProvider from "@/components/organization/OrganizationProvider";
import OrganizationSidebar from "@/components/organization/OrganizationSidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

const OrganizationLayout = async ({ children, params }: Props) => {
  const { slug } = await params;

  if (!slug) return null;
  return (
    <OrganizationProvider slug={slug}>
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
    </OrganizationProvider>
  );
};

export default OrganizationLayout;
