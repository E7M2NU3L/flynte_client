import { CreateAccountType, UpdateAccountType } from "@/types/account-types";
import { AppErr } from "@/utils/app-err";
import axios from "axios";

export async function CreateAccount(account: CreateAccountType) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/accounts";
        const response = await axios.post(endpoint, account, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Account was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function FetchAllAccounts(memberId: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/accounts" + `?memberId=${memberId}`;
        const response = await axios.get(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to fetch accounts");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function FetchSingleAccount(accountId: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/accounts/" + accountId;
        const response = await axios.get(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to fetch account");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function UpdateAccount(values: { id: string; account: UpdateAccountType }) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/accounts/" + values.id;
        const response = await axios.patch(endpoint, values.account, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to update account");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function DeleteAccount(id: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/accounts/" + id;
        const response = await axios.delete(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to delete account");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
} 