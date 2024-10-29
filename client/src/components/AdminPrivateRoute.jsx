import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminPrivateRoute = () => {
    const {currentUser} = useSelector((state)=>state.user)
  return (
        currentUser.isAdmin ? <Outlet/> : <Navigate to='/'/> && toast.error('Only admins are allowed to login to Admin Dashboard')
    
  )
}

export default AdminPrivateRoute