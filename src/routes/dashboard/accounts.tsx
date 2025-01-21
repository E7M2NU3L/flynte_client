import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMember } from "@/hooks/use-member";
import { Member } from "@/types/member-types";
import { useState } from "react";
import AccountCards from "@/components/accounts/account-cards";
import { useAccount } from "@/hooks/use-account";
import CreateAccountDialog from "@/components/accounts/create-account";

const Accounts = () => {
  const { useFetchAllMembers } = useMember();
  const { data: membersData, isPending } = useFetchAllMembers();

  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const { useFetchAllAccounts } = useAccount();

  // Use `useFetchAllAccounts` with `enabled` to avoid conditional hook calls
  const { data: accountsData, isFetching } = useFetchAllAccounts(selectedMember || '');

  return (
    <div className="p-4">
      <main className="min-h-[10vh] flex flex-wrap gap-3 md:gap-0 flex-row justify-between items-center w-full">
        <main className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Accounts</h1>
          <p className="text-sm text-gray-500">Manage your accounts here</p>
        </main>
        <main className="flex flex-row gap-2">
          {selectedMember && (
            <CreateAccountDialog memberId={selectedMember} />
          )}

          {!isPending && (
            <Select onValueChange={setSelectedMember}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Members</SelectLabel>
                  {membersData?.data?.data?.map((content: Member, index: number) => (
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

      {selectedMember && (
        <main className="grid grid-cols-1 my-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isFetching ? (
            <main className="flex flex-col justify-center items-center w-full h-[70vh]">
                <main className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <h1 className="text-lg font-medium text-foreground">Loading Accounts...</h1>
                </main>
            </main>
          ) : (
            accountsData?.data?.data?.map((account: any) => <AccountCards key={account.id} account={account} />)
          )}
        </main>
      )}
    </div>
  );
};

export default Accounts;
