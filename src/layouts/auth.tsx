import Navbar from "@/components/navbar/navbar"
import { Outlet } from "react-router-dom"

const Auth = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Auth