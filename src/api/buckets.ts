import { bucket } from "@/config/appwrite-conf";
import { AppErrServer } from "@/utils/app-err";
import { ID } from "appwrite";

export async function uploadImage(image : File) {
    try {
        const response = await bucket.createFile(import.meta.env.VITE_APPWRITE_BUCKET_ID as string, ID.unique(), image);

        if (!response.$id) {
            throw new Error("File not Created Properly");
        }

        return response.$id;
    } catch (error) {
        AppErrServer(error);
    }
};

export async function ViewImage(id : string) {
    try {
        const imageURL = await bucket.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID as string, id);

        if (!imageURL) {
            throw new Error("Image url not Found")
        }

        return imageURL;
    } catch (error) {
        AppErrServer(error);
    }
}

export async function updateImage(fileId : string, file : File) {
    try {
        await bucket.deleteFile(import.meta.env.VITE_APPWRITE_BUCKET_ID as string, fileId);
        
        const response = await bucket.createFile(import.meta.env.VITE_APPWRITE_BUCKET_ID as string, ID.unique() , file);

        if (!response.$id) {
            throw new Error("File not Created Properly");
        }

        return response.$id;
    } catch (error) {
        AppErrServer(error);
    }
}