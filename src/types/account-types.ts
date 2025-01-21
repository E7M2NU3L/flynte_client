import { CreateAccountSchema, UpdateAccountSchema, AccountIdSchema } from "../schemas/account-schemas";
import z from "zod";

export type CreateAccountType = z.infer<typeof CreateAccountSchema>;
export type UpdateAccountType = z.infer<typeof UpdateAccountSchema>;
export type AccountIdType = z.infer<typeof AccountIdSchema>; 

// Type for Member
export interface Member {
    _id: string;
    createdAt: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    income: number;
    isPrimary: boolean;
    joinedDate: string;
    name: string;
    notes: string;
    phone: string;
    profileImage: string;
    role: string;
    status: string;
    updatedAt: string;
    user: string;
    __v: number;
  }
  
  // Type for Account
export interface Account {
    _id: string;
    name: string;
    type: string;
    balance: number;
    currency: string;
    memberId: Member;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
  