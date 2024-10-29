import { Button } from "../components/ui/button"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "@/redux/userSlice";
import OAuth from "../components/OAuth";


const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value.trim()})
  }

  const [formData, setFormData] = useState({})

 const handleSubmit = async(e) => {
  e.preventDefault()
  if(!formData.email || !formData.password || formData.email === '' || formData.password === ''){
    return toast.error('Please fill out all required fields',{
      position: 'top-right'
    })
  }
  setLoading(true)
  try {
    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if(data.success === false){
      dispatch(signInFailure(data.message))
      toast.error(data.message, {
        position: 'top-right'
      })
      setLoading(false)
    }else{
      dispatch(signInSuccess(data))
      setLoading(false)
        navigate('/dashboard?tab=dash') 
      toast.success('Login successfully', {
        position: 'top-right'
      })
    }
  } catch (error) {
    toast.error('Something went wrong', {
      position: 'top-right'
    })
    setLoading(false)
  }
 }
  return (
   
       
   <div className="flex justif-center items-center min-h-screen">
     <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent >
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="business@gmail.com"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" onChange={handleChange} placeholder='Enter your business password'/>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
          {
              loading ? <div className="flex items-center justif-center gap-2"><div className="flex justif-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white-500"></div>
            </div>Loading</div>
              : <div>Login</div>
            }
          </Button>
        </form>
          <Button variant="outline" className="w-full mt-3">
            <OAuth/>
          </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to='/sign-up' className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>

   </div>
         
  )
}

export default SignIn