/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom"
import '../index.css'
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogClose,
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
} from "../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { IoMdCheckmark } from "react-icons/io"
import { FaXmark } from "react-icons/fa6"
import { Badge } from "../components/ui/badge"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { MoreHorizontal } from "lucide-react"

const Outlet = () => {

  const [formData, setFormData] = useState({})

  const [allOutlets, setAllOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.password){
      toast.error('Please fill out all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/outlet-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        toast.error(data.message, {
          position: 'top-right'
        })
        setLoading(false)
      }else{
        toast.success('Outlet account has been created successfully', {
          position: 'top-right'
        })
        setLoading(false)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]:e.target.value.trim()})
  }

  const handleDeleteUser = async (outletIdToDelete) => {
    try {
      const res = await fetch(`/api/auth/delete-outlet/${outletIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        setAllOutlets((prev) => prev.filter((outlet) => outlet._id !== outletIdToDelete));
        toast.success('Outlet has deleted successfully',{
          position: 'top-right'
        });
      }
    } catch (error) {
      toast.error('An error occurred while deleting the outlet');
    }finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const res = await fetch('/api/auth/all-outlets');
        const data = await res.json();
        if (res.ok) {
          setAllOutlets(data.allOutlets);
        } else {
          toast.error('Failed to load outlets');
        }
      } catch (error) {
        toast.error('An error occurred while fetching outlets, check your internet connection');
      } finally {
        setLoading(false); 
      }
    };


      fetchOutlets();

  }, []);
  return loading ? (
    <div className="flex min-h-screen items-center justify-center gap-2">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  ) : (
    <div className="max-w-[67rem]">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <p>Outlet</p>
             <Dialog>
      <DialogTrigger asChild>

            <Button size='lg' style={{borderRadius: '7px'}} >Add Outlet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add an Outlet</DialogTitle>
          <DialogDescription>
            Add or create an account for an Outlet 
          </DialogDescription>
        </DialogHeader>
             <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="col-span-3"
            onChange={handleChange}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="john@example.com"
              className="col-span-3"
            onChange={handleChange}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter Outlet password"
              className="col-span-3"
            onChange={handleChange}/>
          </div>
        </div>
        <DialogFooter style={{marginTop: '20px'}}>
        <DialogClose asChild>
        <Button type="button" variant='outline' size='lg' style={{ borderRadius: '6px' }}>Cancel</Button>
      </DialogClose>
          <Button type="submit" style={{borderRadius:'6px'}}>Create Account</Button>
        </DialogFooter>
             </form>
      </DialogContent>
    </Dialog>
            </div>
          </CardTitle>
          <CardDescription> 
            Manage your outlets and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Outlet</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOutlets.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="User profile"
                      className="aspect-square rounded-full object-cover"
                      height="64"
                      src={user.profilePicture || 'https://via.placeholder.com/64'}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.email}</Badge>
                  </TableCell>
                  <TableCell>
                  {user.userType === 2 ? (
                      <IoMdCheckmark className="text-green-500 text-lg" />
                    ) : (
                      <FaXmark className="text-red-500 text-lg" />
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only"></span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteUser(user._id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}

export default Outlet
