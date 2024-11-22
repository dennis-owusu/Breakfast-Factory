
import { Modal } from 'flowbite-react'
import { signoutSuccess, updateFailure, updateSuccess } from '../redux/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import { TiArrowBackOutline } from 'react-icons/ti'

const ClientUserProfiles = () => {
    const {currentUser} = useSelector((state) => state.user)
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const [clientUsersData, setClientUsersData] = useState([])
    


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
            }else{
            toast.error(data.message)}
        } catch (error) {
            toast.error(error.message)
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

    const handleBack = () => {
      navigate(-1); // Goes back to the previous page
    };
  return (

    loading ?
    <div className='flex overflow-x-hidden justify-center items-center min-h-screen'>

    <div className='div'>
  <span className='span'></span>
  <span className='span'></span>
  <span className='span'></span>
  <span className='span'></span>
</div>
    </div>
:
    <div className='flex flex-col min-h-screen justify-center relative items-center'>
    <button className='absolute top-0 left-3 bg-[#E5E5E5] py-[14px] m-5 px-4 rounded-full' onClick={()=>handleBack()}><TiArrowBackOutline className='w-5 h-5'/></button>
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
                <span className='bg-black py-1 px-1 rounded-[6px]'>
                <svg className='' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<rect width="15" height="15" fill="url(#pattern0_247_230)"/>
<defs>
<pattern id="pattern0_247_230" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_247_230" transform="scale(0.00390625)"/>
</pattern>
<image id="image0_247_230" width="256" height="256" xlinkHref="data:image/png;base64,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"/>
</defs>
</svg>

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
                <IoExitOutline className='w-5 h-5'/>
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