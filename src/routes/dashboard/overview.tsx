import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UseOverview } from "@/hooks/use-overview"
import { Loader } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Member } from "@/types/member-types";

const Overview = () => {
  const {overviewStats, isFetchingOverviewStats} = UseOverview();

  const Data = overviewStats?.data;
  const tableData = Data?.timeBasedInsights?.membersThisMonth;
  return (
    <div className="p-4">
      <main className="min-h-[10vh] flex flex-wrap flex-row gap-3 md:gap-0 justify-between items-center w-full">
        <main className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Welcome Back, User</h1>
            <p className="text-sm text-gray-500"> Go through your App's usage</p>
        </main>
      </main>

      {isFetchingOverviewStats && (
        <main className="min-h-[70vh] flex flex-col justify-center items-center w-full h-full">
          <main className="flex flex-row items-center gap-2">
            <Loader className="mr-1 h-4 w-4 animate-spin" />
            <h1 className="text-sm font-medium text-foreground">
              Loading...
            </h1>
          </main>
        </main>
      )}

      {Data && (
        <main className="">
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
              <CardHeader className="relative">
                <CardTitle>
                  {Data?.totalMembers}
                </CardTitle>
                <CardDescription>
                  Total Members
                </CardDescription>
                <Badge variant={"default"} className="absolute top-2 right-2">
                  inc
                </Badge>
              </CardHeader>
              <CardFooter>
                <p className="text-xs font-medium">
                Denotes the number of members added to your family
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="relative">
                <CardTitle>
                  {Data?.totalBalance}
                </CardTitle>
                <CardDescription>
                  Total Balance
                </CardDescription>
                <Badge variant={"destructive"} className="absolute top-2 right-2">
                  dec
                </Badge>
              </CardHeader>
              <CardFooter>
                <p className="text-xs font-medium">
                Denotes the amount of balance from your transactions
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="relative">
                <CardTitle>
                  {Data?.totalTransactions}
                </CardTitle>
                <CardDescription>
                  Total Transactions
                </CardDescription>
                <Badge variant={"destructive"} className="absolute top-2 right-2">
                  dec
                </Badge>
              </CardHeader>
              <CardFooter>
                <p className="text-xs font-medium">
                Denotes the number of transactions added to your account
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="relative">
                <CardTitle>
                  {Data?.totalSpent}
                </CardTitle>
                <CardDescription>
                  Total Spent
                </CardDescription>
                <Badge variant={"outline"} className="absolute top-2 right-2">
                  mid
                </Badge>
              </CardHeader>
              <CardFooter>
                <p className="text-xs font-medium">
                Denotes the amount of money spent from your transactions
                </p>
              </CardFooter>
            </Card>
          </main>

          <Card>
            <CardHeader>
              <CardTitle>
                Members made in this month
              </CardTitle>
              <CardDescription>
                Monthly Descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
      <TableCaption>A list of members added this month.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Joined Date</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.map((member : Member) => (
          <TableRow key={member.email}>
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{new Date(member.joinedDate).toLocaleDateString()}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>{member.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Members</TableCell>
          <TableCell className="text-right">{tableData?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
            </CardContent>
          </Card>
        </main>
      )}
    </div>
  )
}

export default Overview