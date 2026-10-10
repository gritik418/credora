"use client";

import { Users } from "lucide-react";
import MemberRow from "./MemberRow";
import { OrganizationMemberRole } from "@/features/organization/organization.interface";
import { OrganizationMember } from "@/features/organization-member/organization-member.interface";

interface Props {
  members: OrganizationMember[];
  onRoleChange: (id: string, role: OrganizationMemberRole) => void;
  onRemove: (member: OrganizationMember) => void;
}

const MembersTable = ({ members, onRoleChange, onRemove }: Props) => {
  return (
    <div className="overflow-visible">
      <div className="hidden grid-cols-[minmax(230px,1.6fr)_minmax(110px,0.8fr)_minmax(110px,0.8fr)_minmax(125px,0.9fr)_40px] gap-3 border-b border-(--org-border) bg-white/[0.012] px-5 py-3 lg:grid">
        {["MEMBER", "ROLE", "STATUS", "DEPARTMENT", ""].map(
          (heading, index) => (
            <span key={`${heading}-${index}`} className="org-label">
              {heading}
            </span>
          ),
        )}
      </div>

      {members.length > 0 ? (
        members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            onRoleChange={onRoleChange}
            onRemove={onRemove}
          />
        ))
      ) : (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/2.5 text-white/35">
            <Users size={24} />
          </div>

          <h3 className="mt-4 text-sm font-medium text-white">
            No members found
          </h3>

          <p className="mt-2 max-w-xs text-xs leading-5 text-white/40">
            Try changing your search or selected filter to find team members.
          </p>
        </div>
      )}
    </div>
  );
};

export default MembersTable;
