import CreateTransaction from "@/components/transactions/create-transaction"
import { useMember } from "@/hooks/use-member";
import { useTransaction } from "@/hooks/use-transaction";
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
import TransactionTable from "@/components/transactions/transaction-table";

const Transactions = () => {
    const { useFetchAllMembers } = useMember();
    const { data: membersData, isPending } = useFetchAllMembers();

    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const { useFetchAllTransactions } = useTransaction();

    // Use `useFetchAllCategories` with `enabled` to avoid conditional hook calls
    const { data: transactionData, isFetching } = useFetchAllTransactions(selectedMember || '');
    const transactions = transactionData?.data?.data;

    console.log(transactions);

  return (
    <main className="p-4">
    <main className="min-h-[10vh] flex flex-wrap flex-row justify-between items-center w-full">
        <main className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Transactions</h1>
            <p className="text-sm text-gray-500">Create and Manage your transactions here</p>
        </main>
         <main className="flex flex-row gap-2">
          {selectedMember && (
            <CreateTransaction memberId={selectedMember} />
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

    {transactions && (
        <TransactionTable key={transactions._id} transactions={transactions} />
      )}
    </main>
  )
}

export default Transactions