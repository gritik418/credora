export interface GetNotificationResponseDto {
  success: boolean;
  message: string;
  data: {
    notifications: any[];
  };
}
