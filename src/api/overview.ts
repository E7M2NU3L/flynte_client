import { AppErr } from "@/utils/app-err";
import axios from "axios";

export async function FetchOverviewStatsData() {
    try {
        const endpoint = import.meta.env.VITE_PUBLIC_API_ENDPOINT + "/api/v1/overview/";
        const response = await axios.get(endpoint, {
            withCredentials : true
        });

        console.log(response.data);
        return response.data
    } catch (error) {
        AppErr(error);
    }
}