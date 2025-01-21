import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Edit, Loader, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { UpdateAccountType } from '@/types/account-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateAccountSchema } from '@/schemas/account-schemas'
import { AppErr } from '@/utils/app-err'
import { useAccount } from '@/hooks/use-account'
import { useEffect } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast'

const EditAccount = ({id} : {
    id : string,
}) => {
    const form = useForm<UpdateAccountType>({
        mode: "onChange",
        resolver: zodResolver(UpdateAccountSchema),
        defaultValues: {
            name: "",
            balance: 0,
            currency: "INR",
            type : "Bank"
        }
    });

    const {useFetchSingleAccount, useUpdateAccount} = useAccount();
    const {data : singleAccount, isPending : isFetchingSingleAccount} = useFetchSingleAccount(id);

    useEffect(() => {
        if (singleAccount?.data?.data) {
            form.setValue('balance', singleAccount?.data?.data.balance);
            form.setValue('currency', singleAccount?.data?.data?.currency);
            form.setValue('name', singleAccount?.data?.data?.name);
            form.setValue('type', singleAccount?.data?.data?.type)
        }
    }, [singleAccount?.data?.data, form]);

    const updateMutation = useUpdateAccount();

    const onSubmit = async (values : UpdateAccountType) => {
        try {
            console.log(values);
            const payload = {
                id,
                account : {
                    ...values,
                    balance : Number(values.balance),
                }
            };
            const response = await updateMutation.mutateAsync(payload);
            if (response?.data) {
                toast({
                    title: "Success",
                    description: response?.data?.message
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
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    Edit Account
                </SheetTitle>
                <SheetDescription>
                    Make changes to your account and get your workflows flowing..
                </SheetDescription>
            </SheetHeader>

            {isFetchingSingleAccount && (
                <main className='my-6 flex justify-center items-center w-full'>
                    <Loader className='animate-spin h-4 w-4 mr-1' />
                    Loading..
                </main>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Account Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Eg: savings account' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name='type' render={({field}) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Bank">Bank</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Wallet">Wallet</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Choose the type of created account
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )} />

                    <FormField
                        control={form.control}
                        name='balance'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Account Balance
                                </FormLabel>
                                <FormControl>
                                    <Input value={Number(field.value)} onChange={field.onChange} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name='currency' render={({field}) => (
                        <FormItem>
                        <FormLabel>Currency Type</FormLabel>
                            <FormControl>
                                    <Input {...field} type='text' placeholder='Eg: INR, USD etc.,' />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Choose the type of currency stored in the account
                            </FormDescription>
                    </FormItem>
                    )} />

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant={"outline"} size={"sm"}>
                                Cancel
                            </Button>
                        </SheetClose>
                        <Button disabled={form.formState.isSubmitting} variant={"default"} size={"sm"}>
                            {form.formState.isSubmitting ? <>
                                <Save className='mr-1 h-4 w-4 animate-spin' />
                                Saving..
                            </> : <>
                            Update
                            </>}
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    </Sheet>
  )
}

export default EditAccount