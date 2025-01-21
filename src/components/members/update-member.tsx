import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Edit, Loader, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppErr } from '@/utils/app-err'
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
import { UpdateMemberType } from '@/types/member-types'
import { UpdateMemberSchema } from '@/schemas/member-schemas'
import { useMember } from '@/hooks/use-member'
import { Textarea } from '../ui/textarea'

const UpdateMember = ({id } : {
    id : string,
}) => {
    const form = useForm<UpdateMemberType>({
        mode: "onChange",
        resolver: zodResolver(UpdateMemberSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            role : "Parent",
            gender: "unkown",
            dateOfBirth: "",
            isPrimary : false,
            income: 0,
            notes: "",
            status: "Active"
        }
    });

    const {useFetchSingleMember, useUpdateMember} = useMember();
    const {data : members, isPending : isFetchingSingleMember} = useFetchSingleMember(id);

    useEffect(() => {
        if (members?.data?.data) {
            const memberData = members?.data?.data;
    
            form.setValue('name', memberData?.name || '');
            form.setValue('email', memberData?.email || '');
            form.setValue('phone', memberData?.phone || '');
            form.setValue('role', memberData?.role || 'Parent'); // Default to 'Parent'
            form.setValue('profileImage', memberData?.profileImage || '');
            form.setValue('gender', memberData?.gender || 'unknown'); // Default to 'unknown'
            form.setValue('dateOfBirth', memberData?.dateOfBirth || '');
            form.setValue('isPrimary', memberData?.isPrimary || false); // Default to false
            form.setValue('income', memberData?.income || null); // Default to null
            form.setValue('joinedDate', memberData?.joinedDate || new Date().toISOString()); // Default to current date
            form.setValue('status', memberData?.status || 'Active'); // Default to 'Active'
            form.setValue('notes', memberData?.notes || '');
        }
    }, [members?.data?.data, form]);
    

    const updateMutation = useUpdateMember();

    const onSubmit = async (values : UpdateMemberType) => {
        try {
            console.log(values);
            const payload = {
                id,
                members : {
                    ...values,
                    income : Number(values.income),
                }
            };

            const response = await updateMutation.mutateAsync({
                id, 
                member: payload.members
            });
            if (response?.data) {
                toast({
                    title: "Success",
                    description: "Member has been updated successfully"
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
                    Edit Account
                </SheetTitle>
                <SheetDescription>
                    Make changes to your account and get your workflows flowing..
                </SheetDescription>
            </SheetHeader>

            {isFetchingSingleMember && (
                <main className='my-6 flex justify-center items-center w-full'>
                    <Loader className='animate-spin h-4 w-4 mr-1' />
                    Loading..
                </main>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 my-6'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Member Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Eg: Peter Griffin' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name='role' render={({field}) => (
                        <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your role in family" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Parent">Parent</SelectItem>
                            <SelectItem value="Child">Child</SelectItem>
                            <SelectItem value="Guardian">Guardian</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            This denotes your access and control
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )} />

                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} type='email' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name='phone' render={({field}) => (
                        <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                    <Input {...field} type='text' placeholder='9000000000' />
                            </FormControl>
                            <FormMessage />
                    </FormItem>
                    )} />

                    <FormField control={form.control} name='gender' render={({field}) => (
                        <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Non-binary">Non-binary</SelectItem>
                            <SelectItem value="unknown">unknown</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )} />

                    <FormField control={form.control} name='dateOfBirth' render={({field}) => (
                        <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                    <Input {...field} type='date' />
                            </FormControl>
                            <FormMessage />
                    </FormItem>
                    )} />

                    <FormField control={form.control} name='income' render={({field}) => (
                        <FormItem>
                        <FormLabel>Income</FormLabel>
                            <FormControl>
                                    <Input {...field} type='number' />
                            </FormControl>
                            <FormMessage />
                    </FormItem>
                    )} />

                    <FormField control={form.control} name='isPrimary' render={({field}) => (
                        <FormItem>
                        <FormLabel>Primary Account?</FormLabel>
                        <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value ? 'true' : 'false'}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value={'true'}>Yes</SelectItem>
                            <SelectItem value={'false'}>No</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Are you the primary source of income?
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )} />

                    <FormField control={form.control} name='notes' render={({field}) => (
                        <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                            <Textarea placeholder="type something important.." {...field} />
                        </FormControl>
                        <FormMessage />
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
                                <Loader className='mr-1 h-4 w-4 animate-spin' />
                                Saving..
                            </> : <>
                            <Save className='h-4 w-4 mr-1' />
                            Create
                            </>}
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    </Sheet>
  )
}

export default UpdateMember