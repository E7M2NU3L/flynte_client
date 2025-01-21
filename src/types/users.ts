import { DeleteUserSchema, LoginSchema, RegisterSchemaStep1, ResetPasswordSchema, SendOTPSchema, updateProfileSchema, VerifyOTPSchema, VerifyUserOTPSchema } from "@/schemas/users";
import { z } from "zod";

export type LoginTypes = z.infer<typeof LoginSchema>;
export type RegisterStep1Types = z.infer<typeof RegisterSchemaStep1>;
export type SendOTPTypes = z.infer<typeof SendOTPSchema>;
export type VerifyOTPTypes = z.infer<typeof VerifyOTPSchema>;
export type ResetPasswordTypes = z.infer<typeof ResetPasswordSchema>;
export type VerifyUserOtpTypes = z.infer<typeof VerifyUserOTPSchema>;
export type DeleteUserTypes = z.infer<typeof DeleteUserSchema>;
export type UpdateProfileTypes = z.infer<typeof updateProfileSchema>;