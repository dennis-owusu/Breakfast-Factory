/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaCheckSquare } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";

const ClientCheckout = () => {

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <div className='relative'>
      <div className='w-[90%] pb-10 bg-[#C9C9C9] mx-auto rounded-full top-6 mt-1'>
        <p className='hidden'>jnbsdjnv</p>
      </div>
      <div className='absolute bg-white  top-3 rounded-3xl w-full border-t-[1px] border-gray-500 z-50 shadow-2xl pb-[8rem] h-full'>
        <div className='relative mt-8'>
          <h3 className='text-xl font-medium flex ml-6' style={{fontFamily:'Montserrat', fontSize:'22px'}}>Checkout</h3>

        <img className='h-44 mt-5 w-full object-cover' src='https://s3-alpha-sig.figma.com/img/6181/fb65/222e7c5b069cece6a952a8f2fc666472?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g-u6cHk-651Rsjq3WI-d9X0X5bdmQdvgnoQUWSAsNLMPWkBQM7vqYwCZzSoL2l6a-AMNGgZVrAhLycf0qtB9RFWwTgfwC-DqUcb1yQkXlKmZymC5WnSojPzE6~XAIvCHn~GUEATKeUSXJTm8kL675~wlzgvjRVLxykwp-77tUIuc1PsK3d9gohfk1adoYKV-Cf4aZLlZ7nuG0QqSnHlXyKCHKKSI~Tk~C3ErhCjZMLveWqYP4GFpUMgSzNJksnGv6WkaVKs36Fh9t5POOElX5R6TUy4WvlMMIX5nreE6JMAAM6AwodkJEMbjQhEZ-0Vc1ZxAxVzvq-ulOs07oDCXUA__'/>
      <iframe className='w-full absolute top-0 mx-auto h-56' src="https://lottie.host/embed/0da7cdef-c2b4-4db8-b586-20a2de0ed4fe/ObO2fFzp9O.json"></iframe>
        </div>
        <div className='flex justify-between w-[356px] items-center mx-auto mt-7 bg-[#F7F7F7] py-3 px-5 rounded-3xl'>
          <p className='font-semibold'>Delivery Time</p>
          <p className='flex items-center'><FaCheckSquare className='rounded-[100%] font-semibold text-[#FA9302]'/>10 Minutes</p>
        </div>
        <div className='flex mt-4 justify-between w-[356px] bg-[#FA9302] mx-auto items-center rounded-2xl px-5 h-[87px]'>
          <div className='flex gap-2 items-center'>
            <div className='py-3 px-3 bg-white rounded-full'>

            <HiOutlineShoppingCart className='text-[#FA9302] w-[24px] h-[24px]'/>
            </div>
            <div className='flex flex-col '>

            <h6 className='text-white text-lg font-medium'>Pick Up</h6>
            <p className='text-white text-sm font-normal'>discount applied</p>
            </div>
          </div>
          <button className='bg-white py-1 px-3 rounded-2xl'>View all</button>
        </div>
        <div className='flex justify-between mt-4 w-[356px] items-center mx-auto bg-[#F7F7F7] py-3 px-5 rounded-3xl'>
          <p className='font-semibold'>Payment</p>
          <p className='flex items-center'>
          <select className='py-1 bg-white rounded-3xl flex justify-center mx-auto border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option>momo</option>
            <option>cash</option>
            </select>
            </p>
        </div>
        <div className=' mt-4 w-[356px] h-[190px] items-center mx-auto bg-[#F7F7F7] py-3 px-5 rounded-3xl'>
        <div className='flex justify-between'>
          <p>Your items</p>
          <p className='flex items-center bg-white text-sm py-1 px-2 rounded-2xl'>+Add item</p>
        </div>
        <div className='flex justify-between mt-6'>
          <p className='font-semibold'>Ice Cream</p>
          <p className='bg-[#FA9302] text-white py-1 px-3 rounded-2xl'>13GHc</p>
        </div>
        <hr className='mt-5 mb-5 border-t-[1px] border-[#999696] bg-[#999696]'/>
        <div className='flex justify-between mt-6'>
          <p className='font-semibold'>Total Amount</p>
          <p className='bg-[#FA9302] text-white py-1 px-3 rounded-2xl'>13GHc</p>
        </div>
        </div>

        <div className='flex justify-between mt-4 w-[356px] h-[52px] items-center mx-auto bg-black text-white py-3 px-5 rounded-3xl'>
        <button className='text-center font-semibold mx-auto'>Order Now</button>
        </div>
      </div>
    </div>
  )
}

export default ClientCheckout