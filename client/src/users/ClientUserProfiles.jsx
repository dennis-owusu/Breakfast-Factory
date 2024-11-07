
import { Modal } from 'flowbite-react'
import { signoutSuccess, updateFailure, updateSuccess } from '../redux/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ClientUserProfiles = () => {
    const {currentUser} = useSelector((state) => state.user)
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const [clientUsersData, setClientUsersData] = useState([])
    console.log(clientUsersData)


    const logoutClientUsers = async () =>{
            try {
            const res = await fetch('/api/route/logout/client-user', {
                method: 'POST',
            })
            const data = await res.json()
            if(res.ok){
                dispatch(signoutSuccess(data.message))
                toast.success('logout successful', {
                    position: 'top-center'
                })
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
        }

    const handleClientUserChange = (e) =>{
        setFormData({...formData, [e.target.id]:e.target.value})
    }

    const handleUpdateClientUserSubmit = async(e) => {
        e.preventDefault()
        if(!formData.phoneNumber){
            return toast.error('Please fill out the required field',{
                position: 'top-right'
            })
        }
        if(formData.phoneNumber.length < 0){
          return toast.error('Please enter a correct number',{
            position: 'top-right'
          })
        }
        setLoading(true)
        try {
          const res = await fetch(`/api/route/update/client-user/${currentUser._id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
          })
          const data = await res.json()
          if(data.success === false){
            dispatch(updateFailure(data.message))
            toast.error(data.message, {
                position: 'top-right'
            })
            setLoading(false)
          }else{
            dispatch(updateSuccess(data))
            setLoading(false)
              setOpenModal(false)
            toast.success('Data updated successfully', {
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

    useEffect(()=> {
        const fetchAllClientUsers = async () => {
            try {
                const res = await fetch('/api/route/get-all/client-user')
                const data = await res.json()

                if(res.ok){
                    setClientUsersData(data.allClientUsers)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllClientUsers()
    }, [])
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
        <div className=' rounded-full'>
            <img className='w-28 h-28 rounded-full' src={currentUser.profilePicture}/>
        </div>
        <div className='flex flex-col justify-center items-center mt-5'>
            <h3 className='text-xl font-semibold'>{currentUser.name}</h3>
            <p className='text-[#9C9C9C]'>{currentUser.email}</p>
        </div>

        <div className='border-[1px] bg-[#F7F7F7] mt-8 border-[#999696] w-[90%] px-6 py-5 rounded-3xl'>
            <div className='flex justify-between space-x-20 items-center'>
            <p className='flex justify-start items-center gap-2'>
                <span className='rounded-lg'>
                <svg className='bg-black py-1 px-1 rounded-[6px]' width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.65108 11.8769H9.34894C9.19975 12.7632 8.42875 13.4384 7.5 13.4384C6.57125 13.4384 5.80023 12.7632 5.65108 11.8769ZM7.5 1.25244C10.0888 1.25244 12.1875 3.3511 12.1875 5.93994V8.439L13.0739 10.4141C13.1083 10.4905 13.126 10.5734 13.126 10.6572C13.126 10.9851 12.8602 11.2509 12.5322 11.2509H2.47012C2.3865 11.2509 2.30383 11.2333 2.22751 11.1991C1.92822 11.0651 1.79421 10.7139 1.92819 10.4146L2.81251 8.43925L2.81257 5.93187L2.81533 5.77567C2.90225 3.25647 4.97242 1.25244 7.5 1.25244Z" fill="#FA9302"/>
</svg>
                </span>
 Notifications
 </p>
            <div>
            <label
  htmlFor="AcceptConditions"
  className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-black"
>
  <input
    type="checkbox"
    id="AcceptConditions"
    className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
  />

  <span
    className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-[#FA9302] text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
  >
    <svg
      data-unchecked-icon
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>

    <svg
      data-checked-icon
      xmlns="http://www.w3.org/2000/svg"
      className="hidden size-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </span>
</label>
            </div>
            </div>
            <hr className='mt-5 border-[#999696]'/>

            <div className='flex justify-between space-x-20 mt-5 items-center'>
            <p className='flex justify-start items-center gap-2'>
                <span className='bg-black py-3 px-3 rounded-[6px]'>
                </span>
 Support
 </p>
            </div>
        </div>
        <div className='border-[1px] bg-[#F7F7F7] mt-16 border-[#999696] w-[90%] px-6 py-5 rounded-3xl'>
        <form className='space-y-6' onSubmit={handleUpdateClientUserSubmit}>
            <div className='flex flex-col justify-start'>
                <p>Name</p>
          <input onChange={handleClientUserChange} placeholder={currentUser.name} className='border-none bg-transparent w-full active:border-none outline-none'/>
            <hr className='border-[#999696]'/>
            </div>
            <div className='flex flex-col justify-start'>
                <p>Email</p>
          <input onChange={handleClientUserChange} placeholder={currentUser.email} className='border-none bg-transparent w-full active:border-none outline-none'/>
            <hr className='border-[#999696]'/>
            </div>
            <div className='flex flex-col justify-start'>
                <p>Phone Number</p>
          <input onChange={handleClientUserChange} placeholder={currentUser.phoneNumber} className='border-none bg-transparent w-full active:border-none outline-none'/>
            <hr className='border-[#999696]'/>
            </div>
          
        </form>
            <div className='flex flex-col mt-5'>
            <button onClick={logoutClientUsers} className='flex text-[#DA0000] justify-start items-center gap-2'>
                <span className='bg-black py-3 px-3 rounded-[6px]'>
                </span>
            Log Out
            </button>
          <hr className='border-[#999696] mt-3 mb-10'/>
            </div>
        </div>
        {openModal && (
      <Modal show={openModal} size="md" position='center' onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleUpdateClientUserSubmit} className="text-center montserrat">
            <h1 className='text-xl font-medium'>Enter your phone number</h1>
            <p className='text-sm text-[#4a4545]'>Please enter your phone number to use this application</p>
            <div className='mx-auto flex mt-5'>
              <input onChange={handleClientUserChange} value={currentUser.name} readOnly type='text' className='w-[348px] h-[54px] border-none outline-none mx-auto rounded-xl py-3 bg-[#E5E5E5]' />
            </div>
            <div className='mx-auto flex mt-5'>
              <input onChange={handleClientUserChange} value={currentUser.email} readOnly type='text' className='w-[348px] h-[54px] border-none outline-none mx-auto rounded-xl py-3 bg-[#E5E5E5]' />
            </div>
            <div className='mx-auto flex mt-5'>
              <input onChange={handleClientUserChange} id='phoneNumber' type='number' placeholder='Enter your phone number' className='w-[348px] h-[54px] border-none outline-none mx-auto rounded-xl py-3 bg-[#E5E5E5]' />
            </div>
            <div className='flex justify-between mt-8 items-center mx-auto bg-black text-white py-3 px-5 rounded-3xl'>
              <button className='text-center font-semibold mx-auto' disabled={loading} type='submit'>Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )}
    </div>
  )
}

export default ClientUserProfiles