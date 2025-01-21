import { 
    CreateAccount, 
    FetchAllAccounts, 
    FetchSingleAccount, 
    UpdateAccount, 
    DeleteAccount 
} from "@/api/account";
import { CreateAccountType, UpdateAccountType } from "@/types/account-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAccount = () => {
    const queryClient = useQueryClient();

    // Helper function to refetch account data
    const refetchAccounts = () => {
        queryClient.invalidateQueries({
            queryKey: ['fetch-accounts']
        });
    };

    // Fetch all accounts
    const useFetchAllAccounts = (memberId: string) => 
        useQuery({
            queryKey: ['fetch-accounts', memberId],
            queryFn: () => FetchAllAccounts(memberId),
            enabled: !!memberId,
            staleTime: 5 * 60 * 1000, // 5 minutes
        });

    // Fetch a single account
    const useFetchSingleAccount = (accountId: string) => 
        useQuery({
            queryKey: ['fetch-account', accountId],
            queryFn: () => FetchSingleAccount(accountId),
            enabled: !!accountId,
            staleTime: 5 * 60 * 1000,
        });

    // Create a new account
    const useCreateAccount = () =>
        useMutation({
            mutationFn: (account: CreateAccountType) => CreateAccount(account),
            onSuccess: () => {
                refetchAccounts();
            },
        });

    // Update an existing account
    const useUpdateAccount = () =>
        useMutation({
            mutationFn: (values: { id: string; account: UpdateAccountType }) => UpdateAccount(values),
            onSuccess: () => {
                refetchAccounts();
            },
        });

    // Delete an account
    const useDeleteAccount = () =>
        useMutation({
            mutationFn: (id: string) => DeleteAccount(id),
            onSuccess: () => {
                refetchAccounts();
            },
        });

    return {
        useFetchAllAccounts,
        useFetchSingleAccount,
        useCreateAccount,
        useUpdateAccount,
        useDeleteAccount,
    };
}; 