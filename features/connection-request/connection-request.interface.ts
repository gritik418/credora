import SendConnectionRequestDto from "./dto/send-connection-request.dto";

export interface BaseConnectionRequestResponseDto {
  success: boolean;
  message: string;
}

export interface AcceptConnectionRequestArgs {
  connectionRequestId: string;
}

export interface SendConnectionRequestResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<SendConnectionRequestDto>;
}

export interface GetConnectionRequestsResponseDto {
  success: boolean;
  message: string;
  data?: {
    connectionRequests: ConnectionRequest[];
  };
}

export interface GetSentConnectionRequestsResponseDto {
  success: boolean;
  message: string;
  data?: {
    connectionRequests: SentConnectionRequest[];
  };
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: ConnectionRequestStatus;
  message: string | null;
  createdAt: Date;
  updatedAt: Date;
  respondedAt: Date | null;

  sender: {
    id: string;
    name: string;
    avatar: string | null;
    username: string;
    email: string;
    profile: {
      headline: string | null;
      profession: string | null;
      industry: string | null;
      bio: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
    } | null;
  };
}

export interface SentConnectionRequest {
  id: string;
  message: string | null;
  receiverId: string;
  senderId: string;
  status: ConnectionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  respondedAt: Date | null;

  receiver: {
    id: string;
    name: string;
    avatar: string | null;
    username: string;
    email: string;
    profile: {
      headline: string | null;
      profession: string | null;
      industry: string | null;
      bio: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
    } | null;
  };
}

export enum ConnectionRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  EXPIRED = "EXPIRED",
}
