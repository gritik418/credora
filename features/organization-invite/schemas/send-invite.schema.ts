import { OrganizationMemberRole } from "@/features/organization/organization.interface";
import { RefinementCtx, z } from "zod";

const SendInviteSchema = z
  .object({
    email: z.email("Invalid email address."),
    role: z
      .enum(OrganizationMemberRole)
      .default(OrganizationMemberRole.MEMBER)
      .optional(),
    department: z.string().optional(),
    designation: z.string().optional(),
  })
  .superRefine(({ role }, ctx: RefinementCtx) => {
    if (role === OrganizationMemberRole.OWNER) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You cannot invite an owner.",
        path: ["role"],
      });
    }
  });

export default SendInviteSchema;
