import IdentityPage from "@/components/identity/IdentityPage";

interface IdentityScreenProps {
  params: Promise<{
    username: string;
  }>;
}

const IdentityScreen = async ({ params }: IdentityScreenProps) => {
  const { username } = await params;

  return <IdentityPage username={username} />;
};

export default IdentityScreen;
