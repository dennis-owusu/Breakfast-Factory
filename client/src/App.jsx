import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboardout from "./pages/Dashboardout"
import Blank from "./pages/Blank"
import Blank2 from "./pages/Blank2"
import Category from "./admin/Category"
import Outlet from "./admin/Outlet"
import Product from "./admin/Product"
import Users from "./admin/UsersComp"
import Orders from "./admin/orders"
import './index.css'
import { useEffect, useState } from "react";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import OutletSignIn from "./pages/OutletSignIn";
import ClientAddress from "./users/ClientAddress";
import ClientCheckout from "./users/ClientCheckout";
import ClientHome from "./users/ClientHome";
import ClientLogin from "./users/ClientLogin";
import ClientFeedback from "./users/ClientFeedback";

function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(loading){

      setLoading(true); 
    }else{
      setLoading(false)
    }

  }, [loading]);
    
  return (
      loading ? <div className="yflex ymin-h-screen yitems-center yjustify-center ygap-2"><div className="yflex yjustify-center yitems-center">
      <div className="yanimate-spin yrounded-full yh-8 yw-8 yborder-t-2 yborder-b-2 yborder-blue-500"></div>
    </div></div>:
    
    <>
      <div className="ytext-black ybg-white yw-full">
      <BrowserRouter>
       <Routes>
        <Route path="/outlet-dashboard" element={<Dashboardout/>}/>
        <Route path="/address" element={<ClientAddress/>}/>
        <Route path="/checkout" element={<ClientCheckout/>}/>
        <Route path="/feedback" element={<ClientFeedback/>}/>
        <Route path="/home" element={<ClientHome/>}/>
        <Route path="/" element={<ClientLogin/>}/>
        <Route path="/sign-in" element={<OutletSignIn/>}/>
        <Route element={<AdminPrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="/Blank" element={<Blank/>}/>
        <Route path="/Blank2" element={<Blank2/>}/>
        <Route path="/Outlet" element={<Dashboardout/>}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        {/* Admin links */}
        <Route path="/admin/Category" element={<Category/>}/>
        <Route path="/admin/Outlet" element={<Outlet/>}/>
        <Route path="/admin/Product" element={<Product/>}/>
        <Route path="/admin/Users" element={<Users/>}/>
        <Route path="/admin/Orders" element={<Orders/>}/>
       </Routes>
       </BrowserRouter> 
       <ToastContainer 
        draggable
        pauseOnHover
        />
      </div> 
    </>
  )
}

export default App
