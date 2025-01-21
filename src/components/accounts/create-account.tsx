import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button'
import { Loader, PlusCircle, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { CreateAccountType } from '@/types/account-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateAccountSchema } from '@/schemas/account-schemas'
import { AppErr } from '@/utils/app-err'
import { useAccount } from '@/hooks/use-account'
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

const CreateAccountDialog = ({memberId} : {
    memberId : string,
}) => {
    const form = useForm<CreateAccountType>({
        mode: "onChange",
        resolver: zodResolver(CreateAccountSchema),
        defaultValues: {
            name: "",
            balance: 0,
            currency: "INR",
            type : "Bank",
            memberId: memberId || "",
        }
    });

    const {useCreateAccount} = useAccount();
    const createMutation = useCreateAccount();
    
    const onSubmit = async (values : CreateAccountType) => {
        try {
            console.log(values);
            const payload = {
                ...values,
                balance: Number(values.balance)
            }
            const response = await createMutation.mutateAsync(payload);
            if (response?.data) {
                toast({
                    title: "Success",
                    description: "Account has been created successfully"
                });
                return true;
            }
        } catch (error) {
            AppErr(error);
        }
    };
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={"default"} size={"sm"}>
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Account
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Create Account
                </DialogTitle>
                <DialogDescription>
                    Create your account and get your workflows flowing..
                </DialogDescription>
            </DialogHeader>

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

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"} size={"sm"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={form.formState.isSubmitting} variant={"default"} size={"sm"}>
                            {form.formState.isSubmitting ? <>
                                <Loader className='mr-1 h-4 w-4 animate-spin' />
                                Saving..
                            </> : <>
                            <Save className='h-4 w-4 mr-1' />
                            Create
                            </>}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateAccountDialog