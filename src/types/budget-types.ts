import { CreateBudgetSchema, UpdateBudgetSchema, BudgetIdSchema } from "../schemas/budget-schemas";
import z from "zod";

export type CreateBudgetType = z.infer<typeof CreateBudgetSchema>;
export type UpdateBudgetType = z.infer<typeof UpdateBudgetSchema>;
export type BudgetIdType = z.infer<typeof BudgetIdSchema>; 