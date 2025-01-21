import z from "zod";

export const CreateMemberSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string(),
  role: z.enum(['Parent', 'Child', 'Guardian']),
  profileImage: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Non-binary', 'unkown']),
  dateOfBirth: z.string().optional(),
  isPrimary: z.boolean().optional().default(false),
  income: z.any().optional(),
  joinedDate: z.string().optional().default(new Date().toISOString()),
  status: z.enum(['Active', 'Inactive', 'Removed']).optional().default('Active'),
  notes: z.string().optional(),
});

export const UpdateMemberSchema = CreateMemberSchema.partial();

export const MemberIdSchema = z.object({
  id: z.string()
}); 