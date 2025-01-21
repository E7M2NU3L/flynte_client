import { useAuth } from '@/hooks/use-auth';
import {Outlet, Navigate} from 'react-router-dom'

const IsLoggedin = () => {
    const {userInfo} = useAuth();
    return (
        <div>
            {userInfo?.data?.user?.email ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}

export default IsLoggedin