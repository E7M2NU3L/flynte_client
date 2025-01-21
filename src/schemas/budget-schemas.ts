import z from "zod";

export const CreateBudgetSchema = z.object({
  memberId: z.string().optional(),
  categoryId: z.string(),
  amount: z.number().positive(),
  timePeriod: z.enum(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']),
  spent: z.number().default(0),
  notes: z.string().optional()
});

export const UpdateBudgetSchema = CreateBudgetSchema.partial();

export const BudgetIdSchema = z.object({
  id: z.string()
}); 