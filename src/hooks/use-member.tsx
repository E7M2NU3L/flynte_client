import { 
    CreateMember, 
    FetchAllMembers, 
    FetchSingleMember, 
    UpdateMember, 
    DeleteMember 
} from "@/api/member";
import { CreateMemberType, UpdateMemberType } from "@/types/member-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMember = () => {
    const queryClient = useQueryClient();

    const refetchMembers = () => {
        queryClient.invalidateQueries({
            queryKey: ['fetch-members']
        });
    };

    const useFetchAllMembers = () => 
        useQuery({
            queryKey: ['fetch-members'],
            queryFn: FetchAllMembers,
            staleTime: 5 * 60 * 1000,
        });

    const useFetchSingleMember = (memberId: string) => 
        useQuery({
            queryKey: ['fetch-member', memberId],
            queryFn: () => FetchSingleMember(memberId),
            enabled: !!memberId,
            staleTime: 5 * 60 * 1000,
        });

    const useCreateMember = () =>
        useMutation({
            mutationFn: (member: CreateMemberType) => CreateMember(member),
            onSuccess: refetchMembers,
        });

    const useUpdateMember = () =>
        useMutation({
            mutationFn: (values: { id: string; member: UpdateMemberType }) => UpdateMember(values),
            onSuccess: refetchMembers,
        });

    const useDeleteMember = () =>
        useMutation({
            mutationFn: (id: string) => DeleteMember(id),
            onSuccess: refetchMembers,
        });

    return {
        useFetchAllMembers,
        useFetchSingleMember,
        useCreateMember,
        useUpdateMember,
        useDeleteMember,
    };
};
