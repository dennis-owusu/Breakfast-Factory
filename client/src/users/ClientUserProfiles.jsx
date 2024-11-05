
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ClientUserProfiles = () => {

    const [clientUsersData, setClientUsersData] = useState([])
    console.log(clientUsersData)

    const {currentUser} = useSelector((state)=> state.user)

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
        <div className='border-[1px] bg-[#F7F7F7] space-y-6 mt-16 border-[#999696] w-[90%] px-6 py-5 rounded-3xl'>
            <div className='flex flex-col justify-start'>
                <p>Name</p>
          <input placeholder='Cloud' className='border-none bg-transparent w-full active:border-none outline-none'/>
            <hr className='border-[#999696]'/>
            </div>
            <div className='flex flex-col justify-start'>
                <p>Email</p>
          <input placeholder='cloud@gmail.com' className='border-none bg-transparent w-full active:border-none outline-none'/>
            <hr className='border-[#999696]'/>
            </div>
            <div className='flex flex-col justify-start'>
                <p>My Data</p>
          <input placeholder='Cloud' className='border-none bg-transparent w-full active:border-none outline-none'/>
            <hr className='border-[#999696]'/>
            </div>
            <div className='flex flex-col mt-5'>
            <p className='flex text-[#DA0000] justify-start items-center gap-2'>
                <span className='bg-black py-3 px-3 rounded-[6px]'>
                </span>
            Log Out
            </p>
          <hr className='border-[#999696] mt-3 mb-10'/>
            </div>
          
        </div>
    </div>
  )
}

export default ClientUserProfiles