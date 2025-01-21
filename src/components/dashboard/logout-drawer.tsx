import { useState } from "react"
import { Button } from "../ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { Loader } from "lucide-react";
import { AppErr } from "@/utils/app-err";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth-slice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

const LogoutDrawer = ({children} : {children : React.ReactNode}) => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {Logout :  LogoutMutation} = useAuth();

    async function handleLogout () {
        try {
            setisLoading(true);
            const response = await LogoutMutation.mutateAsync();
            if (response?.data) {
                toast({
                    title : "Success",
                    description : response?.data.message
                })
                dispatch(logout());
                navigate('/');
            }
        } catch (error) {
            AppErr(error);
        } finally {
            setisLoading(false);
            setOpen(false);
        }
    }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            {children}
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>
                    Logout Confirmation
                </DrawerTitle>
                <DrawerDescription>
                    Are you sure you want to logout?
                </DrawerDescription>
                <DrawerFooter className="flex flex-row items-center justify-end gap-4">
                    <DrawerClose asChild>
                        <Button variant={"outline"} size={"sm"}>Cancel</Button>
                    </DrawerClose>
                    <Button disabled={isLoading} onClick={handleLogout} variant={"destructive"} size={"sm"}>
                        {isLoading ? <>
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                            Logging out
                        </> : <>Logout</>}
                    </Button>
                </DrawerFooter>
            </DrawerHeader>
        </DrawerContent>
    </Drawer>
  )
}

export default LogoutDrawer