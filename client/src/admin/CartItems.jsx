import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { decrementQuantity, incrementQuantity, removeItem, resetCart } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import {v4 as uuidv4} from 'uuid'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';

const CartItems = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const [referenceId, setReferenceId] = useState(uuidv4())
  const [formData, setFormData] = useState({})
  const [productLogData, setProductLogData] = useState([])
  const [myCharge, setMyCharge] = useState(null)
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/home');
    }
  }, [cart.length, navigate]);

  const navigate = useNavigate();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item._id));
    toast.success(`${item.productName} has been removed from cart`);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };




/*   const handleInitializePayment = async () => {
    try {
      const response = await fetch('/api/route/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: currentUser.email,
          amount: totalPrice,
        })
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.data.authorization_url;
        dispatch(resetCart());
      } else {
        toast.error(`Payment initialization failed: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred during payment initialization.');
    }
  }; */

  
  const paystackCharge = totalPrice * 0.02; 
  const finalAmount = totalPrice + paystackCharge + myCharge
  useEffect(()=>{
    if(paystackCharge > 1){
      setMyCharge(1)
    }else if(paystackCharge < 1){
      setMyCharge(0.5)
    }
  }, [myCharge, paystackCharge])

  const handleCashPayment = async()=>{
     try {
       const res = await fetch('/api/route/transaction',{
         method:'POST',
         headers:{'Content-Type': 'application/json'},
         body:JSON.stringify({
          referenceId,
          email:currentUser.email,
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
    console.log("Product log response:", logData); // Log server response for debugging

    if (!productLogRes.ok) {
        throw new Error(logData.message || 'Failed to create product logs.');
    }

    setProductLogData(logData);
    toast.success("Product logs created successfully.");

       if(res.ok){
        setFormData(data)
        dispatch(resetCart())
        toast.success('Payment successful')
        navigate('/outlet-dashboard?tab=transactions',{
          position:'top-right'
        })
       }
     } catch (error) {
       console.log(error)
     }
  }

  
  const config = {
    reference: referenceId,
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
                  email: currentUser.email,
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
        console.log("Product log response:", logData); // Log server response for debugging

        if (!productLogRes.ok) {
            throw new Error(logData.message || 'Failed to create product logs.');
        }

        setProductLogData(logData);
        toast.success("Product logs created successfully.");

  
              // Update the Redux state
              cart.forEach(item => {
                  dispatch(decrementQuantity(item._id, item.quantity)); // Update local state
              });
  
              navigate('/outlet-dashboard?tab=transactions'); 
              dispatch(resetCart());
              return toast.success("Transaction recorded and quantities updated.");
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
          email: currentUser.email,
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
        navigate('/outlet-dashboard?tab=transactions'); // Redirect after successful payment
      } else {
        toast.error(`Transaction recording failed: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred while recording the transaction.');
    }
    toast.info('Payment cancelled');
  }

  const initializePayment = usePaystackPayment(config);

  if (cart.length === 0) {
    return <div className="ytext-center ytext-2xl ymt-10">Your cart is empty</div>;
  }

  return (
    <div className='bg-gra-50'>
      <h1 className='text-center text-3xl font-semibold'>Cart</h1>
      <h1 className='text-center m-10 flex items-center justify-center gap-2 text-3xl font-semibold'>{getTotalQuantity()} {getTotalQuantity() > 1 ? <p>items in cart</p>: <p>item in cart</p>}</h1>
      <div className='flex gap-6 flex-col md:flex-row yy-center'>
        <div className='bg-white p-5 shadow-lg w-[32rem] lg:w-[33rem] xl:w-[35rem] mx-auto md:w-[35rem]'>
          {cart.map((item) => (
            <div className='flex justify-between p-3 mt-5 border-2 mx-10 rounded-xl border-gray-300 items-center' key={item._id}>
              <div className='flex items-center justify-center gap-10'>
                <img className='md:w-28 w-20 pl-3 md:ml-5 h-32' src={item.productImage} alt={item.productName} />
                <div className='flex flex-col gap-10 items-center ml-5'>
                  <p className='text-xl font-semibold'>{item.productName}</p>
                  <div className='flex items-center gap-3'>
                    <Button style={{borderRadius:'50%', fontSize:'1.1rem'}} onClick={() => dispatch(decrementQuantity(item._id))}>-</Button>
                    <p>{item.quantity}</p>
                    <Button 
    style={{ borderRadius: '50%', fontSize: '1.1rem' }} 
    onClick={() => {
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
    }}
>
    +
</Button>
                  </div>
                </div> 
              </div>
              <div className='mx-5 flex flex-col yy-center items-center'>
                <p className='text-xl font-medium mb-6'>₵{item.productPrice}</p>
                <button className='cursor-pointer hover:bg-gra-100 p-2 px-2 ease-in-out transition-all duration-200 rounded-full' onClick={() => handleRemoveItem(item)}>
                  <MdDelete className='w-5 h-5 text-red-500'/>
                </button>
               {/*  <div className="mt-4">
          <Barcode value={item._id} /> 
        </div> */}
              </div>
            </div>
          ))}
        
        </div>
        <div className='w-[20rem] mx-auto'>
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Checkout</CardTitle>
              <CardDescription>Item details</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Email: <span className='text-sm text-center mt-10'>{currentUser.email}</span></p>
              <p>Total No. of items: <span className='text-lg font-medium'>{getTotalQuantity()}</span></p>
              <p>Total price: <span className='text-2xl font-semibold'>₵{totalPrice.toFixed(2)}</span></p>
              <div className='mx-auto flex flex-col justify-center gap-2 text-center'>
               {/*  <Button onClick={handleInitializePayment} className='ymx-auto ymt-5 yw-full' style={{borderRadius:'6px'}}>Checkout</Button> */}
                <Button 
                  onClick={() => {
                    initializePayment({
                      onSuccess: (reference) => {
                        handlePaystackSuccessAction(reference);
                      },
                      onClose: handlePaystackCloseAction
                    });
                  }} 
                  className='mx-auto mt-2 w-full' 
                  style={{borderRadius:'6px'}}
                >
                  Pay with MOMO
                </Button>
                <Button style={{borderRadius:'6px'}} onClick={ handleCashPayment }>Pay with CASH</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
 
export default CartItems;