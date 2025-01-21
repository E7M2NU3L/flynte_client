import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "../ui/button";
  import { Loader, PlusCircle, Save } from "lucide-react";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { CreateCategorySchema } from "@/schemas/category-schemas";
  import { AppErr } from "@/utils/app-err";
  import { useCategory } from "@/hooks/use-category";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form";
  import { Input } from "../ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { toast } from "@/hooks/use-toast";
  import { CreateCategoryType } from "@/types/category-types";
  
  const CreateCategory = ({ memberId }: { memberId: string }) => {
    const form = useForm<CreateCategoryType>({
      mode: "onChange",
      resolver: zodResolver(CreateCategorySchema),
      defaultValues: {
        name: "",
        type: "Income",
        description: "",
        parentCategory: "",
        createdBy: memberId || "",
        isDefault: false,
      },
    });
  
    const { useCreateCategory } = useCategory();
    const createMutation = useCreateCategory();
  
    const onSubmit = async (values: CreateCategoryType) => {
      try {
        console.log(values);
        const response = await createMutation.mutateAsync(values);
        if (response?.data) {
          toast({
            title: "Success",
            description: "Category has been created successfully.",
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
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Create your category and organize your finances.
            </DialogDescription>
          </DialogHeader>
  
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Eg: Food, Rent, Salary" />
                    </FormControl>
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
                    <FormLabel>Category Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Income">Income</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose whether this is an Income or Expense category.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Optional description of the category" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Parent Category Field */}
              <FormField
                control={form.control}
                name="parentCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Parent category (if applicable)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Is Default Field */}
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormLabel>Set as Default</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"outline"} size={"sm"}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={form.formState.isSubmitting}
                  variant={"default"}
                  size={"sm"}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader className="mr-1 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" />
                      Create
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CreateCategory;
  