import InvitesHeader from "@/components/invites/InvitesHeader";
import InvitesList from "@/components/invites/InvitesList";

const InvitesPage = () => {
  return (
    <main className="min-h-screen px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <InvitesHeader />
        <InvitesList />
      </div>
    </main>
  );
};

export default InvitesPage;
