import { toast } from "@/hooks/use-toast";

export function AppErr(error : any) {
    if (error instanceof Error) {
        toast({
            title : error.name,
            description : error.message,
            variant : "destructive"
        });
    }
    else {
        toast({
            title : "Failed",
            description : "Something went wrong, try again",
            variant : "destructive"
        })
    };
};

export function AppErrServer(error : any) {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    else {
        throw new Error("Unknown error occured");
    }
}