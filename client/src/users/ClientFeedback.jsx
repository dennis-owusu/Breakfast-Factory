
import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'

const ClientFeedback = () => {

    const [loading, setLoading] = useState(false)
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
    <div className='overflow-x-hidden'>
        <div className='flex justify-between items-center mt-5 mx-3 gap-3'>
            <button className='bg-[#FA9302] border-[#FA9302] py-2 text-white px-8 rounded-3xl'>Feedback</button>
            <button className='border-2 border-[#FA9302] py-2 px-8 rounded-3xl'>Reviews</button>
            <button className='border-2 border-[#FA9302] py-2 px-8 rounded-3xl'>Ratings</button>
        </div>
        <h2 className='font-medium text-[20px] mt-6 text-center montserrat'>Great To Hear From You</h2>

        <div className='bg-[#FA9302] relative max-w-96 mx-auto mt-14 h-[18rem] rounded-3xl'>
            <p className='text-center text-white text-[20px]'>Enter Feedback</p>
            <div className='flex flex-col justify-center gap-5 items-center'>
                <textarea type='text' className='px-20 outline-none border-none mt-6 rounded-3xl pb-24 top-10 placeholder:text-center' placeholder='Type here'/>
            <button className='w-56 mx-auto flex justify-center items-center rounded-3xl bg-black text-white bottom-4 py-3'>Submit</button>
            </div>
        </div>
{/* images */}
        <div className='bg-[#F7F7F7] mt-5 py-10 px-10 mx-5 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                <img className='w-14 h-14 rounded-full' src='https://s3-alpha-sig.figma.com/img/3f6b/52e9/ba7ab3c6b31cfeec087e9fd087975d68?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UdScnFmyK-NDrb5npvwhIWsMfNu6BMEErI8HZAowm-ZoxEcegS0P-C1AU~9OtJ-gdyR041chrGkUCYuUfZeGCqZF4NtTX2SME7h44jCdTj8oj9lm1BrlzgZCF3KYUoXBtay4UPEx~MDknMZFFdCAyzhMEXY3mCokKk-ZSDzws4~KubA-cWaraK0OSjsMUOHDMP5U~f83RDILdGdTW5BDVmde8ddoNR07LOJKbuJorSgldVRWpelEsJKAMZtDLCpKYBH13JYEMIzX3lIb~C6oNaYqvj~fbcb4oIr71aQ0MadXcV5Pf0HjxG3mhR5Jx3VChBEBaHQRK~ByObIYNXb4BQ__'/>
                <p className='text-[#FA9302]'>Kwame T.</p>
                </div>
                <FaAngleDown className='text-[#FA9302]' />
            </div>
        </div>
        <div className='bg-[#F7F7F7] mt-5 py-10 px-10 mx-5 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                <img className='w-14 h-14 rounded-full' src='https://s3-alpha-sig.figma.com/img/3f6b/52e9/ba7ab3c6b31cfeec087e9fd087975d68?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UdScnFmyK-NDrb5npvwhIWsMfNu6BMEErI8HZAowm-ZoxEcegS0P-C1AU~9OtJ-gdyR041chrGkUCYuUfZeGCqZF4NtTX2SME7h44jCdTj8oj9lm1BrlzgZCF3KYUoXBtay4UPEx~MDknMZFFdCAyzhMEXY3mCokKk-ZSDzws4~KubA-cWaraK0OSjsMUOHDMP5U~f83RDILdGdTW5BDVmde8ddoNR07LOJKbuJorSgldVRWpelEsJKAMZtDLCpKYBH13JYEMIzX3lIb~C6oNaYqvj~fbcb4oIr71aQ0MadXcV5Pf0HjxG3mhR5Jx3VChBEBaHQRK~ByObIYNXb4BQ__'/>
                <p className='text-[#FA9302]'>Kwame T.</p>
                </div>
                <FaAngleDown className='text-[#FA9302]' />
            </div>
        </div>
        <div className='bg-[#F7F7F7] mt-5 py-10 px-10 mx-5 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                <img className='w-14 h-14 rounded-full' src='https://s3-alpha-sig.figma.com/img/3f6b/52e9/ba7ab3c6b31cfeec087e9fd087975d68?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UdScnFmyK-NDrb5npvwhIWsMfNu6BMEErI8HZAowm-ZoxEcegS0P-C1AU~9OtJ-gdyR041chrGkUCYuUfZeGCqZF4NtTX2SME7h44jCdTj8oj9lm1BrlzgZCF3KYUoXBtay4UPEx~MDknMZFFdCAyzhMEXY3mCokKk-ZSDzws4~KubA-cWaraK0OSjsMUOHDMP5U~f83RDILdGdTW5BDVmde8ddoNR07LOJKbuJorSgldVRWpelEsJKAMZtDLCpKYBH13JYEMIzX3lIb~C6oNaYqvj~fbcb4oIr71aQ0MadXcV5Pf0HjxG3mhR5Jx3VChBEBaHQRK~ByObIYNXb4BQ__'/>
                <p className='text-[#FA9302]'>Kwame T.</p>
                </div>
                <FaAngleDown className='text-[#FA9302]' />
            </div>
        </div>
        <div className='bg-[#F7F7F7] mt-5 py-10 px-10 mx-5 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                <img className='w-14 h-14 rounded-full' src='https://s3-alpha-sig.figma.com/img/3f6b/52e9/ba7ab3c6b31cfeec087e9fd087975d68?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UdScnFmyK-NDrb5npvwhIWsMfNu6BMEErI8HZAowm-ZoxEcegS0P-C1AU~9OtJ-gdyR041chrGkUCYuUfZeGCqZF4NtTX2SME7h44jCdTj8oj9lm1BrlzgZCF3KYUoXBtay4UPEx~MDknMZFFdCAyzhMEXY3mCokKk-ZSDzws4~KubA-cWaraK0OSjsMUOHDMP5U~f83RDILdGdTW5BDVmde8ddoNR07LOJKbuJorSgldVRWpelEsJKAMZtDLCpKYBH13JYEMIzX3lIb~C6oNaYqvj~fbcb4oIr71aQ0MadXcV5Pf0HjxG3mhR5Jx3VChBEBaHQRK~ByObIYNXb4BQ__'/>
                <p className='text-[#FA9302]'>Kwame T.</p>
                </div>
                <FaAngleDown className='text-[#FA9302]' />
            </div>
        </div>
    </div>
  )
}

export default ClientFeedback