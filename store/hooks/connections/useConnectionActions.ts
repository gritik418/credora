import { useSendConnectionRequestMutation } from "@/features/connection-request/connection-request.api";
import { SendConnectionRequestResponseDto } from "@/features/connection-request/connection-request.interface";
import SendConnectionRequestDto from "@/features/connection-request/dto/send-connection-request.dto";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

export const useConnectionActions = () => {
  const [sendRequest, sendState] = useSendConnectionRequestMutation();

  const sendConnectionRequest = async (
    data: SendConnectionRequestDto,
    setError?: UseFormSetError<SendConnectionRequestDto>,
  ) => {
    try {
      const result = await sendRequest(data).unwrap();

      if (result.success) {
        toast.success(result.message || "Request sent successfully.");
      } else {
        toast.error(result.message || "Failed to send request.");
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError) && setError) {
        const response = (error as FetchBaseQueryError)
          .data as SendConnectionRequestResponseDto;

        if (response.errors) {
          Object.entries(response.errors).forEach(([field, message]) => {
            if (message) {
              setError(field as keyof SendConnectionRequestDto, {
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
    }
  };

  return {
    isSendingRequest: sendState.isLoading,

    sendConnectionRequest,
  };
};
