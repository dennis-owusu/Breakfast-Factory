
import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import { TiArrowBackOutline } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ClientFeedback = () => {
    const {currentUser} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        message: ''
    })
    console.log(formData)

    const handleBack = () => {
        navigate(-1)
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]:e.target.value})
    }
    const handleFeedbackSubmit = async (e) => {
        e.preventDefault()
        try {
            
            const feedbackData = {
                name: currentUser?.name,
                email: currentUser?.email,
                message: formData.message,
            }
    
            const res = await fetch('/api/route/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            })
    
            const data = await res.json()
    
            if (res.ok) {
                toast.success('Feedback sent successfully', {
                    position: 'top-center',
                })
                setFormData({ ...formData, message: '' }) // Clear the message field
            } else {
                toast.error(data.message || 'Error sending feedback', {
                    position: 'top-center',
                })
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong!', {
                position: 'top-center',
            })
        }
    }
    

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
    <button className=' bg-[#E5E5E5] py-[14px] m-5 px-4 rounded-full' onClick={()=>handleBack()}><TiArrowBackOutline className='w-5 h-5'/></button>
        <div className='flex justify-between items-center mt-2 mx-3 gap-3'>
            <button className='bg-[#FA9302] border-[#FA9302] py-2 text-white px-8 rounded-3xl'>Feedback</button>
            <button className='border-2 border-[#FA9302] py-2 px-8 rounded-3xl'>Reviews</button>
            <button className='border-2 border-[#FA9302] py-2 px-8 rounded-3xl'>Ratings</button>
        </div>
        <h2 className='font-medium text-[20px] mt-6 text-center montserrat'>Great To Hear From You</h2>

        <div className='bg-[#FA9302] relative max-w-96 mx-auto mt-14 h-[18rem] rounded-3xl'>
            <p className='text-center text-white text-[20px]'>Enter Feedback</p>
            <form onSubmit={handleFeedbackSubmit} className='flex flex-col justify-center gap-5 items-center'>
                <textarea onChange={handleChange} type='text' id='message' className='px-20 outline-none border-none mt-6 rounded-3xl pb-24 top-10 placeholder:text-center' placeholder='Type here'/>
            <button className='w-56 mx-auto flex justify-center items-center rounded-3xl bg-black text-white bottom-4 py-3'>Submit</button>
            </form>
        </div>
{/* images */}
        <div className='bg-[#F7F7F7] mt-5 py-10 px-10 mx-5 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                <img className='w-14 h-14 rounded-full' src='https://s3-alpha-sig.figma.com/img/3f6b/52e9/ba7ab3c6b31cfeec087e9fd087975d68?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=URr36aDzsWF84br~kTbomnrHxuMZDU8T0BhbpZqzm-CccuKwBH-wwxJHZuJSHTLDuJMx4F85qww~EHDralJ9k2~mKWw~62BbZjLbYcugohTkBUcsnuJXrIaS~Fq6pS8dlFq266Zfnq7B6qZeDDoa3bUkl8svWRsEfm2s66p6GtggJO5fQCMcLnQQXLb7bmANRsxnI9XGOprGtShS8ZUtyIh5Sy3b-FukxgF2SxYDVDhLqWRCrdo~iVKfK0eZaqecS~IbFmJlqGixQSkW3GxzdGKNuMtGrNp~RKnksBHtSZ74hQ-p8GyUFsq4QIwEesObYEtwBMxLJLk56eTLEEIOWg__'/>
                <p className='text-[#FA9302]'>The delivery was good</p>
                </div>
                
            </div>
        </div>
        <div className='bg-[#F7F7F7] mt-5 py-10 px-10 mx-5 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                <img className='w-14 h-14 rounded-full' src='https://s3-alpha-sig.figma.com/img/3f6b/52e9/ba7ab3c6b31cfeec087e9fd087975d68?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=URr36aDzsWF84br~kTbomnrHxuMZDU8T0BhbpZqzm-CccuKwBH-wwxJHZuJSHTLDuJMx4F85qww~EHDralJ9k2~mKWw~62BbZjLbYcugohTkBUcsnuJXrIaS~Fq6pS8dlFq266Zfnq7B6qZeDDoa3bUkl8svWRsEfm2s66p6GtggJO5fQCMcLnQQXLb7bmANRsxnI9XGOprGtShS8ZUtyIh5Sy3b-FukxgF2SxYDVDhLqWRCrdo~iVKfK0eZaqecS~IbFmJlqGixQSkW3GxzdGKNuMtGrNp~RKnksBHtSZ74hQ-p8GyUFsq4QIwEesObYEtwBMxLJLk56eTLEEIOWg__'/>
                <p className='text-[#FA9302]'>Just go and eat there and see</p>
                </div>
                
            </div>
        </div>
        <div className='bg-[#F7F7F7] mt-5 py-10 px-10 mx-5 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                <img className='w-14 h-14 rounded-full' src='https://s3-alpha-sig.figma.com/img/3f6b/52e9/ba7ab3c6b31cfeec087e9fd087975d68?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=URr36aDzsWF84br~kTbomnrHxuMZDU8T0BhbpZqzm-CccuKwBH-wwxJHZuJSHTLDuJMx4F85qww~EHDralJ9k2~mKWw~62BbZjLbYcugohTkBUcsnuJXrIaS~Fq6pS8dlFq266Zfnq7B6qZeDDoa3bUkl8svWRsEfm2s66p6GtggJO5fQCMcLnQQXLb7bmANRsxnI9XGOprGtShS8ZUtyIh5Sy3b-FukxgF2SxYDVDhLqWRCrdo~iVKfK0eZaqecS~IbFmJlqGixQSkW3GxzdGKNuMtGrNp~RKnksBHtSZ74hQ-p8GyUFsq4QIwEesObYEtwBMxLJLk56eTLEEIOWg__'/>
                <p className='text-[#FA9302]'></p>
                </div>
                
            </div>
        </div>
        <div className='bg-[#F7F7F7] mt-5 py-10 px-10 mx-5 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                <img className='w-14 h-14 rounded-full' src='https://s3-alpha-sig.figma.com/img/3f6b/52e9/ba7ab3c6b31cfeec087e9fd087975d68?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=URr36aDzsWF84br~kTbomnrHxuMZDU8T0BhbpZqzm-CccuKwBH-wwxJHZuJSHTLDuJMx4F85qww~EHDralJ9k2~mKWw~62BbZjLbYcugohTkBUcsnuJXrIaS~Fq6pS8dlFq266Zfnq7B6qZeDDoa3bUkl8svWRsEfm2s66p6GtggJO5fQCMcLnQQXLb7bmANRsxnI9XGOprGtShS8ZUtyIh5Sy3b-FukxgF2SxYDVDhLqWRCrdo~iVKfK0eZaqecS~IbFmJlqGixQSkW3GxzdGKNuMtGrNp~RKnksBHtSZ74hQ-p8GyUFsq4QIwEesObYEtwBMxLJLk56eTLEEIOWg__'/>
                <p className='text-[#FA9302]'></p>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ClientFeedback