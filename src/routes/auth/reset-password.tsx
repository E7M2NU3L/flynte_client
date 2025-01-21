import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import {zodResolver} from '@hookform/resolvers/zod';
import { AppErr } from "@/utils/app-err"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {motion} from 'framer-motion';
import { ResetPasswordTypes } from "@/types/users"
import { ResetPasswordSchema } from "@/schemas/users"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"

const ResetPassword = () => {
  const form = useForm<ResetPasswordTypes>({
    resolver : zodResolver(ResetPasswordSchema),
    defaultValues : {
      password : "",
      confirmpassword : "",
    }
  });

  const navigate = useNavigate();
  const {ResetPassword : ResetPasswordmutation} = useAuth();

  async function handleResetPassword(values : ResetPasswordTypes) {
    try {
      console.log(values);
      const response = await ResetPasswordmutation.mutateAsync(values);

      if (response?.data) {
        toast({
          title : "Success",
          description : "password has been reset successfully"
        });

        navigate('/login');
      }
    } catch (error) {
      AppErr(error);
    }
  }
  return (
    <div className="min-h-[90vh] flex justify-center items-center w-full">
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
            Reset Password <span className="text-primary">Step-3</span>
          </CardTitle>
          <CardDescription className="">
            Enter a strong password for your data safety and security.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleResetPassword)}>
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="xxxxxxxx" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="confirmpassword" render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="xxxxxxxx" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    confirm the password by entering the same password entered above
                  </FormDescription>
                </FormItem>
              )} />

              <main className="flex flex-col gap-1">
              <Button  variant={"default"} size={"sm"} className="w-full">
                {form.formState.isSubmitting ? <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Resetting Password
                </> : <>Reset Password</>}
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

export default ResetPassword