import { 
    CreateBudget, 
    FetchAllBudgets, 
    FetchSingleBudget, 
    UpdateBudget, 
    DeleteBudget 
} from "@/api/budgets";
import { CreateBudgetType, UpdateBudgetType } from "@/types/budget-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBudget = () => {
    const queryClient = useQueryClient();

    // Helper function to refetch budget data
    const refetchBudgets = () => {
        queryClient.invalidateQueries({
            queryKey: ['fetch-budgets']
        });
    };

    // Fetch all budgets
    const useFetchAllBudgets = (memberId: string) => 
        useQuery({
            queryKey: ['fetch-budgets', memberId],
            queryFn: () => FetchAllBudgets(memberId),
            staleTime: 5 * 60 * 1000,
        });

    // Fetch a single budget
    const useFetchSingleBudget = (budgetId: string) => 
        useQuery({
            queryKey: ['fetch-budget', budgetId],
            queryFn: () => FetchSingleBudget(budgetId),
            enabled: !!budgetId,
            staleTime: 5 * 60 * 1000,
        });

    // Create a new budget
    const useCreateBudget = () =>
        useMutation({
            mutationFn: (budget: CreateBudgetType) => CreateBudget(budget),
            onSuccess: () => {
                refetchBudgets();
            },
        });

    // Update an existing budget
    const useUpdateBudget = () =>
        useMutation({
            mutationFn: (values: { id: string; budget: UpdateBudgetType }) => UpdateBudget(values),
            onSuccess: () => {
                refetchBudgets();
            },
        });

    // Delete a budget
    const useDeleteBudget = () =>
        useMutation({
            mutationFn: (id: string) => DeleteBudget(id),
            onSuccess: () => {
                refetchBudgets();
            },
        });

    return {
        useFetchAllBudgets,
        useFetchSingleBudget,
        useCreateBudget,
        useUpdateBudget,
        useDeleteBudget,
    };
}; 