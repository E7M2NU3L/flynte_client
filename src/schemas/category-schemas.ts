import z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string(),
  type: z.enum(['Income', 'Expense']),
  description: z.string().optional(),
  parentCategory: z.string().optional(),
  createdBy: z.string(),
  isDefault: z.boolean().optional().default(false)
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export const CategoryIdSchema = z.object({
  id: z.string()
}); 