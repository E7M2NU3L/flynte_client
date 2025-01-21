import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import {zodResolver} from '@hookform/resolvers/zod';
import { AppErr } from "@/utils/app-err"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {motion} from 'framer-motion';
import { SendOTPTypes } from "@/types/users"
import { SendOTPSchema } from "@/schemas/users"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"

const SendMail = () => {
  const form = useForm<SendOTPTypes>({
    resolver : zodResolver(SendOTPSchema),
    defaultValues : {
      email : "",
    }
  });

  const navigate = useNavigate();
  const {SendOtp} = useAuth();

  async function handleSendOTP(values : SendOTPTypes) {
    try {
      console.log(values);
      const response = await SendOtp.mutateAsync(values);

      if (response?.data) {
        toast({
          title : "Success",
          description : "OTP has been sent to your email"
        });

        navigate('/verify-otp');
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
            Reset Password <span className="text-primary">Step-1</span>
          </CardTitle>
          <CardDescription className="">
            there must be an user account registered with the email address
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSendOTP)}>
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

              <main className="flex flex-col gap-1">
              <Button  variant={"default"} size={"sm"} className="w-full">
                {form.formState.isSubmitting ? <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Sending OTP
                </> : <>Get OTP</>}
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

export default SendMail