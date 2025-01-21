import { 
    CreateTransaction, 
    FetchAllTransactions, 
    FetchSingleTransaction, 
    UpdateTransaction, 
    DeleteTransaction 
} from "@/api/transactions";
import { CreateTransactionType, UpdateTransactionType } from "@/types/transaction-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTransaction = () => {
    const queryClient = useQueryClient();

    // Helper function to refetch transaction data
    const refetchTransactions = () => {
        queryClient.invalidateQueries({
            queryKey: ['fetch-transactions']
        });
    };

    // Fetch all transactions
    const useFetchAllTransactions = (memberId: string) => 
        useQuery({
            queryKey: ['fetch-transactions', memberId],
            queryFn: () => FetchAllTransactions(memberId),
            staleTime: 5 * 60 * 1000,
            enabled: !!memberId,
        });

    // Fetch a single transaction
    const useFetchSingleTransaction = (transactionId: string) => 
        useQuery({
            queryKey: ['fetch-transaction', transactionId],
            queryFn: () => FetchSingleTransaction(transactionId),
            enabled: !!transactionId,
            staleTime: 5 * 60 * 1000,
        });

    // Create a new transaction
    const useCreateTransaction = () =>
        useMutation({
            mutationFn: (transaction: CreateTransactionType) => CreateTransaction(transaction),
            onSuccess: () => {
                refetchTransactions();
            },
        });

    // Update an existing transaction
    const useUpdateTransaction = () =>
        useMutation({
            mutationFn: (values: { id: string; transaction: UpdateTransactionType }) => UpdateTransaction(values),
            onSuccess: () => {
                refetchTransactions();
            },
        });

    // Delete a transaction
    const useDeleteTransaction = () =>
        useMutation({
            mutationFn: (id: string) => DeleteTransaction(id),
            onSuccess: () => {
                refetchTransactions();
            },
        });

    return {
        useFetchAllTransactions,
        useFetchSingleTransaction,
        useCreateTransaction,
        useUpdateTransaction,
        useDeleteTransaction,
    };
}; 