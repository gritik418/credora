"use client";

import { useMemo, useState } from "react";
import AddProjectMembersModal from "./AddProjectMembersModal";
import ProjectMembersHeader from "./ProjectMembersHeader";
import ProjectMembersStats from "./ProjectMembersStats";
import ProjectMembersTable from "./ProjectMembersTable";
import ProjectMembersToolbar, {
  MemberRoleFilter,
} from "./ProjectMembersToolbar";

interface Props {
  workspaceId: string;
  projectId: string;
}

const ProjectMembersPage = ({ workspaceId, projectId }: Props) => {
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<MemberRoleFilter>("All roles");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingMembers, setIsAddingMembers] = useState(false);

  const assignedMemberIds = useMemo(
    () => new Set(members.map((member) => member.id)),
    [members],
  );

  const availableToAdd = useMemo(
    () => [].filter((member: any) => !assignedMemberIds.has(member.id)),
    [assignedMemberIds],
  );

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All roles" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [members, search, roleFilter]);

  const stats = useMemo(
    () => ({
      totalMembers: members.length,
      activeTasks: members.reduce(
        (total, member) => total + member.activeTasks,
        0,
      ),
      completedTasks: members.reduce(
        (total, member) => total + member.tasksCompleted,
        0,
      ),
      departments: new Set(members.map((member) => member.department)).size,
    }),
    [members],
  );

  const handleAddMembers = async (memberIds: string[]) => {
    setIsAddingMembers(true);
  };

  const handleRemoveMember = () => {};

  const handleRoleChange = (memberId: string) => {};

  return (
    <div className="min-h-screen bg-[#08090e] text-white">
      <div className="mx-auto max-w-375 space-y-7">
        <ProjectMembersHeader
          workspaceId={workspaceId}
          projectId={projectId}
          memberCount={members.length}
          onAddMembers={() => setIsModalOpen(true)}
        />

        <ProjectMembersStats {...stats} />

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
        members={availableToAdd}
        isLoading={isAddingMembers}
        onClose={() => {
          if (!isAddingMembers) setIsModalOpen(false);
        }}
        onSubmit={handleAddMembers}
      />
    </div>
  );
};

export default ProjectMembersPage;
