import { useState } from "react"
import { useNavigate } from "react-router-dom"


const ClientAddress = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
  return (

    loading ?
    <div className='flex justify-center items-center min-h-screen'>

    <div className='div'>
  <span className='span'></span>
  <span className='span'></span>
  <span className='span'></span>
  <span className='span'></span>
</div>
    </div>
:
    <div className='mt-5 mx-5'>
        <div className='flex justify-between'>
            <div style={{width:'186px', fontFamily:'Poppins', letterSpacing: '-0.40799999237060547px'}}>
            <h1 className='text-xl font-semibold' >Your current location</h1>
            <p className='text-sm'>Central University Miotso Campus</p>
            </div>
            <div>
                <button className='border-[#FA9302] border-2 bg-[#FA9302] text-white py-2 px-6 rounded-3xl'>Change</button>
            </div>
        </div>
        <form>
            <div>
            <h4 className='text-lg mt-10'>Hostel, Apartment, Blocks</h4>
            <input className='py-3 outline-none w-full rounded-xl border-2 border-[#FA9302] px-3 active:border-[#FA9302]' placeholder='Hostel Name'/>
            </div>
            <div>
            <h4 className='text-lg mt-10'>Block</h4>
            <input className='py-3 outline-none w-full rounded-xl border-2 border-[#FA9302] px-3 active:border-[#FA9302]' placeholder='Block Name'/>
            </div>
            <div>
            <h4 className='text-lg mt-10'>Room Number</h4>
            <input className='py-3 outline-none w-full rounded-xl border-2 border-[#FA9302] px-3 active:border-[#FA9302]' placeholder='Room Number'/>
            </div>
            <div>
            <h4 className='text-lg mt-10'>How to get there</h4>
            <input className='py-3 outline-none w-full rounded-xl border-2 border-[#FA9302] px-3 active:border-[#FA9302]' type='textarea' placeholder=''/>
            </div>
            <div>
            <h4 className='text-lg mt-10'>Contact Number</h4>
            <input className='py-3 outline-none w-full rounded-xl border-2 border-[#FA9302] px-3 active:border-[#FA9302]' type='number' placeholder='Your Number'/>
            </div>

            <h3 style={{fontFamily:'Poppins'}} className='mt-5 text-xl font-semibold'>Address Type</h3>
            <div className='flex justify-start gap-6'>
                <button className='bg-[#FA9302] text-white py-3 px-6 rounded-3xl'>Hostel</button>
                <button className='bg-[#FA9302] text-white py-3 px-6 rounded-3xl'>Blocks</button>
                <button className='bg-[#FA9302] text-white py-3 px-6 rounded-3xl'>Others</button>
            </div>
            <button onClick={()=>navigate('/checkout')} className='mt-7 w-full bg-[#FA9302] text-white rounded-[5px] py-3 '>Confirm Address</button>
            <button className='mt-7 w-full bg-[#EDEDED] rounded-[5px] py-3 '>Cancel</button>
        </form>
    </div>
  )
}


export default ClientAddress