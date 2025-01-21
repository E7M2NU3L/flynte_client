import { useAuth } from '@/hooks/use-auth'
import { Button } from '../ui/button'
import { AppErr } from '@/utils/app-err';
import { useState } from 'react';
import { Loader } from 'lucide-react';

const GoogleAuth = () => {
    const {handleGoogleMutation} = useAuth();
    const [clicked, setClicked] = useState<boolean>(false);
    const handleGoogleLogin = async () => {
        try {
            setClicked(true);
            const response = await handleGoogleMutation.mutateAsync();
            console.log(response);
        } catch (error) {
            AppErr(error);
        } finally {
            setClicked(false);
        }
    }
  return (
    <div className="flex flex-col gap-4 w-full">
        <Button variant={"outline"} size={"sm"} disabled={clicked} onClick={handleGoogleLogin}>
            {clicked ? <Loader className='h-4 w-4 animate-spin' /> : <>
                <img src="/google.svg" alt="google" className="h-4 w-4 mr-2" />
                Login with Google</>}
        </Button>
    </div>
  )
}

export default GoogleAuth