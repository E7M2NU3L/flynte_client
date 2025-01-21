import { CreateBudgetType, UpdateBudgetType } from "@/types/budget-types";
import { AppErr } from "@/utils/app-err";
import axios from "axios";

export async function CreateBudget(budget: CreateBudgetType) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/budget";
        const response = await axios.post(endpoint, budget, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Budget was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function FetchAllBudgets(memberId: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/budget" + `?memberId=${memberId}`;
        const response = await axios.get(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to fetch budgets");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function FetchSingleBudget(budgetId: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/budget/" + budgetId;
        const response = await axios.get(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to fetch budget");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function UpdateBudget(values: { id: string; budget: UpdateBudgetType }) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/budget/" + values.id;
        const response = await axios.patch(endpoint, values.budget, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to update budget");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function DeleteBudget(id: string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/budget/" + id;
        const response = await axios.delete(endpoint, {
            withCredentials: true
        });

        if (!response?.data) {
            throw new Error("Failed to delete budget");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}
