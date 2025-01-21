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
  
  import { CategoryProps } from "@/types/category-types";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import UpdateCategory from "./update-category";
import DeleteCategoryDrawer from "./delete-category";
  
  const CategoryTable = ({ categories }: { categories: CategoryProps[] }) => {
    return (
      <Table className="my-6">
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.type}</TableCell>
              <TableCell>{category.description || "N/A"}</TableCell>
              <TableCell>{category.createdBy.name}</TableCell>
              <TableCell className="text-right">
                {new Date(category.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                    <main className="flex flex-row gap-2 items-center">
                        <UpdateCategory id={category._id} />
                        <DeleteCategoryDrawer id={category._id} />
                    </main>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Categories: {categories.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  };
  
  export default CategoryTable;
  