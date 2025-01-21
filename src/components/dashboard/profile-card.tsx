import { CirclePower, Edit, Loader, Loader2, RefreshCcwDot, ShieldCheck, User, X } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogDescription, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Link, useNavigate } from "react-router-dom"
import { AppErr } from "@/utils/app-err"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { toast } from "@/hooks/use-toast"
import { Separator } from "../ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileSchema } from "@/schemas/users"
import { UpdateProfileTypes } from "@/types/users"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import ProfilePicture from "./profile-picture"

const ProfileCard = () => {
    const navigate = useNavigate();
    const authInfo = useSelector((state : RootState) => state.auth);

    const [editable, isEditable] = useState<boolean>(false);

    const {VerifyUser, isLoading, userInfo, UpdateProfile} = useAuth();
    async function verifyUserStart() {
        try {
            const response = await VerifyUser.mutateAsync();
            if (response?.data) {
                toast({
                    title : "Success",
                    description : `otp has been sent to ${authInfo.userData.email ?? 'your email address'}`,
                });

                navigate('/verify-user');
            }
        } catch (error) {
            AppErr(error);
        }
    };

    console.log(userInfo);

    const form = useForm<UpdateProfileTypes>({
        resolver : zodResolver(updateProfileSchema),
        defaultValues : {
            lastname : userInfo?.data.user.lastname,
            firstname : userInfo?.data.user.firstname,
            phoneNumber : userInfo?.data.user.phoneNumber,
            Bio : userInfo?.data.user.Bio
        }
    });

    const onSubmit = async (values : UpdateProfileTypes) => {
        try {
            console.log(values);
            const response = await UpdateProfile.mutateAsync(values);

            if (response?.data) {
                toast({
                    title : "Success",
                    description : "User profile has been updated",
                    variant :"default"
                });
                isEditable(!editable);
            }
        } catch (error) {
            AppErr(error);
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={"default"} size={"icon"}>
                <User />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Profile
                </DialogTitle>
                <DialogDescription>
                    View your user profile, keep your account secure by verifying your account
                </DialogDescription>
                
                {isLoading && (<>
                    <Loader2 className="h-4 w-4 animate-spin"/>
                </>)}

                {(userInfo && !editable) && (
                    <section className="py-6 flex flex-row md:gap-4 gap-1">
                    <ProfilePicture userInfo={userInfo} />
                    <Separator orientation="vertical" />
                    <main className="flex flex-col gap-2 justify-start text-start max-w-[18rem] md:w-[30vh]">
                        <h1 className="text-xl md:text-3xl font-semibold tracking-tight text-foreground">
                            {userInfo.data.user.firstname} {userInfo.data.user.lastname}
                        </h1>
                        <p className="text-sm md:text-lg font-medium tracking-tight leading-tight">
                            {userInfo.data.user.email}
                        </p>
                        <p className="text-sm md:text-lg font-medium tracking-tight leading-tight">
                            {userInfo.data.user?.phoneNumber ? <>{
                                userInfo.data.user?.phoneNumber
                             }</> : "phone number not added"}
                        </p>
                        <p className="text-xs md:text-sm font-medium tracking-tight leading-tight">
                            {userInfo.data.user?.Bio ? <>{
                                userInfo.data.user?.Bio
                             }</> : "Bio not added"}
                        </p>
                    </main>
                </section>
                )}

                {(userInfo && editable) && (
                    <Form {...form}>
                        <form className="flex flex-col gap-4 pb-4 justify-start text-start" onSubmit={form.handleSubmit(onSubmit)}>
                            <section className="grid grid-cols-1 gap-4 md:grid-cols-1">
                                <FormField control={form.control} name="firstname" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Firstname
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="john" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="lastname" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Lastname
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="doe" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </section>

                            <FormField control={form.control} name="phoneNumber" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Phone Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="00000000" />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription>
                                            Additional Info to secure your profile
                                        </FormDescription>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="Bio" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Bio
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="type something..." />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription>
                                            Additional Info
                                        </FormDescription>
                                    </FormItem>
                                )} />
                            
                            <Button type="submit" size={"sm"}>
                                {form.formState.isSubmitting ? <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    Updating
                                </> : "Submit"}
                            </Button>
                        </form>
                </Form>
                )}

                <DialogFooter className="flex flex-row justify-end items-center gap-3">
                        <Button variant={editable ? "outline" : "default"} size={"sm"} onClick={() => isEditable(!editable)}>
                            {editable ? <X /> : <Edit />}
                        </Button>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to={"/delete-user"}>
                                    <Button variant={"destructive"} size={"sm"}>
                                        <CirclePower className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                Delete Account
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"outline"} size={"sm"} onClick={verifyUserStart} disabled={userInfo?.data.user.isVerified}>
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    MFA
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Verify User
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to={"/send-otp"}>
                                    <Button variant={"outline"} size={"sm"}>
                                        <RefreshCcwDot className="mr-2 h-4 w-4" />
                                        Reset Password
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                Reset your password
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DialogFooter>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default ProfileCard