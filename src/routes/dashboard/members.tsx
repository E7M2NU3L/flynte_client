import CreateMember from "@/components/members/create-member"
import MemberCard from "@/components/members/member-card";
import { useMember } from "@/hooks/use-member"
import { Loader2 } from "lucide-react";

const Members = () => {
    const {useFetchAllMembers} = useMember();
    const {data, isPending : isFetchingMembers} = useFetchAllMembers();
    console.log(data);
  return (
    <div className="p-4">
        <main className="min-h-[10vh] flex flex-wrap flex-row justify-between items-center w-full">
            <main className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold text-foreground tracking-tight">Members</h1>
                <p className="text-sm text-gray-500">Manage your members here</p>
            </main>
            <main className="flex flex-row gap-1">
               <CreateMember />
            </main>
        </main>

        {isFetchingMembers && (
            <main className="flex flex-col justify-center items-center w-full h-[50vh]">
                <main className="flex flex-row gap-2 items-center">
                    <Loader2 className="mr-1 w-4 h-4 animate-spin" />
                    <p className="text-sm font-medium text-foreground">
                        Loading...
                    </p>
                </main>
            </main>
        )}

        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data && data.data?.data?.map((content : any, index : number) => (
           <MemberCard content={content} key={index} /> 
        ))}
        </main>
    </div>
  )
}

export default Members