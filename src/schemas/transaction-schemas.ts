import z from "zod";

export const CreateTransactionSchema = z.object({
  memberId: z.string(),
  categoryId: z.string(),
  amount: z.any(),
  type: z.enum(['Income', 'Expense']),
  date: z.string().optional().default(new Date().toISOString()),
  paymentMethod: z.enum(['Cash', 'Card', 'UPI']),
  notes: z.string().optional(),
  isRecurring: z.boolean().optional().default(false),
  recurrenceFrequency: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly', 'None']).optional().default('None'),
  status: z.enum(['Completed', 'Pending', 'Failed']).optional().default('Completed')
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export const TransactionIdSchema = z.object({
  id: z.string()
}); 