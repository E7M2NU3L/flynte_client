import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AppErr } from "@/utils/app-err";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {motion} from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteUserTypes } from "@/types/users";
import { DeleteUserSchema } from "@/schemas/users";
import { useAuth } from "@/hooks/use-auth";

const DeleteUser = () => {
    const {DeleteAccount} = useAuth();
    const form = useForm<DeleteUserTypes>({
        resolver : zodResolver(DeleteUserSchema),
        defaultValues : {
          confirm : "",
          datadeletion : false,
          agree : false
        }
      });
    
      const navigate = useNavigate();
    
      async function handleDeleteAccount(values : DeleteUserTypes) {
        try {
          console.log(values);
          const response = await DeleteAccount.mutateAsync(values);
          if (response?.data)
          {toast({
            title : "Success",
            description : "your account has been deleted successfully"
          });

          navigate('/');}
        } catch (error) {
          AppErr(error);
        }
      };
    
  return (
    <div className="min-h-[90vh] flex justify-center py-6 md:py-4 px-4 md:px-0 items-center w-full">
        <motion.div
        initial = {{
          opacity : 0,
          scale : 0.9,
          y : 50
        }}
        whileInView={{
          opacity : 1,
          scale : 1,
          y : 0
        }}
      >
      <Card className="border border-primary">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Delete User <span className="text-primary">Account</span>
          </CardTitle>
          <CardDescription className="">
            have you changed your mind - <Button variant={"link"} size={"sm"} asChild><Link to={"/overview"}>click here</Link></Button>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleDeleteAccount)}>
              <FormField control={form.control} name="confirm" render={({field}) => (
                <FormItem>
                  <FormLabel>
                    confirmation
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="type confirm" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField control={form.control} name="datadeletion" render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormDescription>by clicking this you agree that your user data will be completely deleted</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField control={form.control} name="agree" render={({field}) => (
                <FormItem>
                  <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormDescription>by clicking this you agree that you agree to the terms of service and pricing policies</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <main className="flex flex-col gap-1">
              <Button  variant={"default"} size={"sm"} className="w-full">
                {form.formState.isSubmitting ? <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Deleting Account
                </> : <>Delete Account</>}
              </Button>
              <Button asChild className="flex justify-end w-fit" variant={"link"} size={"sm"}>
                  <Link to={"/register"}>
                    don't have an account - Register
                  </Link>
              </Button>
              </main>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-row justify-between items-center">
          <Button variant={"link"} asChild size={"sm"}>
            <Link to={"/privacy-policy"}>
              privacy policy
            </Link>
          </Button>
          <Button variant={"link"} asChild size={"sm"}>
            <Link to={"/terms-of-service"}>
              terms & conditions
            </Link>
          </Button>
        </CardFooter>
      </Card>
      </motion.div>
    </div>
  )
}

export default DeleteUser