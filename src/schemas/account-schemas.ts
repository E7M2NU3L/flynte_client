import z from "zod";

export const CreateAccountSchema = z.object({
  memberId: z.string(),
  name: z.string(),
  type: z.enum(['Bank', 'Wallet', 'Cash']),
  balance: z.any().optional().default(0),
  currency: z.string().default('INR')
});

export const UpdateAccountSchema = CreateAccountSchema.partial();

export const AccountIdSchema = z.object({
  id: z.string()
}); 