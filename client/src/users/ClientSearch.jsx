import { addToCart } from '../redux/cartSlice';
import { useEffect, useState } from 'react';
import { HiOutlineHome } from 'react-icons/hi';
import { MdFavoriteBorder, MdOutlineShoppingBag } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ClientSearch = () => {
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [activeIcon, setActiveIcon] = useState(null);

    const getTotalQuantity = () => {
        let total = 0
        cart.forEach(item => {
          total += item.quantity
        })
        return total
      }

    const {cart} = useSelector((state) => state.cart)

    const handleIconClick = (icon) => {
        setActiveIcon((prevIcon) => (prevIcon === icon ? null : icon));
      };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

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
    const handleSearchEnter = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    const activeClass = 'text-[#FA9302]'; // Style for active icon
  const baseClass = 'text-white';
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
                toast.error('An error occurred while fetching products, check your internet connection');
            } finally {
                setLoading(false); 
            }
        };
        fetchAllProducts();
    }, []);

    const filteredProducts = allProducts.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div>
            <div className='mx-auto items-center justify-center flex mt-5'>
                <input
                    autoFocus
                    type='search'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchEnter}
                    className='w-[348px] h-[54px] border-none outline-none mx-auto rounded-xl py-3 bg-[#E5E5E5]'
                />
            </div>
            {
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
            <div className='grid grid-cols-2 items-center space-x-6 mt-3 space-y-3'>
                    {
                        filteredProducts.map((product)=>(
                            <div key={product._id} className=' flex flex-col justify-center items-center'>
                                <div className='py-4  px-4  space-x-6'>
                                    <img className='w-[170px] rounded-3xl h-[141px]' src={product.productImage}/>
                                </div>
                                <div className='flex justify-center text-lg space-x-5 items-center'>
                                    <p className='montserrat font-medium'>{product.productName}</p>
                                    <MdFavoriteBorder className='text-[#FA9302]'/>
                                </div>

                                    <div className='flex justify-between gap-7 items-center'>
                                        <p className='montserrat font-semibold text-[12px]'>GHS {product.productPrice}</p>
                                        <button className='py-1 rounded-3xl px-2 max-w-full bg-[#FA9302] text-sm text-white'  onClick={()=>{
                            if(product.numberOfProductsAvailable === 0){
                              toast.error('Product not available')
                            }else{
                              handleCart(product)
                            }
                          }}>Add to cart</button>
                                    </div>
                            </div>
                        ))
                    }
                </div>
            }

                <div className='w-full  mx-auto flex justify-center items-center'>

<div className="flex bottom-10 justify-around fixed mt-4 w-[90%] mx-auto self-center h-[52px] items-center bg-black text-white py-3 rounded-3xl">
<div className='flex flex-col items-center'>
<HiOutlineHome
className={`w-[25px] h-[25px] ${activeIcon === 'home' ? 'text-[#FA9302]' : ''}`}
onClick={() => {
    handleIconClick('home')
    navigate('/home')
}}
/>
<p className='text-sm'>Home</p>
</div>

<div  className={`flex flex-col items-center ${activeIcon === 'search' ? activeClass : baseClass}`}>
<svg className='w-[25px] h-[25px] text-[#FA9302]'
 onClick={() =>{ 
    handleIconClick('search')
    navigate('/search')
    }} width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 3.25H18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
<line x1="14.5" y1="6.75" x2="24.5" y2="6.75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
<path fillRule="evenodd" clipRule="evenodd" d="M8.55557 2.08334C4.84298 2.08334 1.83334 5.09298 1.83334 8.80557C1.83334 12.5182 4.84298 15.5278 8.55557 15.5278C12.2682 15.5278 15.2778 12.5182 15.2778 8.80557C15.2778 7.90084 15.0991 7.03786 14.775 6.25H16.7229C16.9752 7.05702 17.1111 7.91542 17.1111 8.80557C17.1111 10.8379 16.4025 12.7047 15.2189 14.1725L21.7315 20.6852C22.0895 21.0432 22.0895 21.6235 21.7315 21.9815C21.3735 22.3395 20.7932 22.3395 20.4352 21.9815L13.9225 15.4689C12.4547 16.6525 10.5879 17.3611 8.55557 17.3611C3.83046 17.3611 0 13.5307 0 8.80557C0 4.08046 3.83046 0.25 8.55557 0.25C11.6063 0.25 14.284 1.8467 15.7987 4.25H13.4988C12.2705 2.91782 10.5105 2.08334 8.55557 2.08334Z" fill="currentColor"/>
</svg>
<p className='text-sm'>Catalog</p>
</div>
<div className={`relative  ${activeIcon === 'bag' ? 'text-[#FA9302]' : ''}` }>

<MdOutlineShoppingBag
className={`w-[25px] h-[25px] `}
onClick={() =>{  
    handleIconClick('bag')
    if(cart.length === 0){
        toast.error('Cart is empty')
    }else{

        navigate('/cart-page')
    }
}
}
/>
<p className='text-sm'>Cart</p>
<p className="absolute top-[-3px] right-[-7px] bg-[#FA9302] rounded-full py-[9px] text-xs px-[9px] text-white w-4 h-4 flex items-center justify-center">{getTotalQuantity() || 0}</p>
</div>

<div onClick={()=>navigate('/profiles')} className='flex flex-col items-center'>

      <svg className={`w-[25px] h-[25px] `}
        onClick={() => handleIconClick('profile')} width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0848 12.0346C16.1685 11.1819 16.9596 10.0127 17.3478 8.68948C17.7361 7.3663 17.7023 5.955 17.2512 4.65192C16.8 3.34884 15.9539 2.21878 14.8306 1.41896C13.7073 0.619139 12.3626 0.189331 10.9836 0.189331C9.60463 0.189331 8.25995 0.619139 7.13662 1.41896C6.0133 2.21878 5.1672 3.34884 4.71604 4.65192C4.26488 5.955 4.23109 7.3663 4.61937 8.68948C5.00765 10.0127 5.7987 11.1819 6.88245 12.0346C5.02541 12.7786 3.40508 14.0126 2.1942 15.605C0.983314 17.1975 0.227271 19.0887 0.00666779 21.077C-0.00930062 21.2222 0.00348032 21.3691 0.0442806 21.5093C0.0850808 21.6495 0.153101 21.7803 0.244459 21.8943C0.428964 22.1244 0.697323 22.2718 0.990502 22.304C1.28368 22.3363 1.57766 22.2508 1.80778 22.0662C2.03789 21.8817 2.18528 21.6134 2.21753 21.3202C2.46027 19.1593 3.49064 17.1636 5.11179 15.7143C6.73294 14.2651 8.83122 13.4639 11.0057 13.4639C13.1802 13.4639 15.2785 14.2651 16.8996 15.7143C18.5208 17.1636 19.5512 19.1593 19.7939 21.3202C19.8239 21.5918 19.9536 21.8427 20.1577 22.0244C20.3618 22.2061 20.626 22.3057 20.8993 22.304H21.0209C21.3107 22.2707 21.5755 22.1242 21.7578 21.8964C21.94 21.6686 22.0248 21.3781 21.9937 21.0881C21.7721 19.0941 21.0119 17.198 19.7948 15.6031C18.5777 14.0082 16.9495 12.7746 15.0848 12.0346ZM10.9836 11.2497C10.1091 11.2497 9.25417 10.9904 8.52703 10.5045C7.79988 10.0187 7.23313 9.32808 6.89846 8.52012C6.56379 7.71215 6.47623 6.82309 6.64684 5.96536C6.81745 5.10763 7.23858 4.31975 7.85697 3.70136C8.47536 3.08297 9.26324 2.66184 10.121 2.49123C10.9787 2.32062 11.8678 2.40818 12.6757 2.74285C13.4837 3.07752 14.1743 3.64427 14.6601 4.37142C15.146 5.09857 15.4053 5.95346 15.4053 6.828C15.4053 8.00071 14.9395 9.12539 14.1102 9.95463C13.281 10.7839 12.1563 11.2497 10.9836 11.2497Z" fill="white"/>
</svg>
<p className='text-sm'>Profiles</p>
</div>

{/* Add similar logic for other icons */}
</div>
</div>
        </div>
    );
};

export default ClientSearch;
