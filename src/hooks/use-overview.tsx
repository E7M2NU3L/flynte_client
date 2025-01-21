import { FetchOverviewStatsData } from "@/api/overview"
import { useQuery } from "@tanstack/react-query"

export const UseOverview = () => {
    const {data : overviewStats, isPending : isFetchingOverviewStats} = useQuery({
        queryFn : FetchOverviewStatsData,
        queryKey : ['overview']
    });

    return {
        overviewStats,
        isFetchingOverviewStats,
    };
};