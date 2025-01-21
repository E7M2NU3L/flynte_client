import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {zodResolver} from '@hookform/resolvers/zod';
import { LoginSchema } from "@/schemas/users"
import { LoginTypes } from "@/types/users"
import { AppErr } from "@/utils/app-err"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {motion} from 'framer-motion';
import { useDispatch } from "react-redux"
import { login } from "@/store/features/auth-slice"
import { useAuth } from "@/hooks/use-auth"
import GoogleAuth from "@/components/auth/google-auth"

const Login = () => {
  const form = useForm<LoginTypes>({
    resolver : zodResolver(LoginSchema),
    defaultValues : {
      email : "",
      password : ""
    }
  });

  const {login : LoginMutation} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(values : LoginTypes) {
    try {
      console.log(values);
      const response = await LoginMutation.mutateAsync(values);
      if (response?.data) {
        dispatch(login(response?.data.token));
        toast({
          title : "Success",
          description : "you have been successfully logged in"
        });

        navigate("/overview");
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
            Login to your <span className="text-primary">Account</span>
          </CardTitle>
          <CardDescription className="">
            Connect back with Flynte to get back with your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <GoogleAuth />

          <main className="flex flex-row items-center gap-2 w-full my-4">
            <Separator className="w-auto flex-1" />
            <span className="text-sm font-medium">
            or try with
            </span>
            <Separator className="w-auto flex-1" />
          </main>

          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleLogin)}>
              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="xxxxxxxx" type="password" {...field} />
                  </FormControl>
                  <main className="flex flex-rw justify-end w-full">
                    <Button variant={"link"} size={'sm'} className="text-xs" asChild>
                      <Link to={"/send-otp"}>Forgot password</Link>
                    </Button>
                  </main>
                  <FormMessage />
                </FormItem>
              )} />

              <main className="flex flex-col gap-1">
              <Button  variant={"default"} size={"sm"} className="w-full">
                {form.formState.isSubmitting ? <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Logging in
                </> : <>Login</>}
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

export default Login