import { CreateTransactionType, UpdateTransactionType } from "@/types/transaction-types";
import { AppErr } from "@/utils/app-err";
import axios from "axios";

export async function CreateTransaction(transaction: CreateTransactionType) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/transactions";
        const response = await axios.post(endpoint, transaction, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Transaction was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function FetchAllTransactions(memberId: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/transactions" + `?memberId=${memberId}`;
        const response = await axios.get(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Transactions were not fetched properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function FetchSingleTransaction(transactionId: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/transactions" + `/${transactionId}`;
        const response = await axios.get(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Transaction was not fetched properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function UpdateTransaction(values: { id: string; transaction: UpdateTransactionType }) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/transactions/" + values.id;
        const response = await axios.put(endpoint, {
            transaction: values.transaction
        }, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Transaction was not updated properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function DeleteTransaction(id: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/transactions/" + id;
        const response = await axios.delete(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Transaction was not deleted properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}