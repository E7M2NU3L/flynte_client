import { BrowserRouter, Route, Routes } from "react-router-dom"
import Root from "./layouts/root"
import Home from "./routes/root/home"
import Blogs from "./routes/root/blogs"
import SingleBlog from "./routes/root/single-blog"
import TermsOfService from "./routes/root/terms-of-service"
import PrivacyPolicy from "./routes/root/privacy-policy"
import ContactUs from "./routes/root/contact-us"
import RefundPolicy from "./routes/root/refund-policy"
import Pricing from "./routes/root/pricing"
import Auth from "./layouts/auth"
import Login from "./routes/auth/login"
import Register from "./routes/auth/register"
import VerifyOtp from "./routes/auth/verify-otp"
import SendMail from "./routes/auth/send-mail"
import ResetPassword from "./routes/auth/reset-password"
import VerifyUser from "./routes/auth/verify-user"
import Main from "./layouts/main"
import DeleteUser from "./routes/auth/delete-user"
import Overview from "./routes/dashboard/overview"
import Budgets from "./routes/dashboard/budgets"
import Category from "./routes/dashboard/category"
import Transactions from "./routes/dashboard/transactions"
import Accounts from "./routes/dashboard/accounts"
import Members from "./routes/dashboard/members"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route element={<Root />}>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<SingleBlog />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/pricing" element={<Pricing />} />
            </Route>

            <Route element={<Auth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/send-otp" element={<SendMail />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-user" element={<VerifyUser />} />
              <Route path="/delete-user" element={<DeleteUser />} />
            </Route>  

            <Route element={<Main />}>
              <Route path="/overview" element={<Overview />} />
              <Route path="/budgets" element={<Budgets/>} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/category" element={<Category />} />
              <Route path="/members" element={<Members />} />
              <Route path="/accounts" element={<Accounts />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
