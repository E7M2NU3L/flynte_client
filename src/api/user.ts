import { DeleteUserTypes, LoginTypes, RegisterStep1Types, ResetPasswordTypes, SendOTPTypes, VerifyOTPTypes, VerifyUserOtpTypes } from "@/types/users";
import { AppErrServer } from "@/utils/app-err";
import axios from 'axios';
import { updateImage, uploadImage } from "./buckets";
import { bucket } from "@/config/appwrite-conf";

export async function RegisterUser(values : RegisterStep1Types) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/sign-up";
        const response = await axios.post(endpoint, values, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function LoginUser(values : LoginTypes) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/sign-in";
        const response = await axios.post(endpoint, values, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function GetUser() {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/profile";
        const response = await axios.get(endpoint, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function SendOtp(values : SendOTPTypes)  {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/send-otp";
        const response = await axios.post(endpoint, values, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function VerifyOtp(values : VerifyOTPTypes) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/verify-otp";
        const response = await axios.post(endpoint, values, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function ResetPassword(values : ResetPasswordTypes) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/reset-password";
        const response = await axios.put(endpoint, values, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function VerifyUser() {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/verify-user-send-otp";
        const response = await axios.post(endpoint, {}, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function verfiyUserVerifyOtp(values : VerifyUserOtpTypes) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/verify-email";
        const response = await axios.put(endpoint, values, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
}

export async function DeleteAccount(values : DeleteUserTypes) {
    try {
        if (!values.confirm) {
            throw new Error("Confirm the agreements to contiue");
        }

        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/profile";
        const response = await axios.delete(endpoint, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function UpdateProfile(values : any) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/profile";
        const response = await axios.put(endpoint, values, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function LogoutUser() {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/sign-out";
        const payload = {}
        const response = await axios.post(endpoint,payload, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
}

export async function uploadProfilePic(file : File, fileId : string) {
    try {
        let fileUrl : any = ''
        if (fileId === "") {
            fileUrl = await uploadImage(file);
        }
        else {
            fileUrl = await updateImage(fileId, file)
        }

        if (!fileUrl) {
            throw new Error("File not uploaded");
        }

        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/upload-profile-pic";
        const payload = {
            fileUrl
        }
        const response = await axios.put(endpoint,payload, {
            withCredentials : true
        });
        
        console.log(response);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
}

export async function deleteProfilePic(fileId : string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/delete-profile-pic";
        const payload = {}
        const response = await axios.put(endpoint,payload, {
            withCredentials : true
        });
        
        console.log(response);

        await bucket.deleteFile(import.meta.env.VITE_APPWRITE_BUCKET_ID as string, fileId);
        return response;
    } catch (error) {
        AppErrServer(error);
    }
}

export async function handleGoogleAuth() {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/auth/callback/google";
        window.open(endpoint, "_self")
    } catch (error) {
        AppErrServer(error);
    }
}