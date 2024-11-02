
import { decrementQuantity, incrementQuantity, removeItem } from '../redux/cartSlice';
import { TiArrowBackOutline } from "react-icons/ti";

import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

const ClientCart = () => {

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item._id));
        toast.success(`${item.productName} has been removed from cart`);
      };
      const navigate = useNavigate()

      useEffect(() => {
        if (getTotalQuantity() === 0) {
          navigate('/home');
        }
      }, [navigate]);
    


    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
      };
    
      const handleBack = () => {
        navigate(-1); // Goes back to the previous page
      };

    const {cart, totalPrice} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
  return (
    <div className='relative'>
    <div className='w-[90%] pb-10 bg-[#C9C9C9] mx-auto rounded-full top-6 mt-1'>
      <p className='hidden'>jnbsdjnv</p>
    </div>
    <div className='absolute bg-white  top-3 rounded-3xl w-full border-gray-500 z-50 pb-[8rem] h-full'>
        <button className='text-white bg-[#FA9302] py-[14px] m-5 px-4 rounded-full' onClick={()=>handleBack()}><TiArrowBackOutline className='w-5 h-5'/></button>
    <div className='flex justify-between items-center mt-5 mx-3 gap-3'>
            <button className='bg-[#FA9302] border-[#FA9302] py-3 flex justify-center items-center gap-1 text-sm text-white px-5 rounded-3xl'>Most <span>Popular</span></button>
            <button className='border-2 border-[#FA9302] py-3 flex justify-center items-center gap-1 text-sm px-5 rounded-3xl'>Under <p>8GHS</p></button>
            <button className='border-2 border-[#FA9302] py-3 flex justify-center items-center gap-1 text-sm px-5 rounded-3xl'>Combo <p>Deals</p></button>
        </div>

        {/* Items */}

        <div className='bg-white mt-10 shadow-lg max-w-[95%] mx-auto'>
          {cart.map((item) => (
            <div className='flex justify-between relative max-w-[95%] p-3 mt-5 mx-auto rounded-xl shadow-xl items-center' key={item._id}>
              <div className='flex items-center justify-center gap-10'>
                <div className='flex justify-center items-center'>
                <p className='bg-[#FA9302] absolute right-3 top-3 text-white rounded-full py-2 px-2' onClick={()=>handleRemoveItem(item)}><MdDelete className='w-5 h-5'/></p>
                <div className='absolute flex gap-3 items-center bottom-3 right-3'>
                    <button className='bg-[#FA9302] text-white text-lg font-medium rounded-full py-1 px-[13px]' onClick={() => dispatch(decrementQuantity(item._id))}>-</button>
                    <p>{item.quantity}</p>
                    <button className='bg-[#FA9302] text-white text-lg font-medium rounded-full py-1 px-[10px]'  onClick={() => {
      if (item.numberOfProductsAvailable === 0) {
        toast.error('Product not available', { position: 'top-right' });
        return;
      }
      
      const currentQuantity = cart.find(cartItem => cartItem._id === item._id)?.quantity || 0;
      
      // Check if the current quantity is less than available stock
      if (currentQuantity < item.numberOfProductsAvailable) {
        dispatch(incrementQuantity(item._id));
      } else {
        toast.error('Cannot add more of this product. Stock limit reached.', { position: 'top-right' });
      }
    }}>+</button>
                </div>
                <img className='md:w-28 w-36 mr-2 rounded-3xl h-32' src={item.productImage} alt={item.productName} />
                <div className='flex items-center flex-col justify-center'>
                  <p className='text-xl font-normal mb-1'>{item.productName}</p>
                  <p className=' mb-1 bg-[#FA9302] py-0 px-4 rounded-3xl text-white'>₵{item.productPrice}</p>
                </div>
                </div>
               
              </div>
            </div>
          ))}
        
        </div>
    </div>

    <div className="">
  <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 mt-4 w-[95%] h-[52px] flex justify-center items-center bg-black text-white py-4 rounded-3xl">
    <div className="flex justify-between gap-44 items-center w-full px-4">
      <p className="text-xl font-medium flex gap-1">Total <span>Quantity</span></p>
      <button className="bg-white py-2 px-6 rounded-3xl font-medium text-xl text-black">{getTotalQuantity()}</button>
    </div>
  </div>
</div>
    <div className="">
  <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 mt-4 w-[95%] h-[52px] flex justify-center items-center bg-black text-white py-4 rounded-3xl">
    <div className="flex justify-between gap-44 items-center w-full px-4">
      <p className="text-xl font-medium">₵{totalPrice.toFixed(2)}</p>
      <button className="bg-white py-2 px-6 rounded-3xl text-black">Pay Now</button>
    </div>
  </div>
</div>

  </div>
  )
}

export default ClientCart