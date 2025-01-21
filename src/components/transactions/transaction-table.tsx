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
  import { ExpenseResponse } from "@/types/transaction-types";
import UpdateTransaction from "./update-transaction";
import DeleteTransaction from "./delete-transaction";
  
  const TransactionTable = ({ transactions }: { transactions: ExpenseResponse[] }) => {
    return (
      <Table>
        <TableCaption>A list of recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead>Member</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.memberId?.name || "N/A"}</TableCell>
              <TableCell>{transaction.categoryId?.name || "N/A"}</TableCell>
              <TableCell>{transaction.paymentMethod}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>
                <main className="flex flex-row gap-2 items-center">
                    <UpdateTransaction id={transaction._id} key={transaction._id} />
                    <DeleteTransaction key={transaction._id} id={transaction._id}/>
                </main>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              $
              {transactions
                .reduce((sum, transaction) => sum + transaction.amount, 0)
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  };
  
  export default TransactionTable;
  