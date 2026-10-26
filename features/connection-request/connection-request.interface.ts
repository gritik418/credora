import SendConnectionRequestDto from "./dto/send-connection-request.dto";

export interface SendConnectionRequestResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<SendConnectionRequestDto>;
}
