export interface Workspace {
  id: string;

  organizationId: string;

  name: string;
  slug: string;
  description?: string;
  logo?: string;

  isActive: boolean;

  createdById: string;
  updatedAt: string;
}
