import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Edit, Loader, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppErr } from '@/utils/app-err'
import { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast'
import { Textarea } from '../ui/textarea'
import { useTransaction } from '@/hooks/use-transaction'
import { UpdateTransactionType } from '@/types/transaction-types'
import { UpdateTransactionSchema } from '@/schemas/transaction-schemas'
import { CategoryProps } from '@/types/category-types'
import { useCategory } from '@/hooks/use-category'

const UpdateTransaction = ({id } : {
    id : string,
}) => {
    const form = useForm<UpdateTransactionType>({
        mode: "onChange",
        resolver: zodResolver(UpdateTransactionSchema),
        defaultValues: {
            categoryId: "",
            amount: 0,
            type: "Expense",
            paymentMethod: "Card",
            notes: "",
            isRecurring: false,
            recurrenceFrequency: "None",
            status: "Pending",
        }
    });

    const {useFetchSingleTransaction, useUpdateTransaction} = useTransaction();
    const {data : transactions, isPending : isFetchingSingleTransactions} = useFetchSingleTransaction(id);

    useEffect(() => {
        if (transactions?.data?.data) {
          const transactionData = transactions?.data?.data;
      
          form.setValue("categoryId", transactionData?.categoryId || "");
          form.setValue("amount", transactionData?.amount || 0);
          form.setValue("type", transactionData?.type || "Expense");
          form.setValue("paymentMethod", transactionData?.paymentMethod || "Card");
          form.setValue("notes", transactionData?.notes || "");
          form.setValue("isRecurring", transactionData?.isRecurring || false);
          form.setValue("recurrenceFrequency", transactionData?.recurrenceFrequency || "None");
          form.setValue("status", transactionData?.status || "Pending");
        }
      }, [transactions?.data?.data, form]);
      
      const {useFetchAllCategories} = useCategory();
      const {data: categoryData} = useFetchAllCategories(transactions?.data?.data?.memberId?._id);

    const updateMutation = useUpdateTransaction();

    const onSubmit = async (values : UpdateTransactionType) => {
        try {
            console.log(values);
            const payload = {
                id,
                members : {
                    ...values,
                    amount : Number(values.amount),
                }
            };

            const response = await updateMutation.mutateAsync({
                id, 
                transaction: payload.members
            });
            if (response?.data) {
                toast({
                    title: "Success",
                    description: "Transaction has been updated successfully"
                });
                return true;
            }
        } catch (error) {
            AppErr(error);
        }
    };
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant={"default"} size={"sm"}>
                <Edit />
            </Button>
        </SheetTrigger>
        <SheetContent className='overflow-y-scroll scroll-smooth scrollbar-hide'>
            <SheetHeader>
                <SheetTitle>
                    Edit Transaction
                </SheetTitle>
                <SheetDescription>
                    Make changes to your Transaction and get your workflows flowing..
                </SheetDescription>
            </SheetHeader>

            {isFetchingSingleTransactions && (
                <main className='my-6 flex justify-center items-center w-full'>
                    <Loader className='animate-spin h-4 w-4 mr-1' />
                    Loading..
                </main>
            )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-6">
            {/* Amount Field */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter amount" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Field */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <>
                        {categoryData && categoryData?.data?.data?.map((cat : CategoryProps, index : number) => (
                            <SelectItem value={cat._id} key={index}>{cat.name}</SelectItem>
                        ))}
                      </>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type Field */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Expense">Expense</SelectItem>
                      <SelectItem value="Income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Method Field */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Card">Card</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes Field */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <SheetClose asChild>
                <Button variant={"outline"} size={"sm"}>
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={form.formState.isSubmitting} variant={"default"} size={"sm"}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader className="mr-1 h-4 w-4 animate-spin" />
                    Saving..
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    Update
                  </>
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
        </SheetContent>
    </Sheet>
  )
}

export default UpdateTransaction;