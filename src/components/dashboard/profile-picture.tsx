import React from "react";
import { Edit, Trash } from "lucide-react"; // Replace with your icon import
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import { AppErr } from "@/utils/app-err";
import { toast } from "@/hooks/use-toast";
import { bucket } from "@/config/appwrite-conf";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const ProfilePicture = ({ userInfo }: {
    userInfo : any
}) => {
    const {uploadProfilePicMutation, deleteProfilePicMutation} = useAuth();
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file); // Handle the file upload logic here
        try {
                const payload = {
                    fileId: userInfo.data.user.profilePic,
                    file
                }
                const response = await uploadProfilePicMutation.mutateAsync(payload);

                if (response?.data) {
                    toast({
                        title : "Success",
                        description : "Image uploaded successfully"
                    });
                };
        } catch (error) {
                AppErr(error);
            }
        }
    };

    const handleButtonClick = () => {
        document.getElementById("file-input")?.click();
    };

    const deleteProfilePic = async () => {
        try {
            const payload = {
                fileId : userInfo.data.user.profilePic ?? ''
            }
            const response = await deleteProfilePicMutation.mutateAsync(payload);

            if (response?.data) {
                toast({
                    title : "Success",
                    description : "Profile picture has been removed"
                });
            };
        } catch (error) {
                AppErr(error);
            }
        }

  return (
    <main className="relative h-12 w-12 md:h-28 md:w-28 lg:h-32 lg:w-32 max-w-[8rem] rounded-full group">
      {/* Profile Picture */}
      <img
        src={
          userInfo.data.user.profilePic === ""
            ? "https://placehold.co/600"
            : bucket.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID as string, userInfo.data.user.profilePic)
        }
        className="h-full w-full rounded-full object-cover"
        alt="Profile"
      />

      {/* Hover Section */}
      <section className="absolute inset-0 h-full w-full hover:opacity-100 opacity-0 hover:bg-slate-500 duration-300 transition-all ease-in-out rounded-full z-10 bg-transparent flex justify-center items-center">
        <Button
          variant="default"
          size="icon"
          onClick={handleButtonClick} // Open file picker when button is clicked
        >
          <Edit />
        </Button>
      </section>

      <section className="absolute top-0 left-0 z-10 hidden md:block">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size={"sm"} variant={"destructive"} onClick={deleteProfilePic}>
                        <Trash />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    remove profile picture
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </section>

      {/* Hidden File Input */}
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </main>
  );
};

export default ProfilePicture;
