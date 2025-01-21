import { z } from "zod";

export const LoginSchema = z.object({
    email : z.string().email({
        message : 'enter a valid email address'
    }),
    password : z.string(),
});

export const RegisterSchemaStep1 = z.object({
    firstname : z.string(),
    lastname : z.string(),
    email : z.string().email({
        message : 'enter a valid email address'
    }),
    password : z.string().min(6, {
        message : 'password must be atleast 6 characters'
    }).max(70, {
        message : "max limit reached"
    }),
})

export const SendOTPSchema = z.object({
    email : z.string().email({
      message : "Enter a valid email address"
    })
  });

export const VerifyOTPSchema = z.object({
    otp : z.string().min(6, {
        message : "OTP must be of 6 characters"
    })
});

export const VerifyUserOTPSchema = z.object({
    otp : z.string().min(6, {
        message : "OTP must be of 6 characters"
    })
});

export const ResetPasswordSchema = z.object({
    password : z.string().min(6, {
        message : 'password must be atleast 6 characters'
    }).max(70, {
        message : "max limit reached"
    }),
    confirmpassword : z.string().min(6, {
        message : 'password must be atleast 6 characters'
    }).max(70, {
        message : "max limit reached"
    }),
});

export const DeleteUserSchema = z.object({
    confirm : z.string(),
    datadeletion : z.boolean(),
    agree : z.boolean()
});

export const updateProfileSchema = z.object({
    firstname : z.string(),
    lastname : z.string(),
    phoneNumber : z.string(),
    Bio : z.string()
})