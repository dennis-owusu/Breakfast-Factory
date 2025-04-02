import { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import OAuth from '../components/OAuth';
import AppleAuth from '../components/AppleAuth';

const SignUp = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value.trim()})
  }

  const [formData, setFormData] = useState({})

 const handleSubmit = async(e) => {
  e.preventDefault()
  if(!formData.username || !formData.email || !formData.password){
    return toast.error('Please fill out all fields', {
      position: 'top-right'
    })
  }
  setLoading(true)
  try {
    const res = await fetch('/api/auth/signup',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if(data.success === false){ 
      setLoading(false)
      return toast.error(data.message, {
        position: 'top-right'
      })
    }else{
      navigate('/login')
       toast.success('Business account has been created successfully', {
        position: 'top-right'
      })
      setLoading(false)
    }
  } catch (error) {
    toast.error('Something went wrong...',{
      position: 'top-right'
    })
    setLoading(false)
  } 
 }
  return (
   <div className='flex justif-center items-center min-h-screen'>
     <Card className="mx-auto max-w-full">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Business Name</Label>
              <Input id="username" placeholder="John Doe Enterprise" required onChange={handleChange}/>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="business@gmail.com"
              
            onChange={handleChange}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder='Enter your business password' onChange={handleChange}/>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
          {
              loading ? <div className="flex items-center justif-center gap-2"><div className="flex justif-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white-500"></div>
            </div>Loading</div>
              : <div>Create Account</div>
            }
          </Button>
        </form>
          <Button variant="outline" className="w-full mt-3">
            <OAuth/>
          </Button>
          <Button variant="outline" className="w-full mt-3">
            <AppleAuth/>
          </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to='/' className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
   </div>

  )
}

export default SignUp