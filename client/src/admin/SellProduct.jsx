import { Button } from '../components/ui/button';
import { addToCart } from '../redux/cartSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SellProduct = () => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const {cart} = useSelector((state)=>state.cart)
    const [allProducts, setAllProducts] = useState([])

      const handleCart = async(product)=>{
      
        if (product.numberOfProductsAvailable <= 0) {
          toast.error('Product not available');
          return;
      }

      // Check if the product is already in the cart and adjust quantity if necessary
      const existingProduct = cart.find(item => item._id === product._id);
      if (existingProduct) {
          if (existingProduct.quantity >= product.numberOfProductsAvailable) {
              toast.error('Cannot add more of this product. Stock limit reached.');
              return;
          }
      }
        dispatch(
          addToCart({
            _id: product._id,
            productName: product.productName,
            productImage: product.productImage,
            productPrice: product.productPrice,
            numberOfProductsAvailable: product.numberOfProductsAvailable
          })
        )
        toast.success(`${product.productName} has been added to your cart`,{
          position: 'top-center'
        })
      }
    useEffect(() => {
        const fetchAllProducts = async () => {
          setLoading(true);
    
          try {
            const res = await fetch("/api/route/allproducts");
            const data = await res.json();
            if (res.ok) {
              setAllProducts(data.products.reverse());
            }
          } catch (error) {
            toast.error('An error occurred while fetching products, check your internet connection')
          } finally {
            setLoading(false); 
          }
        };
        fetchAllProducts();
      }, []);
    
    
  return (

    loading ? <div className="flex min-h-screen items-center justify-center gap-2"><div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div></div>:
    <div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 flex-col mx-auto'>
            {
                allProducts.map((product)=>(
                    <div key={product._id} className=' space--5 h-[20rem] mx-6'>
                        <img
                           src={product.productImage} 
                           className="rounded-xl mx-auto w-44 h-40" />
                           <div className='flex mx-auto justify-between'>
                           <p className='font-semibold text-lg'>{product.productName}</p>
                           <p className='text-xl font-medium'>₵{product.productPrice}</p>
                           </div>
                           <div className="card-actions mx-auto">
                           <Button onClick={()=>{
                            if(product.numberOfProductsAvailable === 0){
                              toast.error('Product not available')
                            }else{
                              handleCart(product)
                            }
                          }}
                style={{ borderRadius: '6px' }}
                className='btn text-white w-full border-none'
              >
                Add To Cart
              </Button>
</div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default SellProduct