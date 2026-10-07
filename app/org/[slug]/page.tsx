import OrganizationActivity from "@/components/organization/OrganizationActivity";
import OrganizationStats from "@/components/organization/OrganizationStats";
import OrganizationWorkspaces from "@/components/organization/OrganizationWorkspaces";

const OrganizationPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo-300/50">
          Overview
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
          Organization overview
        </h2>

        <p className="mt-1 text-sm text-white/35">
          Get a quick look at what is happening across your organization.
        </p>
      </div>

      <OrganizationStats />

      <OrganizationWorkspaces />

      <OrganizationActivity />
    </div>
  );
};

export default OrganizationPage;
