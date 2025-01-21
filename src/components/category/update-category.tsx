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
import { UpdateCategoryType } from '@/types/category-types'
import { UpdateCategorySchema } from '@/schemas/category-schemas'
import { useCategory } from '@/hooks/use-category'
import { Textarea } from '../ui/textarea'

const UpdateCategory = ({id} : {
    id : string,
}) => {
    const form = useForm<UpdateCategoryType>({
        mode: "onChange",
        resolver: zodResolver(UpdateCategorySchema),
        defaultValues: {
            name: "",
            description: "",
            type : "Income"
        }
    });

    const {useFetchSingleCategory, useUpdateCategory} = useCategory();
    const {data : singleAccount, isPending : isFetchingSingleAccount} = useFetchSingleCategory(id);

    useEffect(() => {
        if (singleAccount?.data?.data) {
            form.setValue('description', singleAccount?.data?.data?.description);
            form.setValue('name', singleAccount?.data?.data?.name);
            form.setValue('type', singleAccount?.data?.data?.type)
        }
    }, [singleAccount?.data?.data, form]);

    const updateMutation = useUpdateCategory();

    const onSubmit = async (values : UpdateCategoryType) => {
        try {
            console.log(values);
            const payload = {
                id,
                category : values
            };
            const response = await updateMutation.mutateAsync(payload);
            if (response?.data) {
                toast({
                    title: "Success",
                    description: "Categories have been updated"
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
                    Edit Category
                </SheetTitle>
                <SheetDescription>
                    Make changes to your categories and get your workflows flowing..
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
                                    Category
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Eg: Turf Expenses' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name='type' render={({field}) => (
                        <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type for the category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Income">Income</SelectItem>
                            <SelectItem value="Expenses">Expenses</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Choose the type of Category Usage
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )} />

                    <FormField
                        control={form.control}
                        name='description'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Account Balance
                                </FormLabel>
                                <FormControl>
                                    <Textarea value={field.value} onChange={field.onChange} placeholder='add some value to your category...' />
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

export default UpdateCategory