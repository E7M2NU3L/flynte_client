import { CreateMemberSchema, UpdateMemberSchema, MemberIdSchema } from "../schemas/member-schemas";
import z from "zod";

export type CreateMemberType = z.infer<typeof CreateMemberSchema>;
export type UpdateMemberType = z.infer<typeof UpdateMemberSchema>;
export type MemberIdType = z.infer<typeof MemberIdSchema>; 

export type Member = {
    createdAt: string; // ISO date string when the member was created
    dateOfBirth: string; // ISO date string for the member's date of birth
    email: string; // Member's email address
    gender: "Male" | "Female" | "Other"; // Member's gender
    income: number; // Member's income
    isPrimary: boolean; // Indicates if the member is the primary member of the family
    joinedDate: string; // ISO date string for the date the member joined
    name: string; // Member's name
    notes: string; // Notes about the member
    phone: string; // Member's phone number
    profileImage: string; // URL of the member's profile image
    role: "Parent" | "Child" | "Guardian" | "Other"; // Member's role in the family
    status: "Active" | "Inactive"; // Status of the member
    updatedAt: string; // ISO date string when the member was last updated
    _id : string;
    _v : number;
};