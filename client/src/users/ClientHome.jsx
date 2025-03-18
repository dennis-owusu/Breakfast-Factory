import { addToCart } from '../redux/cartSlice';
import { useEffect, useState } from 'react'
import { FaCheckSquare } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { IoMdSettings } from "react-icons/io";
import { MdFavoriteBorder, MdFeedback, MdOutlineShoppingBag } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateSuccess } from '../redux/userSlice';
import { Modal } from 'flowbite-react';
import { Search } from 'lucide-react';

/* Custom styles */
import '../index.css';

const ClientHome = () => {
    const {cart} = useSelector((state)=>state.cart)
    const {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [clientUsers, setClientUsers] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Filter products based on the selected category
    const filteredProducts = selectedCategory 
      ? allProducts.filter(product => product.category === selectedCategory)
      : allProducts;

      useEffect(()=> {

        if(currentUser){
          navigate('/home')
        }else{
          navigate('/')
        }
      }, [navigate, currentUser])

    const getTotalQuantity = () => {
        let total = 0
        cart.forEach(item => {
          total += item.quantity
        })
        return total
      }

      
      useEffect(() => {

        const fetchCategory = async () => {
            if(loading){
                setLoading(false)
            }
            setLoading(true); // Set loading to true before fetching
            try {
              const res = await fetch("/api/route/allcategories", {
                method: "GET",
              });
              const data = await res.json();
              if (res.ok) {
                setCategoryData(data.allCategory.reverse());
              } else {
                toast.error(data.message, {
                  position: "top-right",
                });
              }
            } catch (error) {
              toast.error("An error occurred while fetching categories", {
                position: "top-right",
              });
            } finally {
              setLoading(false);
            }
          };

          fetchCategory()
    }, [])

    const [activeIcon, setActiveIcon] = useState(null);

    const handleIconClick = (icon) => {
        setActiveIcon((prevIcon) => (prevIcon === icon ? null : icon));
    };
    
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
      useEffect(() => {
          const fetchAllClientUsers = async () => {
              setLoading(true);
              
              try {
                  const res = await fetch("/api/route/get-all/client-user");
            const data = await res.json();
            if (res.ok) {
              setClientUsers(data.allClientUsers.reverse());
            }
          } catch (error) {
            toast.error('An error occurred while fetching users, check your internet connection')
          } finally {
            setLoading(false); 
          }
        };
    
        fetchAllClientUsers();
      }, []);

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
        if(formData.phoneNumber.length < 10){
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
            toast.success('Login successful', {
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
useEffect(() => {
  if (currentUser.phoneNumber === null || currentUser.phoneNumber?.length < 10) {
    setOpenModal(true);
  }else{
    setOpenModal(false);
  }
}, [currentUser]);

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

  const activeClass = 'text-[#FA9302]'; // Style for active icon
  const baseClass = 'text-white';

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
    
    <main className='overflow-x-hidden relative bg-[#E5E5E5]'>
      {/* Header Section with improved layout */}
      <section className='bg-white py-5 rounded-b-3xl shadow-md'>
        <div className='flex mt-5 justify-between mx-5 items-center'>
          <div className='bg-[#FA9302] w-10 h-10 py-2 rounded-full hover:bg-[#e88600] transition-colors duration-300'>
            <IoMdSettings onClick={()=> setOpenModal(true)} className='text-white mx-auto w-6 h-6 cursor-pointer'/>
          </div>
          <div className='text-center'>
            <p className='text-sm text-gray-500'>Delivery address</p>
            <h3 className='font-semibold text-[18px]'>Boys Hostel</h3>
          </div>
          <div onClick={()=>(navigate('/feedback'))} className='relative bg-[#D9D9D9] px-3 py-3 rounded-full hover:bg-gray-300 transition-colors duration-300 cursor-pointer'>
            <MdFeedback className='w-6 h-6'/>
            <div className='bg-[#FA9302] absolute -right-0 -top-1 py-2 px-2 rounded-full'></div>
          </div>
        </div>

        {/* Welcome Message - New personalized section */}
        <div className='mx-5 mt-4'>
          <h2 className='text-xl font-bold montserrat'>
            {currentUser?.name ? `Hello, ${currentUser.name.split(' ')[0]}! 👋` : 'Welcome! 👋'}
          </h2>
          <p className='text-sm text-gray-500'>What would you like to eat today?</p>
        </div>
        
        {/* Search Bar with improved styling */}
        <div className='mx-auto flex mt-4'>
          <div className='relative w-[348px] mx-auto'>
            <input 
              onClick={()=>navigate('/search')} 
              type='search' 
              placeholder='Search for meals...' 
              className='w-full h-[54px] border-none outline-none mx-auto rounded-xl py-3 pl-10 pr-4 bg-[#E5E5E5] focus:ring-2 focus:ring-[#FA9302] transition-all duration-300'
            />
            <Search className='absolute left-3 top-4 text-gray-400 w-5 h-5' />
          </div>
        </div>
        
        {/* Promotional Banner with improved design */}
        <div className='mx-auto py-4 w-[348px] px-4 flex h-[54px] bg-gradient-to-r from-[#FA9302] to-[#ffb44e] rounded-xl text-white mt-4 shadow-md'>
          <p className='text-sm flex gap-2 items-center font-medium'>
            <span className='bg-white text-[#FA9302] p-1 rounded-md'><FaCheckSquare className='rounded-[100%] font-semibold'/></span>
            Delivery is 70% cheaper with free delivery on first order!
          </p>
        </div>
      </section>
      
      {/* Main Content Section */}
      <div className='mt-4 bg-white border-[1px] shadow-[0px_-5px_10px_rgba(0,0,0,0.1)] border-gray-50 rounded-3xl w-full pb-20'>
        
        {/* Categories Section with improved styling */}
        <section className='px-4 pt-6'>
          <div className='section-header'>
            <h2 className='section-title'>Categories</h2>
            <p className='section-link'>View All</p>
          </div>

          {/* Categories Horizontal Scroll with improved visuals */}
          <div className='flex overflow-x-auto hide-scrollbar items-center gap-4 mt-3 pb-2'>
            <div onClick={() => setSelectedCategory(null)} className={`flex-shrink-0 flex flex-col items-center ${selectedCategory === null ? 'scale-110' : ''}`}>
              <div className={`w-[65px] h-[65px] rounded-full flex items-center justify-center ${selectedCategory === null ? 'bg-[#FA9302]' : 'bg-[#f2f2f2]'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke={selectedCategory === null ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className={`text-sm mt-1 ${selectedCategory === null ? 'font-medium text-[#FA9302]' : 'font-light'}`}>All</p>
            </div>
            {
              [...new Map(allProducts.map(product => [product.category, product])).values()]
                .slice(0, 5) 
                .map((product) => (
                  <div 
                    onClick={() => setSelectedCategory(product.category)} 
                    key={product._id} 
                    className={`flex-shrink-0 flex flex-col items-center transition-transform duration-200 ${selectedCategory === product.category ? 'scale-110' : ''}`}
                  >
                    <div className={`relative w-[65px] h-[65px] rounded-full border-2 ${selectedCategory === product.category ? 'border-[#FA9302]' : 'border-transparent'} overflow-hidden`}>
                      <img 
                        className='w-full h-full object-cover' 
                        src={product.productImage} 
                        alt={product.category} 
                      />
                      {selectedCategory === product.category && 
                        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
                      }
                    </div>
                    <p className={`text-sm mt-1 ${selectedCategory === product.category ? 'font-medium text-[#FA9302]' : 'font-light'}`}>
                      {product.category.slice(0, 15)}
                    </p>
                  </div>
                ))
            }
          </div>
        </section>

        {/* Featured Items - Enhanced Section */}
        <section className='px-4 mt-6'>
          <div className='featured-section product-section'>
            <div className='section-header'>
              <h2 className='section-title'>Today's Special</h2>
              <p className='section-link'>See All</p>
            </div>
            <div className='flex overflow-x-auto hide-scrollbar gap-4 pb-2'>
              {allProducts.slice(0, 3).map((product) => (
                <div key={`featured-${product._id}`} className='flex-shrink-0 w-[200px] product-card'>
                  <div className='product-image-container'>
                    <img className='w-full h-[120px] object-cover' src={product.productImage} alt={product.productName} />
                    <div className='product-badge badge-sale'>Special</div>
                  </div>
                  <div className='p-3'>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-medium text-base'>{product.productName}</h3>
                      <MdFavoriteBorder className='text-[#FA9302] w-5 h-5' />
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <p className='font-bold text-[#FA9302]'>GHS {product.productPrice}</p>
                      <button 
                        className='p-2 rounded-full bg-[#FA9302] text-white hover:bg-[#e88600] transition-colors duration-300'
                        onClick={() => {
                          if(product.numberOfProductsAvailable === 0){
                            toast.error('Product not available')
                          } else {
                            handleCart(product)
                          }
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers Section with enhanced design */}
        <section className='px-4 mt-6'>
          <div className='best-sellers-section product-section'>
            <div className='section-header'>
              <h2 className='section-title flex items-center'>
                <svg className='w-5 h-5 mr-2 text-[#FA9302]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="#FA9302" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Best Sellers
              </h2>
              <p className='section-link'>See All</p>
            </div>
            
            <div className='grid grid-cols-2 gap-4 mt-3'>
              {filteredProducts.slice(0, 6).map((product, index) => (
                <div key={product._id} className='product-card relative transform transition-all duration-300 hover:scale-[1.02]'>
                  {/* Bestseller ribbon for top 3 products */}
                  {index < 3 && (
                    <div className='bestseller-ribbon'>
                      #{index + 1} Best Seller
                    </div>
                  )}
                  
                  <div className='product-image-container'>
                    <img 
                      className='w-full h-[130px] object-cover' 
                      src={product.productImage} 
                      alt={product.productName} 
                    />
                    {product.numberOfProductsAvailable <= 3 && product.numberOfProductsAvailable > 0 && (
                      <div className='product-badge badge-limited'>
                        Only {product.numberOfProductsAvailable} left
                      </div>
                    )}
                    {product.numberOfProductsAvailable === 0 && (
                      <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                        <p className='text-white font-bold'>Out of Stock</p>
                      </div>
                    )}
                  </div>
                  
                  <div className='p-3'>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-medium text-sm line-clamp-1'>{product.productName}</h3>
                      <MdFavoriteBorder className='text-[#FA9302] w-4 h-4 flex-shrink-0 ml-1' />
                    </div>
                    
                    {/* Star rating display */}
                    <div className='flex items-center mt-1'>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < (5 - index * 0.5) ? 'text-[#FA9302]' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                      <span className='text-xs text-gray-500 ml-1'>({Math.floor(Math.random() * 50) + 50})</span>
                    </div>
                    
                    <div className='flex justify-between items-center mt-2'>
                      <p className='font-bold text-sm text-[#FA9302]'>GHS {product.productPrice}</p>
                      <button 
                        className='py-1 px-3 rounded-3xl bg-[#FA9302] text-xs text-white hover:bg-[#e88600] transition-colors duration-300 font-medium shadow-sm'
                        onClick={() => {
                          if(product.numberOfProductsAvailable === 0){
                            toast.error('Product not available')
                          } else {
                            handleCart(product)
                          }
                        }}
                        disabled={product.numberOfProductsAvailable === 0}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* New Arrivals Section */}
        <section className='px-4 mt-6'>
          <div className='new-arrivals-section product-section'>
            <div className='section-header'>
              <h2 className='section-title'>New Arrivals</h2>
              <p className='section-link'>View All</p>
            </div>
            
            <div className='mt-3 overflow-x-auto hide-scrollbar'>
              <div className='flex gap-4 pb-2'>
                {allProducts.slice(0, 4).reverse().map((product) => (
                  <div key={`new-${product._id}`} className='flex-shrink-0 w-[160px] product-card'>
                    <div className='product-image-container'>
                      <img className='w-full h-[100px] object-cover' src={product.productImage} alt={product.productName} />
                      <div className='product-badge badge-new'>New</div>
                    </div>
                    <div className='p-3'>
                      <h3 className='font-medium text-sm line-clamp-1'>{product.productName}</h3>
                      <div className='flex justify-between items-center mt-2'>
                        <p className='font-bold text-sm text-[#FA9302]'>GHS {product.productPrice}</p>
                        <button 
                          className='p-1 rounded-full bg-[#FA9302] text-white hover:bg-[#e88600] transition-colors duration-300'
                          onClick={() => {
                            if(product.numberOfProductsAvailable === 0){
                              toast.error('Product not available')
                            } else {
                              handleCart(product)
                            }
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Combinations - New Section */}
        <section className='px-4 mt-6 mb-6'>
          <div className='product-section' style={{background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)'}}>
            <div className='section-header'>
              <h2 className='section-title'>Popular Combinations</h2>
              <p className='section-link'>View All</p>
            </div>
            
            <div className='mt-3'>
              {allProducts.length >= 4 && (
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-3 bg-white p-3 rounded-xl'>
                    <div className='w-20 h-20 rounded-lg overflow-hidden'>
                      <img className='w-full h-full object-cover' src={allProducts[0].productImage} alt={allProducts[0].productName} />
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-medium'>Breakfast Combo</h3>
                      <p className='text-sm text-gray-500 mt-1'>{allProducts[0].productName} + {allProducts[1].productName}</p>
                      <div className='flex justify-between items-center mt-2'>
                        <p className='font-bold text-[#FA9302]'>GHS {(Number(allProducts[0].productPrice) + Number(allProducts[1].productPrice) - 5).toFixed(2)}</p>
                        <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>Save GHS 5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex gap-3 bg-white p-3 rounded-xl'>
                    <div className='w-20 h-20 rounded-lg overflow-hidden'>
                      <img className='w-full h-full object-cover' src={allProducts[2].productImage} alt={allProducts[2].productName} />
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-medium'>Lunch Special</h3>
                      <p className='text-sm text-gray-500 mt-1'>{allProducts[2].productName} + {allProducts[3].productName}</p>
                      <div className='flex justify-between items-center mt-2'>
                        <p className='font-bold text-[#FA9302]'>GHS {(Number(allProducts[2].productPrice) + Number(allProducts[3].productPrice) - 8).toFixed(2)}</p>
                        <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>Save GHS 8</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom Navigation Bar with improved styling */}
        <div className='fixed bottom-5 left-0 right-0 mx-auto flex justify-center items-center z-50'>
          <div className="flex justify-around w-[90%] mx-auto h-[60px] items-center bg-black text-white py-3 rounded-3xl shadow-lg">
            {/* Home Icon */}
            <div 
              className={`flex flex-col items-center ${activeIcon === 'home' ? 'text-[#FA9302]' : 'text-white hover:text-gray-300'} transition-colors duration-300`}
              onClick={() => {
                handleIconClick('home')
                navigate('/home')
              }}
            >
              <HiOutlineHome className={`w-[25px] h-[25px]`} />
              <p className='text-xs mt-1'>Home</p>
            </div>
            
            {/* Catalog Icon */}
            <div  
              className={`flex flex-col items-center ${activeIcon === 'search' ? activeClass : baseClass} transition-colors duration-300`}
              onClick={() =>{ 
                handleIconClick('search')
                navigate('/search')
              }}
            >
              <svg className='w-[25px] h-[25px]' width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3.25H18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <line x1="14.5" y1="6.75" x2="24.5" y2="6.75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.55557 2.08334C4.84298 2.08334 1.83334 5.09298 1.83334 8.80557C1.83334 12.5182 4.84298 15.5278 8.55557 15.5278C12.2682 15.5278 15.2778 12.5182 15.2778 8.80557C15.2778 7.90084 15.0991 7.03786 14.775 6.25H16.7229C16.9752 7.05702 17.1111 7.91542 17.1111 8.80557C17.1111 10.8379 16.4025 12.7047 15.2189 14.1725L21.7315 20.6852C22.0895 21.0432 22.0895 21.6235 21.7315 21.9815C21.3735 22.3395 20.7932 22.3395 20.4352 21.9815L13.9225 15.4689C12.4547 16.6525 10.5879 17.3611 8.55557 17.3611C3.83046 17.3611 0 13.5307 0 8.80557C0 4.08046 3.83046 0.25 8.55557 0.25C11.6063 0.25 14.284 1.8467 15.7987 4.25H13.4988C12.2705 2.91782 10.5105 2.08334 8.55557 2.08334Z" fill="currentColor"/>
              </svg>
              <p className='text-xs mt-1'>Catalog</p>
            </div>
            
            {/* Cart Icon with Badge */}
            <div 
              className={`relative flex flex-col items-center ${activeIcon === 'bag' ? 'text-[#FA9302]' : 'text-white hover:text-gray-300'} transition-colors duration-300`}
              onClick={() => {  
                handleIconClick('bag')
                if(cart.length === 0){
                  toast.error('Cart is empty')
                } else {
                  navigate('/cart-page')
                }
              }}
            >
              <MdOutlineShoppingBag className={`w-[25px] h-[25px]`} />
              <p className='text-xs mt-1'>Cart</p>
              {getTotalQuantity() > 0 && (
                <div className="absolute -top-2 -right-2 bg-[#FA9302] rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  <p className="text-xs text-white font-bold">{getTotalQuantity()}</p>
                </div>
              )}
            </div>
            
            {/* Profile Icon */}
            <div 
              onClick={() => {
                handleIconClick('profile')
                navigate('/profiles')
              }} 
              className={`flex flex-col items-center ${activeIcon === 'profile' ? activeClass : baseClass} transition-colors duration-300`}
            >
              <svg className={`w-[25px] h-[25px]`} width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0848 12.0346C16.1685 11.1819 16.9596 10.0127 17.3478 8.68948C17.7361 7.3663 17.7023 5.955 17.2512 4.65192C16.8 3.34884 15.9539 2.21878 14.8306 1.41896C13.7073 0.619139 12.3626 0.189331 10.9836 0.189331C9.60463 0.189331 8.25995 0.619139 7.13662 1.41896C6.0133 2.21878 5.1672 3.34884 4.71604 4.65192C4.26488 5.955 4.23109 7.3663 4.61937 8.68948C5.00765 10.0127 5.7987 11.1819 6.88245 12.0346C5.02541 12.7786 3.40508 14.0126 2.1942 15.605C0.983314 17.1975 0.227271 19.0887 0.00666779 21.077C-0.00930062 21.2222 0.00348032 21.3691 0.0442806 21.5093C0.0850808 21.6495 0.153101 21.7803 0.244459 21.8943C0.428964 22.1244 0.697323 22.2718 0.990502 22.304C1.28368 22.3363 1.57766 22.2508 1.80778 22.0662C2.03789 21.8817 2.18528 21.6134 2.21753 21.3202C2.46027 19.1593 3.49064 17.1636 5.11179 15.7143C6.73294 14.2651 8.83122 13.4639 11.0057 13.4639C13.1802 13.4639 15.2785 14.2651 16.8996 15.7143C18.5208 17.1636 19.5512 19.1593 19.7939 21.3202C19.8239 21.5918 19.9536 21.8427 20.1577 22.0244C20.3618 22.2061 20.626 22.3057 20.8993 22.304H21.0209C21.3107 22.2707 21.5755 22.1242 21.7578 21.8964C21.94 21.6686 22.0248 21.3781 21.9937 21.0881C21.7721 19.0941 21.0119 17.198 19.7948 15.6031C18.5777 14.0082 16.9495 12.7746 15.0848 12.0346ZM10.9836 11.2497C10.1091 11.2497 9.25417 10.9904 8.52703 10.5045C7.79988 10.0187 7.23313 9.32808 6.89846 8.52012C6.56379 7.71215 6.47623 6.82309 6.64684 5.96536C6.81745 5.10763 7.23858 4.31975 7.85697 3.70136C8.47536 3.08297 9.26324 2.66184 10.121 2.49123C10.9787 2.32062 11.8678 2.40818 12.6757 2.74285C13.4837 3.07752 14.1743 3.64427 14.6601 4.37142C15.146 5.09857 15.4053 5.95346 15.4053 6.828C15.4053 8.00071 14.9395 9.12539 14.1102 9.95463C13.281 10.7839 12.1563 11.2497 10.9836 11.2497Z" fill="currentColor"/>
              </svg>
              <p className='text-xs mt-1'>Profile</p>
            </div>
          </div>
        </div>
        </div>
        {openModal && (
      <Modal show={openModal} size="md" position='center' onClose={() => setOpenModal(false)} popup>
        {
          currentUser.phoneNumber === null ? '' : <Modal.Header />
        }
        <Modal.Body>
          <form onSubmit={handleUpdateClientUserSubmit} className="text-center montserrat">
            <h1 className='text-xl font-medium mt-5'>Enter your phone number</h1>
            <p className='text-sm text-[#4a4545]'>Please enter your phone number to use this application</p>
            <div className='mx-auto flex mt-5'>
              <input onChange={handleClientUserChange} value={currentUser.name} readOnly type='text' className='w-[348px] h-[54px] border-none outline-none mx-auto rounded-xl py-3 bg-[#E5E5E5]' />
            </div>
            <div className='mx-auto flex mt-5'>
              <input onChange={handleClientUserChange} value={currentUser.email} readOnly type='text' className='w-[348px] h-[54px] border-none outline-none mx-auto rounded-xl py-3 bg-[#E5E5E5]' />
            </div>
            <div className='mx-auto flex mt-5'>
              <input onChange={handleClientUserChange} value={currentUser.phoneNumber && currentUser.phoneNumber} id='phoneNumber' type='number' placeholder='Enter your phone number' className='w-[348px] h-[54px] border-none outline-none mx-auto rounded-xl py-3 bg-[#E5E5E5]' />
            </div>
            <div className='flex justify-between mt-8 items-center mx-auto bg-black text-white py-3 px-5 rounded-3xl'>
              <button className='text-center font-semibold mx-auto' disabled={loading} type='submit'>Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )}
    </main>
  )
}

export default ClientHome