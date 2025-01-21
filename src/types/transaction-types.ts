import { CreateTransactionSchema, UpdateTransactionSchema, TransactionIdSchema } from "../schemas/transaction-schemas";
import z from "zod";

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionType = z.infer<typeof UpdateTransactionSchema>;
export type TransactionIdType = z.infer<typeof TransactionIdSchema>; 

type Category = {
    _id: string;
    name: string;
    type: string; // e.g., 'Expense', 'Income'
    description: string;
    createdBy: string;
    createdAt?: string;
    updatedAt?: string;
  };
  
  type Member = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string; // e.g., 'Parent', 'Child', etc.
    createdAt?: string;
    updatedAt?: string;
  };
  
export type ExpenseResponse = {
    _id: string;
    amount: number;
    categoryId: Category;
    createdAt: string;
    date: string;
    isRecurring: boolean;
    memberId: Member;
    notes: string;
    paymentMethod: string; // e.g., 'UPI', 'Cash', etc.
    recurrenceFrequency?: string; // e.g., 'Monthly', 'Yearly', etc.
    status: string; // e.g., 'Completed', 'Pending'
    type: string; // e.g., 'Expense', 'Income'
    updatedAt: string;
    __v: number;
  };
  