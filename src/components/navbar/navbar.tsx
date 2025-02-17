import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/use-auth";
import LogoutDrawer from "../dashboard/logout-drawer";

const Navbar = () => {
  const authInfo = useSelector((state : RootState) => state.auth);
  const {userInfo} = useAuth();
  return (
    <div className="min-h-[10vh] z-10 flex flex-row justify-between px-4 items-center">
        <Link to={"/"} className="flex flex-row items-center gap-1">
          <img src="/logo.png" className="w-12 h-12 object-contain" alt="logo" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Flynte</h1>
        </Link>

        <div className="flex flex-row items-center gap-3"></div>

        <main className="flex flex-row gap-4 items-center">
          {(authInfo.userData && userInfo?.data.user._id) ? (
            <>
              <Button asChild variant={"outline"} size={"sm"}>
                <Link to={"/overview"}>
                  Dashboard
                </Link>
              </Button>
              <LogoutDrawer>
                <Button variant={"destructive"}  size={"sm"}>
                  Logout
                </Button>
              </LogoutDrawer>
            </>
          ) : (
            <>
              <Button asChild variant={"outline"} size={"sm"}>
                <Link to={"/login"}>
                  Login
                </Link>
              </Button>
              <Button asChild variant={"default"} size={"sm"}>
                <Link to={"/register"}>
                  Get Started
                </Link>
              </Button>
            </>
          )}
        </main>
    </div>
  )
}

export default Navbar