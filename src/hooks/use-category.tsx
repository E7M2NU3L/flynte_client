import { 
    CreateCategory, 
    FetchAllCategories, 
    FetchSingleCategory, 
    UpdateCategory, 
    DeleteCategory 
} from "@/api/category";
import { CreateCategoryType, UpdateCategoryType } from "@/types/category-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategory = () => {
    const queryClient = useQueryClient();

    // Helper function to refetch category data
    const refetchCategories = () => {
        queryClient.invalidateQueries({
            queryKey: ['fetch-categories']
        });
    };

    // Fetch all categories
    const useFetchAllCategories = (memberId: string) => 
        useQuery({
            queryKey: ['fetch-categories', memberId],
            queryFn: () => FetchAllCategories(memberId),
            staleTime: 5 * 60 * 1000, // 5 minutes,
            enabled: !!memberId,
        });

    // Fetch a single category
    const useFetchSingleCategory = (categoryId: string) => 
        useQuery({
            queryKey: ['fetch-category', categoryId],
            queryFn: () => FetchSingleCategory(categoryId),
            enabled: !!categoryId, // Prevent fetch if categoryId is not provided
            staleTime: 5 * 60 * 1000, // 5 minutes
        });

    // Create a new category
    const useCreateCategory = () =>
        useMutation({
            mutationFn: (category: CreateCategoryType) => CreateCategory(category),
            onSuccess: () => {
                refetchCategories(); // Refetch categories on success
            },
        });

    // Update an existing category
    const useUpdateCategory = () =>
        useMutation({
            mutationFn: (values: { id: string; category: UpdateCategoryType }) => UpdateCategory(values),
            onSuccess: () => {
                refetchCategories(); // Refetch categories on success
            },
        });

    // Delete a category
    const useDeleteCategory = () =>
        useMutation({
            mutationFn: (id: string) => DeleteCategory(id),
            onSuccess: () => {
                refetchCategories(); // Refetch categories on success
            },
        });

    return {
        useFetchAllCategories,
        useFetchSingleCategory,
        useCreateCategory,
        useUpdateCategory,
        useDeleteCategory,
    };
};
