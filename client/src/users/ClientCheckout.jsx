/* eslint-disable no-unused-vars */
import { decrementQuantity, resetCart } from '../redux/cartSlice';
import React, { useEffect, useState } from 'react'
import { FaCheckSquare } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TiArrowBackOutline } from 'react-icons/ti';
import { usePaystackPayment } from 'react-paystack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {v4 as uuidv4} from 'uuid'

const ClientCheckout = () => {
  const [loading, setLoading] = useState(false)
  const {cart, totalPrice} = useSelector((state) =>state.cart)
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [myCharge, setMyCharge] = useState(0)
  const [referenceId, setReferenceId] = useState(uuidv4())
  const [formData, setFormData] = useState({})
  const [productLogData, setProductLogData] = useState([])

  const [isOpen, setIsOpen] = useState(true);

  const paystackCharge = totalPrice * 0.02; 
  const finalAmount = totalPrice + paystackCharge + myCharge
  useEffect(()=>{
    if(paystackCharge > 1){
      setMyCharge(1)
    }else if(paystackCharge < 1){
      setMyCharge(0.5)
    }
  }, [myCharge, paystackCharge])

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
    setProductLogData({...productLogData, [e.target.id]: e.target.value})
  }

  
  const getTotalQuantity = () => {
    let total = 0
    cart.forEach(item => {
      total += item.quantity
    })
    return total
  }
  const handleCashPayment = async()=>{
     try {
       const res = await fetch('/api/route/transaction',{
         method:'POST',
         headers:{'Content-Type': 'application/json'},
         body:JSON.stringify({
          referenceId,
          phoneNumber:currentUser.phoneNumber,
          email: currentUser.email,
          name: currentUser.name,
          amount:totalPrice,
          method:'CASH',
          status: 'success',
          paystackCharge: 0,
          myCharge: 0,
          products: cart.map(item => ({
            productId: item._id,
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity,
            productPrice: item.productPrice,
            numberOfProductsAvailable: item.numberOfProductsAvailable
        })),
          
         })
       })
       const data = await res.json()
       const productLogRes = await fetch('/api/route/create-productlog', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
          {referenceId, cart}
        ),
    });

    const logData = await productLogRes.json();

    if (!productLogRes.ok) {
        throw new Error(logData.message || 'Failed to create product logs.');
    }

    setProductLogData(logData);
    toast.success("Product logs created successfully.");

       if(res.ok){
        setFormData(data)
        dispatch(resetCart())
        toast.success('Payment successful',{
          position:'top-right'
        })
        navigate('/home')
       }
     } catch (error) {
       toast.error(error, {
        position:'top-center'
       })
     }
  }

  
  const config = {
    reference: referenceId,
    phoneNumber: currentUser.phoneNumber,
    email: currentUser.email,
    amount: finalAmount * 100,
    currency: 'GHS',
    method:'MOMO',
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_LIVE,
  }; 


  const handlePaystackSuccessAction = async (reference, paymentMethod = 'MOMO') => {

      try {


          const response = await fetch('/api/route/transaction', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  referenceId: reference,
                  phoneNumber: currentUser.phoneNumber,
                  email: currentUser.email,
                  name: currentUser.name,
                  status: "success",
                  method: paymentMethod,  // or "Cash" based on your flow
                  cashAmount: paymentMethod === "CASH" ? finalAmount : 0,  // Set cashAmount only if paymentMethod is Cash
                  EcashAmount: paymentMethod === "MOMO" ? finalAmount : 0,  // Set EcashAmount only if paymentMethod is MOMO
                  amount: finalAmount.toFixed(2),
                  paystackCharge,
                  myCharge,
                  products: cart.map(item => ({
                    productId: item._id,
                    productName: item.productName,
                    productImage: item.productImage,
                    quantity: item.quantity,
                    productPrice: item.productPrice,
                    numberOfProductsAvailable: item.numberOfProductsAvailable,
                    
                })),
              }),
          });
  
          const data = await response.json();
        
  
          if (response.ok) {
              // Update the product quantities in the database
              const updatePromises = cart.map(item => {
                  return fetch(`/api/route/purchase/${item._id}/decrement`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          quantity: item.quantity, // Send the quantity to be decremented
                      }),
                  });
              });
  
              // Wait for all update requests to complete
              await Promise.all(updatePromises);

        const productLogRes = await fetch('/api/route/create-productlog', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({referenceId, cart}),
        });

        const logData = await productLogRes.json();

        if (!productLogRes.ok) {
            throw new Error(logData.message || 'Failed to create product logs.');
        }

        setProductLogData(logData);

  
              // Update the Redux state
              cart.forEach(item => {
                  dispatch(decrementQuantity(item._id, item.quantity)); // Update local state
              });
  
              dispatch(resetCart());
              navigate('/home'); 
              return toast.success("Payment successful.");
          } else {
              toast.error(`Transaction recording failed: ${data.message}`);
          }
      } catch (error) {
          toast.error('An error occurred while recording the transaction.');
      }

      
   
};
  const handlePaystackCloseAction = async() => {
    try {
      const response = await fetch('/api/route/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          referenceId,
          phoneNumber: currentUser.phoneNumber,
          email:currentUser.email,
          name: currentUser.name,
          status: "failed",
          method: "MOMO",
          amount: totalPrice,
          paystackCharge,
          myCharge
        })
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(resetCart());
        navigate('/home'); // Redirect after successful payment
      } else {
        toast.error(`Transaction recording failed: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred while recording the transaction.');
    }
    toast.info('Payment cancelled');
  }

  const initializePayment = usePaystackPayment(config);


  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  const handleClose = () => setIsOpen(false);
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
    <div className='relative'>
      <div className='w-[90%] pb-10 bg-[#C9C9C9] mx-auto rounded-full top-6 mt-1'>
        <p className='hidden'>jnbsdjnv</p>
      </div>
      <div className='absolute bg-white  top-3 rounded-3xl w-full border-gray-500 z-50 pb-[8rem] h-full'>
      <button className='absolute bg-[#E5E5E5] py-[14px] m-5 px-4 rounded-full' onClick={()=>handleBack()}><TiArrowBackOutline className='w-5 h-5'/></button>
      <div className='relative mt-8'>
          <h3 className='text-xl mt-20 font-medium flex ml-6' style={{fontFamily:'Montserrat', fontSize:'22px'}}>Checkout</h3>

        <img className='h-44 mt-5 w-full object-cover' src='https://s3-alpha-sig.figma.com/img/6181/fb65/222e7c5b069cece6a952a8f2fc666472?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvspSv~vAGUXwzOk3EnqsgLjM9PSo3lAbKy~l7WF7GuTwhD8oFSymEVL8JK3NbxQstlTMfZIWJth-RobDhuOBq2aSZ0Sxq~-k0BmBK8om7UKmvEHPD0HVDbv9N77pIT9uDblYdUZKNFA1ZyWNyWLlw8iBvSZVeueBSSaPjL8X5HlyspppvGjfH-WAacC05A4JP0FIdHsaWik~bmsHXVjmCkzgPkd-icpfiJisN022a3nadpuLDvLrb87xVJ42lmolxeiRWP-Te0Q4j7zD67wL3dhSy0gPRZgXk2axOiVHTdskumKGNPJ3SfLxbebUq38Jt6rLfd9tWhrVD6S~eQn8g__'/>
      <iframe className='w-full absolute top-0 mx-auto h-56' src="https://lottie.host/embed/0da7cdef-c2b4-4db8-b586-20a2de0ed4fe/ObO2fFzp9O.json"></iframe>
        </div>
        <div className='flex justify-between w-[356px] items-center mx-auto mt-7 bg-[#F7F7F7] py-3 px-5 rounded-3xl'>
          <p className='font-semibold'>Delivery Time</p>
          <p className='flex items-center'><FaCheckSquare className='rounded-[100%] font-semibold text-[#cc0000]'/>10 Minutes</p>
        </div>
        <div className='flex mt-4 justify-between w-[356px] bg-[#cc0000] mx-auto items-center rounded-2xl px-5 h-[87px]'>
          <div className='flex gap-2 items-center'>
            <div className='py-3 px-3 bg-white rounded-full'>

            <HiOutlineShoppingCart className='text-[#cc0000] w-[24px] h-[24px]'/>
            </div>
            <div className='flex flex-col '>

            <h6 className='text-white text-lg font-medium'>Pick Up</h6>
            <p className='text-white text-sm font-normal'>Discount Applied</p>
            </div>
          </div>
          <button></button>
        </div>
        <div className='flex justify-between mt-4 w-[356px] items-center mx-auto bg-[#F7F7F7] py-3 px-5 rounded-3xl'>
          <p className='font-semibold'>Payment</p>
          <p className='flex items-center'>
          <select
  className='py-1 bg-white rounded-3xl flex justify-center mx-auto border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
  onChange={handleChange} // Attach onChange here
  id="paymentMethod" // Add an id for identification
>
  <option value='MOMO' id='MOMO'>Momo</option>
</select>

            </p>
        </div>
        <div className=' mt-4 w-[356px] h-[190px] items-center mx-auto bg-[#F7F7F7] py-3 px-5 rounded-3xl'>
        <div className='flex justify-between'>
          <p>Your items</p>
          <p onClick={()=>navigate('/home')} className='flex items-center bg-white text-sm py-1 px-2 rounded-2xl'>+Add item</p>
        </div>
       
              <div className='flex mt-10 justify-between items-center'>
              <p className=' font-semibold'>Total Items</p>
              <p className='bg-[#cc0000] text-white py-1 px-3 rounded-2xl'>{getTotalQuantity()}</p>
              </div>
        <hr className='mt-5 mb-5 border-t-[1px] border-[#999696] bg-[#999696]'/>
        <div className='flex justify-between mt-6'>
          <p className='font-semibold'>Total Amount</p>
          <p className='bg-[#cc0000] text-white py-1 px-3 rounded-2xl'>{totalPrice.toFixed(2)}</p>
        </div>
        </div>

        <div className='flex justify-between mt-8  w-[356px] h-[52px] items-center mx-auto bg-black text-white py-3 px-5 rounded-3xl'>
        <button className='text-center font-semibold mx-auto'  onClick={() => {
                    initializePayment({
                      onSuccess: (reference) => {
                        handlePaystackSuccessAction(reference);
                      },
                      onClose: handlePaystackCloseAction
                    })
                  }} >Order Now</button>
        </div>
      </div>
    </div>
  )
}

export default ClientCheckout
