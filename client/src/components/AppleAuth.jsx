import { signInWithPopup, getAuth, OAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaApple } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { signInSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

export default function AppleAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleAppleClick = async () =>{
        const provider = new OAuthProvider('apple.com')
        provider.addScope('email');
        provider.addScope('name');
        try {
            const resultsFromApple = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/apple', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromApple.user.displayName || 'Apple User',
                    email: resultsFromApple.user.email,
                    applePhotoUrl: resultsFromApple.user.photoURL || '',
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/dashboard?tab=dash')
                toast.success('Login successfully', {
                    position: 'top-right'
                  })
            }
        } catch (error) { 
            toast.error('Something went wrong... check your internet connection', {
                position: 'top-right'
              })
        }
    } 
  return (
    <div type='button' className='flex items-center gap-2' onClick={handleAppleClick}>
        <FaApple className='w-6 h-6 mr-2 text-black'/>
        Continue with Apple
    </div>
  )
}