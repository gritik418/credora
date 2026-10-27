import {
  useAcceptOrgInviteMutation,
  useDeclineOrgInviteMutation,
} from "@/features/organization-invite/organization-invite.api";
import {
  AcceptOrgInviteRequestDto,
  BaseOrgInviteResponseDto,
  DeclineOrgInviteRequestDto,
} from "@/features/organization-invite/organization-invite.interface";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

export const useOrgInviteActions = () => {
  const [acceptInvite, acceptState] = useAcceptOrgInviteMutation();
  const [declineInvite, declineState] = useDeclineOrgInviteMutation();

  const acceptOrganizationInvite = async (data: AcceptOrgInviteRequestDto) => {
    try {
      const result = await acceptInvite(data).unwrap();

      if (result.success) {
        toast.success(result.message || "Invite accepted successfully.");
      } else {
        toast.error(result.message || "Failed to accept invite.");
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as BaseOrgInviteResponseDto;

        toast.error(response.message || "Something went wrong.");
        return;
      }

      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const declineOrganizationInvite = async (
    data: DeclineOrgInviteRequestDto,
  ) => {
    try {
      const result = await declineInvite(data).unwrap();

      if (result.success) {
        toast.success(result.message || "Invite declined successfully.");
      } else {
        toast.error(result.message || "Failed to decline invite.");
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as BaseOrgInviteResponseDto;

        toast.error(response.message || "Something went wrong.");
        return;
      }

      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return {
    isAcceptingInvite: acceptState.isLoading,
    isDecliningInvite: declineState.isLoading,

    acceptOrganizationInvite,
    declineOrganizationInvite,
  };
};
