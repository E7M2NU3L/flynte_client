import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {zodResolver} from '@hookform/resolvers/zod';
import { AppErr } from "@/utils/app-err"
import { Loader } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {motion} from 'framer-motion';
import { VerifyOTPTypes } from "@/types/users"
import { VerifyOTPSchema } from "@/schemas/users"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useAuth } from "@/hooks/use-auth"

const VerifyUser = () => {
  const form = useForm<VerifyOTPTypes>({
    resolver : zodResolver(VerifyOTPSchema),
    defaultValues : {
      otp : "",
    }
  });

  const navigate = useNavigate();
  const {VerifyUserOtp, VerifyUser} = useAuth();

  async function handleVerifyOTP(values : VerifyOTPTypes) {
    try {
      console.log(values);
      
      const response = await VerifyUserOtp.mutateAsync(values);
      if (response?.data) {
        toast({
          title : "Success",
          description : "your account has been verified successfully"
        });
  
        navigate('/overview');
      }
    } catch (error) {
      AppErr(error);
    }
  };

  const authInfo = useSelector((state : RootState) => state.auth);

  async function ResendOTP() {
    try {
      console.log(authInfo.userData);
      const response = await VerifyUser.mutateAsync();

      if (response?.data) {
        toast({
          title : "Success",
          description : "OTP has been sent to your email"
        });
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
            Verify User - <span className="text-primary">MFA</span>
          </CardTitle>
          <CardDescription className="">
            didn't receive an OTP don't worry - <Button variant={"link"} size={"sm"} onClick={ResendOTP}>resend otp</Button>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleVerifyOTP)}>
              <FormField control={form.control} name="otp" render={({field}) => (
                <FormItem>
                  <FormLabel>
                    One Time Password
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <main className="flex flex-col gap-1">
              <Button  variant={"default"} size={"sm"} className="w-full">
                {form.formState.isSubmitting ? <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Verifying User
                </> : <>Verify User</>}
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

export default VerifyUser