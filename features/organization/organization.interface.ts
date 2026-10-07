import CreateOrganizationDto from "./dto/create-organization.dto";

export interface CreateOrganizationResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<CreateOrganizationDto>;
  data?: {
    organizationId: string;
  };
}
