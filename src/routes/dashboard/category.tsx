import CreateCategory from "@/components/category/create-category";
import { useCategory } from "@/hooks/use-category";
import { useMember } from "@/hooks/use-member";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Loader } from "lucide-react";
import CategoryTable from "@/components/category/category-table";

const Category = () => {
    const { useFetchAllMembers } = useMember();
    const { data: membersData, isPending } = useFetchAllMembers();

    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const { useFetchAllCategories } = useCategory();

    // Use `useFetchAllCategories` with `enabled` to avoid conditional hook calls
    const { data: categoryData, isFetching } = useFetchAllCategories(selectedMember || '');
    const categories = categoryData?.data?.data;
  return (
    <div className="p-4">
    <main className="min-h-[10vh] flex flex-wrap flex-row gap-3 md:gap-0 justify-between items-center w-full">
        <main className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Category</h1>
            <p className="text-sm text-gray-500">Manage your categories here</p>
        </main>
        <main className="flex flex-row gap-2">
          {selectedMember && (
            <CreateCategory memberId={selectedMember} />
          )}

          {!isPending && (
            <Select onValueChange={setSelectedMember}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Members</SelectLabel>
                  {membersData?.data?.data?.map((content: any, index: number) => (
                    <SelectItem key={index} value={content._id}>
                      {content.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </main>
      </main>

      {isFetching && (
        <main className="flex flex-col justify-center items-center h-[60vh] w-full">
            <main className="flex flex-row gap-1 items-center">
                <Loader className="h-4 w-4 animate-spin mr-1" />
                Loading...
            </main>
        </main>
      )}

      {categories && (
        <CategoryTable key={categories._id} categories={categories} />
      )}
    </div>
)
}

export default Category