import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button'
import { Loader, Trash, Trash2 } from 'lucide-react'
import { AppErr } from '@/utils/app-err'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { useMember } from '@/hooks/use-member';

const DeleteMember = ({id} : {
    id : string
}) => {
    const {useDeleteMember} = useMember();
    const deleteMutation = useDeleteMember();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const onClick = async () => {
        try {
            setLoading(true);
            if (id) {
                const response = await deleteMutation.mutateAsync(id);
                if (response?.data?.message) {
                    toast({
                        title: "Success",
                        description: "Account has been deleted"
                    });
                    return true;
                }
            }

            
            toast({
              title: "Pending",
              description: "Kindly refresh and try again"      
            });
        } catch (error) {
            AppErr(error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <Button variant={"destructive"} size={"sm"}>
                <Trash2 />
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>
                    Delete Member?
                </DrawerTitle>
                <DrawerDescription>
                    Are you sure you want to delete the Member?
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className='flex flex-row justify-end w-full items-center'>
                <DrawerClose asChild>
                    <Button size={"sm"} variant={"outline"}>
                        Cancel
                    </Button>
                </DrawerClose>
                <Button onClick={onClick} disabled={loading} variant={"destructive"} size={"sm"}>
                    {loading ? (
                        <>
                        <Loader className='mr-1 h-4 w-4 animate-spin' />
                        Deleting...
                        </>
                    ) : (
                        <>
                        <Trash className='h-4 w-4 mr-1' />
                        Delete
                        </>
                    )}
                </Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
  )
}

export default DeleteMember