import { CreateMemberType, UpdateMemberType } from "@/types/member-types";
import { AppErr } from "@/utils/app-err";
import axios from "axios";

export async function CreateMember(member: CreateMemberType) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/member";
        const response = await axios.post(endpoint, member, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Member was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function FetchAllMembers() {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/member";
        const response = await axios.get(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to fetch members");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function FetchSingleMember(memberId: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/member/" + memberId;
        const response = await axios.get(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to fetch member");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function UpdateMember(values: { id: string; member: UpdateMemberType }) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/member/" + values.id;
        const response = await axios.put(endpoint, values.member, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to update member");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function DeleteMember(id: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/member/" + id;
        const response = await axios.delete(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to delete member");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}
