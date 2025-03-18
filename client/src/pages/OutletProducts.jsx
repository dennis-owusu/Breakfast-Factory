/* eslint-disable react/no-unescaped-entities */
import { MoreHorizontal } from "lucide-react";
// Initialization for ES Users
import { Button } from "../components/ui/button";
import {Modal} from 'flowbite-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase.config";
import { CircularProgressbar } from "react-circular-progressbar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";


const OutletProduct = () => {

  const [openModal, setOpenModal] = useState(false);

  const emailInputRef = useRef(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const {currentUser} = useSelector((state)=> state.user)
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [categoryData, setCategoryData] = useState([])
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        toast.error('Please select an image');
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          toast.error('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setFormData({ ...formData, productImage: downloadURL });
          });
        }
      );
    } catch (error) {
      toast.error('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  const handleDeleteProduct = async (productIdToDelete) => {
    try {
      const res = await fetch(`/api/route/delete/${productIdToDelete}/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data === false) {
        toast.error(data.message);
      } else {
        setAllProducts((prev) => prev.filter((product) => product._id !== productIdToDelete));
        toast.success('Product has been deleted successfully', {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product");
    }
  };

 
  const handleUpdateSubmit = async(e)=>{
    e.preventDefault();
    
    setLoading(true);
    try {
      const res = await fetch(`/api/route/update/${formData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(res.ok){
        setFormData(data)
        toast.success('Product updated successfully',{
          position: 'top-right'
        })
        }else{
          toast(data.message,{
            position:'top-right'
          })
      }
    } catch (error) {
      toast.error('Something went wrong',{
        position:'top-right'
      })
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    const fetchCategory = async() =>{
      const res = await fetch('/api/route/allcategories',{
        method: 'GET',
      })
      const data = await res.json() 
      if(res.ok){
        setCategoryData(data.allCategory.reverse())
      }else{
        toast.error(data.message,{
          position:'top-right'
        })
      }
    }
    
    fetchCategory()
  }, [])
  
  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
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
    setLoading(false)
   if(loading) {
    setLoading(true);
   }else{
    setLoading(false);
   }
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/route/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      if (res.ok) {
        toast.success('Product uploaded successfully',{
          position: 'top-right'
        });
        navigate('/outlet-dashboard?tab=products')
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
 
      loading ? <div className="flex min-h-screen items-center justify-center gap-2"><div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div></div>:
        <Card>
          <CardHeader>
            <CardTitle>
            <div className="flex justify-between items-center">
                <p>Products</p>
                <Dialog>
                  <DialogTrigger asChild>
                <Button style={{borderRadius:'6px'}} type="button">Add a Product</Button>
                  </DialogTrigger>
        <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex justify-center items-center">
          <div className="flex text-sm items-center gap-16 justify-between p-3">
            <input accept='image/*' onChange={(e) => setFile(e.target.files[0])}
              id="productImage"
              type='file'
              placeholder="Enter product ID"
              className="col-span-3"
            />

          <Button type='button' className="mr-1" style={{borderRadius:'6px'}}  onClick={handleUpdloadImage}
            disabled={imageUploadProgress}> 
              {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}

                  />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
          </div>
          </div>
          {formData.productImage && (
          <img
            src={formData.productImage}
            alt='upload'
            className='w-36 mx-auto h-24'
          />
        )}
          <div className="flex justify-center ml-2 mr-5 items-center gap-2">

          <Select onValueChange={handleCategoryChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className='z-[2060]'>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {Array.isArray(categoryData) && categoryData.length > 0 ? (
        categoryData.map((category) => (
          <SelectItem key={category._id} value={category.categoryName}>
            {category.categoryName}
          </SelectItem>
        ))
      ) : (
        <SelectItem disabled>No categories available</SelectItem>
      )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

         
          </div>
          
          <div className="flex mr-5 ml-2 flex-col items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Product Name
            </Label>
            <Input onChange={handleChange}
              id="productName"
              placeholder="Enter product name"
              className="col-span-3"
            />
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">

          <div className="flex flex-col ml-2 mr-5 items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input onChange={handleChange}
            type="number"
            defaultValue='0'
              id="productPrice"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col mr-5 items-center gap-2">
            <Label htmlFor="username" className="text-right">
              Number of Products available 
            </Label>
            <Input onChange={handleChange}
              id="numberOfProductsAvailable"
              placeholder="Available products"
              className="col-span-3"
            />
          </div>
          </div>
        </form>
          <div className="flex justify-between items-center">
        <button>Close</button>
        <Button size='lg' style={{borderRadius:'6px'}} onClick={handleSubmit} type="submit" >Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
                </div>
                {/* flowbite */}
            </CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="table-cell">
                    Image
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="table-cell">Price</TableHead>
                  <TableHead className="table-cell">
                    Number of products
                  </TableHead>
                  <TableHead>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-full object-cover"
                        height="64"
                        src={
                          product.productImage ||
                          "https://via.placeholder.com/64"
                        } // Fallback image
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.productName}
                    </TableCell>
                    <TableCell className=" table-cell">
                      ${product.productPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className=" table-cell">
                      {product.numberOfProductsAvailable}
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only"></span>
                          </Button>
                        </DropdownMenuTrigger>
  
  <DropdownMenuContent align="end">
    
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem>
    <Dialog>
      <DialogTrigger asChild>
      <button onClick={(e) => {
        setFormData({
          _id: product._id,
          productName: product.productName,
          productPrice: product.productPrice,
          numberOfProductsAvailable: product.numberOfProductsAvailable,
        });
        e.stopPropagation();
      }}>
        Edit
      </button>
      </DialogTrigger>
      <DialogContent className="max-w-full">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
       <form onSubmit={handleUpdateSubmit}>
        
       <Select onValueChange={handleCategoryChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {Array.isArray(categoryData) && categoryData.length > 0 ? (
        categoryData.map((category) => (
          <SelectItem key={category._id} value={category.categoryName}>
            {category.categoryName}
          </SelectItem>
        ))
      ) : (
        <SelectItem disabled>No categories available</SelectItem>
      )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

       <div className="grid gap-4 py-4">
          <div className="flex flex-col justify-center items-start gap-2">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input
            onClick={(e)=>e.stopPropagation()}
              id="productName"
              defaultValue={product.productName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col justify-center items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input
            onClick={(e)=>e.stopPropagation()}
              id="productPrice"
              defaultValue={product.productPrice}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <Label htmlFor="username" className="text-right">
             Products Available
            </Label> 
            <Input
            onClick={(e)=>e.stopPropagation()}
              id="numberOfProductsAvailable"
              onChange={handleChange}
              defaultValue={product.numberOfProductsAvailable}
              className="col-span-3"
            />
          </div>
          </div>
        </div>
        <DialogFooter style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
            <DialogClose asChild>
            <Button size='lg' style={{borderRadius:'6px'}} variant='outline'>Close</Button>
            </DialogClose>
          <Button size='lg' style={{borderRadius:'6px'}} type="submit">Update</Button>
        </DialogFooter>
       </form>
      </DialogContent>
    </Dialog>
    </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteProduct(product._id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

export default OutletProduct;
