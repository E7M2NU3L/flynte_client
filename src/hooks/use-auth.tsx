import { DeleteAccount, deleteProfilePic, GetUser, handleGoogleAuth, LoginUser, LogoutUser, RegisterUser, ResetPassword, SendOtp, UpdateProfile, uploadProfilePic, verfiyUserVerifyOtp, VerifyOtp, VerifyUser } from "@/api/user";
import { DeleteUserTypes, LoginTypes, RegisterStep1Types, ResetPasswordTypes, SendOTPTypes, VerifyOTPTypes, VerifyUserOtpTypes } from "@/types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
    const queryClient = useQueryClient();

    const {data, isLoading, error, isError} = useQuery({
        queryKey : ['get-user'],
        queryFn : GetUser,
    })

    const registerMutation = useMutation({
        mutationFn : (values : RegisterStep1Types) => RegisterUser(values),
        mutationKey : ['register-user']
    });

    const loginMutation = useMutation({
        mutationFn : (values : LoginTypes) => LoginUser(values),
        mutationKey : ['login-user'],
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['get-user']
            })
        }
    })

    const SendOtpMutation = useMutation({
        mutationFn : (values : SendOTPTypes) => SendOtp(values),
        mutationKey : ['send-otp']
    });

    const VerifyOtpMutation = useMutation({
        mutationFn : (values : VerifyOTPTypes) => VerifyOtp(values),
        mutationKey : [
            'verify-otp'
        ]
    });

    const ResetPasswordmutation = useMutation({
        mutationFn : (values : ResetPasswordTypes) => ResetPassword(values),
        mutationKey : ['reset-password']
    });

    const VerifyUserMutation = useMutation({
        mutationFn : VerifyUser,
        mutationKey : ['verify-user']
    })

    const VerifyUserOtpMutation = useMutation({
        mutationFn : (values : VerifyUserOtpTypes) => verfiyUserVerifyOtp(values),
        mutationKey : ['verify-user-otp']
    })

    const LogoutMutation = useMutation({
        mutationFn : LogoutUser,
        mutationKey : ['logout-user'],
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [
                    'get-user'
                ]
            })
        }
    })

    const UpdateProfileMutation = useMutation({
        mutationFn : (values : any) => UpdateProfile(values),
        mutationKey : ['update-user'],
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [
                    'get-user'
                ]
            })
        }
    })

    const handleGoogleMutation = useMutation({
        mutationFn : handleGoogleAuth,
        mutationKey : ['google-auth'],
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [
                    'get-user'
                ]
            })
        }
    })

    const DeleteAccountMutation = useMutation({
        mutationFn : (values : DeleteUserTypes) => DeleteAccount(values),
        mutationKey : ['delete-account'],
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [
                    'get-user'
                ]
            })  
        }
    })

    const uploadProfilePicMutation = useMutation({
        mutationFn : (values : {
            file : File,
            fileId : string
        }) => uploadProfilePic(values.file, values.fileId),
        mutationKey : ['upload-profile-pic'],
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [
                    'get-user'
                ]
            })  
        }
    })

    const deleteProfilePicMutation = useMutation({
        mutationFn : (values : {
            fileId : string
        }) => deleteProfilePic(values.fileId),
        mutationKey : ['delete-profile-pic'],
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : [
                    'get-user'
                ]
            })  
        }
    })

    return {
        userInfo : data,
        error,
        isError,
        isLoading,
        login : loginMutation,
        register : registerMutation,
        Logout : LogoutMutation,
        DeleteAccount : DeleteAccountMutation,
        UpdateProfile : UpdateProfileMutation,
        ResetPassword : ResetPasswordmutation,
        SendOtp : SendOtpMutation,
        VerifyOtp : VerifyOtpMutation,
        VerifyUser : VerifyUserMutation,
        VerifyUserOtp : VerifyUserOtpMutation,
        uploadProfilePicMutation,
        deleteProfilePicMutation,
        handleGoogleMutation 
    }
}