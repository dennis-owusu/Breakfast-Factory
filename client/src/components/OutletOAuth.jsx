import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase.config';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import { signInSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OutletOAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/outlet-google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/outlet-dashboard?tab=dash')
                toast.success('Login successfully', {
                    position: 'top-right'
                  })
            }else{
                toast.error(data.message,{
                    position: 'top-right'
                })
            }
        } catch (error) { 
            toast.error('Something went wrong...', {
                position: 'top-right'
              })
        }
    } 
  return (
    <div type='button' className='flex items-center gap-2' onClick={handleGoogleClick}>
        <FcGoogle className='w-6 h-6 mr-2'/>
        Continue with Google
    </div>
  )
}