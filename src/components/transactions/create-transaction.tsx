import { Button } from "../ui/button";
import { Loader, PlusCircle, Save } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionSchema } from "@/schemas/transaction-schemas";
import { CreateTransactionType } from "@/types/transaction-types";
import { useTransaction } from "@/hooks/use-transaction";
import { toast } from "@/hooks/use-toast";
import { AppErr } from "@/utils/app-err";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useCategory } from "@/hooks/use-category";
import { CategoryProps } from "@/types/category-types";

const CreateTransaction = ({ memberId }: { memberId: string }) => {
  const form = useForm<CreateTransactionType>({
    mode: "onChange",
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      memberId: memberId || "",
      categoryId: "",
      amount: 0,
      type: "Expense",
      paymentMethod: "Card",
      notes: "",
      isRecurring: false,
      recurrenceFrequency: "None",
      status: "Pending",
    },
  });

  const { useCreateTransaction } = useTransaction();
  const createMutation = useCreateTransaction();

  const {useFetchAllCategories} = useCategory();
  const {data: categoryData} = useFetchAllCategories(memberId);

  const [open, setOpen] = useState(false);

  const onSubmit = async (values: CreateTransactionType) => {
    try {
      const payload = {
        ...values,
        amount: Number(values.amount),
      };

      const data = CreateTransactionSchema.parse(payload);
      const response = await createMutation.mutateAsync(data);
      if (response?.data) {
        toast({
          title: "Success",
          description: "Transaction has been created successfully",
        });
        return true;
      }
    } catch (error) {
      AppErr(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"default"} size={"sm"}>
          <PlusCircle className="w-4 h-4 mr-1" />
          Add Transaction
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll scroll-smooth scrollbar-hide">
        <SheetHeader>
          <SheetTitle>Create Transaction</SheetTitle>
          <SheetDescription>
            Add transaction details to track your family expenses.
          </SheetDescription>
        </SheetHeader>

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
                    Create
                  </>
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTransaction;
