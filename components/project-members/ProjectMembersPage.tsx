"use client";

import { useMemo, useState } from "react";
import AddProjectMembersModal from "./AddProjectMembersModal";
import ProjectMembersHeader from "./ProjectMembersHeader";
import ProjectMembersStats from "./ProjectMembersStats";
import ProjectMembersTable from "./ProjectMembersTable";
import ProjectMembersToolbar, {
  MemberRoleFilter,
} from "./ProjectMembersToolbar";
import { useAppSelector } from "@/store/hooks";
import {
  selectProjectMemberIds,
  selectProjectMembers,
} from "@/features/project-member/project-member.selectors";

interface Props {
  workspaceId: string;
  projectId: string;
}

const ProjectMembersPage = ({ workspaceId, projectId }: Props) => {
  const members = useAppSelector(selectProjectMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<MemberRoleFilter>("All roles");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.user.name.toLowerCase().includes(query) ||
        member.user.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All roles" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [members, search, roleFilter]);

  return (
    <div className="min-h-screen bg-[#08090e] text-white">
      <div className="mx-auto max-w-375 space-y-7">
        <ProjectMembersHeader
          memberCount={members.length}
          onAddMembers={() => setIsModalOpen(true)}
        />

        {/* <ProjectMembersStats {...stats} /> */}

        <section className="space-y-4">
          <ProjectMembersToolbar
            search={search}
            roleFilter={roleFilter}
            onSearchChange={setSearch}
            onRoleFilterChange={setRoleFilter}
          />

          <ProjectMembersTable members={filteredMembers} />
        </section>
      </div>

      <AddProjectMembersModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProjectMembersPage;
