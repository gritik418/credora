"use client";

import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileAvailability from "@/components/profile/ProfileAvailability";
import ProfileEducation from "@/components/profile/ProfileEducation";
import ProfileExperience from "@/components/profile/ProfileExperience";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSkills from "@/components/profile/ProfileSkills";
import ProfileSocialLinks from "@/components/profile/ProfileSocialLinks";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/features/auth/auth.selectors";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <ProfileHeader user={user} />

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <ProfileAbout profile={user.profile} />
            <ProfileExperience profile={user.profile} />
            <ProfileEducation profile={user.profile} />
          </div>

          <div className="space-y-5">
            <ProfileSocialLinks profile={user.profile} />
            <ProfileAvailability profile={user.profile} />
            <ProfileSkills profile={user.profile} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
