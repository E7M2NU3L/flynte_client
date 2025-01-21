import { CreateCategoryType, UpdateCategoryType } from "@/types/category-types";
import { AppErr } from "@/utils/app-err";
import axios from "axios";

export async function CreateCategory(category : CreateCategoryType) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/category";
        const response = await axios.post(endpoint, category , {
            withCredentials : true
        });

        if (!response?.data) {
            throw new Error("Category was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
};

export async function FetchAllCategories(memberId : string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/category" + `?memberId=${memberId}`;

        const response = await axios.get(endpoint,{
            withCredentials : true
        });

        if (!response?.data) {
            throw new Error("Category was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
};

export async function FetchSingleCategory(categoryId : string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/category" + `/${categoryId}`;

        const response = await axios.get(endpoint,{
            withCredentials : true
        });

        if (!response?.data) {
            throw new Error("Category was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
}

export async function UpdateCategory(values : {
    id : string,
    category: UpdateCategoryType
}) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/category/" + values.id;
        const response = await axios.put(endpoint, {
            category : values.category
        },
        {
            withCredentials : true
        });

        if (!response?.data) {
            throw new Error("Category was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
};

export async function DeleteCategory(id : string) {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/category/" +id;
        const response = await axios.delete(endpoint, {
            withCredentials : true
        });

        if (!response?.data) {
            throw new Error("Category was not created properly");
        }

        return response;
    } catch (error) {
        AppErr(error);
    }
};

