import { useDispatch, useSelector } from "react-redux"
import { signInSuccess } from "../redux/userSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase.config';
import 'react-toastify/dist/ReactToastify.css';


const ClientLogin = () => {
  const [loading, setLoading] = useState(false)
  const {currentUser} = useSelector((state) => state.user)
 
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {

    if(currentUser){
      navigate('/home')
    }else{
      navigate('/')
    }
  }, [navigate, currentUser])

  const handleGoogleClick = async () =>{
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      setLoading(true)
      try {
          const resultsFromGoogle = await signInWithPopup(auth, provider)
          const res = await fetch('/api/route/create/client-user/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  name: resultsFromGoogle.user.displayName,
                  email: resultsFromGoogle.user.email,
                  phoneNumber: resultsFromGoogle.user.phoneNumber,
                  profilePicture: resultsFromGoogle.user.photoURL
                }),
              })
          const data = await res.json()
          if (res.ok){
              dispatch(signInSuccess(data))
              navigate('/home')
              toast.success('Login successfully', {
                  position: 'top-right'
                })
                setLoading(false)
          }
      } catch (error) { 
          toast.error('Something went wrong... check your internet connection', {
              position: 'top-right'
            })
            setLoading(false)
      }
  } 
 
  
 
  return (

    <div className="min-h-screen flex-col flex justify-center items-center">

      <h3 className="text-lg font-semibold">Login with Google</h3>

   <div className='flex justify-center mt-5 items-center mx-auto bg-black text-white py-2 px-8 rounded-3xl'>
     <button className='text-center font-semibold mx-auto flex gap-2 items-center' disabled={loading} onClick={handleGoogleClick}>Continue with Google <FcGoogle/></button>
   </div>
    </div>
  )
}

export default ClientLogin