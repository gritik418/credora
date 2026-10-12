"use client";

import SendInviteDto from "@/features/organization-invite/dto/send-invite.dto";
import { useSendOrganizationInviteMutation } from "@/features/organization-invite/organization-invite.api";
import { SendOrganizationInviteResponseDto } from "@/features/organization-invite/organization-invite.interface";
import SendInviteSchema from "@/features/organization-invite/schemas/send-invite.schema";
import { OrganizationMemberRole } from "@/features/organization/organization.interface";
import { selectSelectedOrganization } from "@/features/organization/organization.selectors";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { LoaderCircle, Mail, Plus, ShieldCheck, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
}

const InviteMemberModal = ({ open, onClose }: Props) => {
  const selectedOrg = useAppSelector(selectSelectedOrganization);

  const [sendInvite, { isLoading }] = useSendOrganizationInviteMutation();

  const {
    register,
    setValue,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendInviteDto>({
    defaultValues: {
      email: "",
      role: OrganizationMemberRole.MEMBER,
      department: "",
      designation: "",
    },
    mode: "onChange",
    resolver: zodResolver(SendInviteSchema),
  });

  const handleInvite = async (data: SendInviteDto) => {
    try {
      if (!selectedOrg) return;

      const result = await sendInvite({
        data,
        orgId: selectedOrg.id,
      }).unwrap();

      if (!result.success) {
        toast.error(
          result.message || "Something went wrong. Please try again later.",
        );
      } else {
        toast.success(result.message || "Invite sent successfully.");

        onClose();
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as SendOrganizationInviteResponseDto;

        if (response.errors) {
          Object.entries(response.errors).forEach(([field, message]) => {
            if (message) {
              setError(field as keyof SendInviteDto, {
                type: "server",
                message,
              });
            }
          });
        } else {
          toast.error(response.message || "Something went wrong.");
        }
        return;
      }

      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    } finally {
      reset();
    }
  };
  if (!open || !selectedOrg) return null;

  const getRoleLabel = (role: OrganizationMemberRole) => {
    switch (role) {
      case OrganizationMemberRole.MEMBER:
        return "Member — Standard access";
      case OrganizationMemberRole.MANAGER:
        return "Manager — Team management";
      case OrganizationMemberRole.ADMIN:
        return "Admin — Full organization control";
      case OrganizationMemberRole.OWNER:
        return "Owner — Complete ownership and full control";
      case OrganizationMemberRole.RECRUITER:
        return "Recruiter — Hiring and recruitment";
      default:
        return "Member — Standard access";
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="org-card-gradient w-full max-w-md p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
            <Mail size={22} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg cursor-pointer p-2 text-white/40 transition hover:bg-white/6 hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-semibold text-white">
          Invite a team member
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/45">
          Give someone access to your organization and collaborate on work
          together.
        </p>

        <form onSubmit={handleSubmit(handleInvite)} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-white/70">
              Work email
            </label>

            <input
              {...register("email")}
              autoFocus
              type="email"
              required
              placeholder="name@company.com"
              className="h-11 w-full rounded-xl border border-white/9 bg-black/20 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/50"
            />

            {errors.email?.message && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-white/70">
              Designation
            </label>

            <input
              {...register("designation")}
              type="text"
              placeholder="Software Engineer"
              className="h-11 w-full rounded-xl border border-white/9 bg-black/20 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/50"
            />

            {errors.designation?.message && (
              <p className="mt-1 text-xs text-red-400">
                {errors.designation.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-white/70">
              Department
            </label>

            <input
              {...register("department")}
              type="text"
              placeholder="Engineering"
              className="h-11 w-full rounded-xl border border-white/9 bg-black/20 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/50"
            />

            {errors.department?.message && (
              <p className="mt-1 text-xs text-red-400">
                {errors.department.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-white/70">
              Organization role
            </label>

            <div className="relative">
              <ShieldCheck
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-300"
              />

              <select
                onChange={(e) => {
                  setValue("role", e.target.value as OrganizationMemberRole);
                }}
                className="h-11 w-full appearance-none rounded-xl border border-white/9 bg-[#10131d] pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-400/50"
              >
                {Object.values(OrganizationMemberRole)
                  .filter((role) => role !== OrganizationMemberRole.OWNER)
                  .map((role) => (
                    <option key={role} value={role}>
                      {getRoleLabel(role)}
                    </option>
                  ))}
              </select>

              {errors.role?.message && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-indigo-400/10 bg-indigo-500/5 p-3.5">
            <p className="text-xs leading-5 text-white/50">
              The selected role determines the member's permissions within the
              organization.
            </p>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="org-secondary-button cursor-pointer flex-1 rounded-xl px-4 py-3 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="org-primary-button flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading || isSubmitting ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Inviting...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Invite member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;
