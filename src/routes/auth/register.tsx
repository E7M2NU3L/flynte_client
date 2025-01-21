import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {zodResolver} from '@hookform/resolvers/zod';
import { RegisterSchemaStep1 } from "@/schemas/users"
import { RegisterStep1Types } from "@/types/users"
import { AppErr } from "@/utils/app-err"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {motion} from 'framer-motion';
import { useAuth } from "@/hooks/use-auth"
import GoogleAuth from "@/components/auth/google-auth"

const Register = () => {
  const form = useForm<RegisterStep1Types>({
    resolver : zodResolver(RegisterSchemaStep1),
    defaultValues : {
      firstname : "",
      lastname : "",
      email : "",
      password : ""
    }
  });

  const navigate = useNavigate();
  const {register : RegisterUser} = useAuth();

  async function handleRegisterStep1(values : RegisterStep1Types) {
    try {
      console.log(values);
      const response = await RegisterUser.mutateAsync(values);
      if (response?.data) {
        toast({
          title : "Success",
          description : response?.data.message as string
        });

        navigate('/login');
      };
    } catch (error) {
      AppErr(error);
    }
  }
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
            Create your <span className="text-primary">Account</span>
          </CardTitle>
          <CardDescription className="">
            Connect with Xcontour to unlock Family Finance Tracking at ease
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
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleRegisterStep1)}>
              <main className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <FormField control={form.control} name="firstname" render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Firstname
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="john" {...field} />
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
                      <Input placeholder="doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </main>
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
                  <FormMessage />
                </FormItem>
              )} />

              <main className="flex flex-col gap-1">
              <Button  variant={"default"} size={"sm"} className="w-full">
                {form.formState.isSubmitting ? <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Creating User
                </> : <>Register</>}
              </Button>
              <Button asChild className="flex justify-end w-fit" variant={"link"} size={"sm"}>
                  <Link to={"/login"}>
                    already have an account - Login
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

export default Register