/* eslint-disable react/no-unescaped-entities */
import { MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import 'react-circular-progressbar/dist/styles.css';
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";

const OutletCategory = () => {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState([])

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const navigate = useNavigate()

  const handleDeleteCategory = async(categoryId) =>{
    const res = await fetch(`/api/route/delete/${categoryId}`,{
      method: 'DELETE',
    })
    const data = await res.json()
    if(res.ok){
      setCategoryData(categoryData.filter(category => category._id !== categoryId));
      toast.success('Category deleted successfully',{
        position:'top-right'
      })
    }else{
      toast.error(data.message,{
        position:'top-right'
      })
    }
  }
 
  const handleUpdateSubmit = async(e)=>{
    e.preventDefault();
    
    setLoading(true);
    try {
      const res = await fetch(`/api/route/update-categories/${formData._id}`, {
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

    const fetchCategory = async () => {
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
  
    useEffect(() => {
      fetchCategory();
    }, []);
  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };


  /* const newCategory = async()=>{

    const res = await fetch('/api/route/categories',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(categoryData)
    })
    const data = await res.json()
    if(res.ok){
      setCategoryData(data.allCategory)
      toast.success(data.message,{
        position:'top-right'
      })
    }else{
      toast.error(data.message,{
        position:'top-right'
      })
    }
  }

 */

const handleSubmit = async () => {
  try {
    const res = await fetch('/api/route/categories', {
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
      toast.success('Category added successfully',{
        position: 'top-right'
      });
      fetchCategory()
      navigate('/outlet-dashboard?tab=category')
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
                <p>Category</p>
                <Dialog className='overflow-scroll'>
      <DialogTrigger asChild>
        <Button style={{borderRadius:'6px'}}>Add a Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-1">
          <h1 className="text-center text-lg font-medium">Add a new category</h1>
          <div className="flex justify-between items-center">
            
         
          </div>
          
          <div className="flex flex-col justify-center items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Category Name
            </Label>
            <Input onChange={handleChange}
              id="categoryName"
              placeholder="Enter category name"
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
          <Button variant='outline' size='lg' style={{borderRadius:'6px'}}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} type="submit" size='lg' style={{borderRadius:'6px'}}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
              </div>
            </CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader> 
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryData.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">
                      {category.categoryName}
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
        e.stopPropagation();
        setFormData({
          _id:category._id,
          categoryId: category.categoryId,
          categoryName: category.categoryName,
        });
      }}>
        Edit
      </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
       <form onSubmit={handleSubmit}>
        
       <Select onValueChange={handleCategoryChange} onClick={(e)=>e.stopPropagation()}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent onClick={(e)=>e.stopPropagation()}>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {Array.isArray(categoryData) && categoryData.length > 0 ? (
        categoryData.map((category) => (
          <SelectItem key={category._id} value={category.categoryName} onClick={(e)=>e.stopPropagation()}>
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
              defaultValue={category.categoryName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
            <DialogClose asChild>
            <Button size='lg' style={{borderRadius:'6px'}} variant='outline'>Close</Button>
            </DialogClose>
          <Button size='lg' style={{borderRadius:'6px'}} type="submit" onClick={handleUpdateSubmit}>Update</Button>
        </DialogFooter>
       </form>
      </DialogContent>
    </Dialog>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={()=>{handleDeleteCategory(category._id)}
                            }>Delete</DropdownMenuItem>
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

export default OutletCategory;
