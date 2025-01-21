import { CreateCategorySchema, UpdateCategorySchema, CategoryIdSchema } from "../schemas/category-schemas";
import z from "zod";

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;
export type CategoryIdType = z.infer<typeof CategoryIdSchema>; 

export interface CategoryProps {
    _id: string;
    name: string;
    type: "Income" | "Expense";
    description?: string;
    parentCategory?: string; // Add this if parent category data exists.
    createdBy: any;
    isDefault: boolean;
    createdAt: string; // ISO timestamp.
    updatedAt: string; // ISO timestamp.
    __v: number;
  }
  