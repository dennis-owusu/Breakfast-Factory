/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoreHorizontal } from 'lucide-react';
import { IoMdCheckmark } from 'react-icons/io';
import { FaXmark } from 'react-icons/fa6';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
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
} from '../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../redux/userSlice';

const UsersComp = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const [formData, setFormData] = useState({})
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    dispatch(updateStart())
    try {
      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(res.ok){
        dispatch(updateSuccess(data))
        toast.success('User profile updated successfully',{
          position: 'top-right'
        })
        }else{
          dispatch(updateFailure(data.message))
      }
    } catch (error) {
      toast.error('Something went wrong',{
        position:'top-right'
      })
    }
  }

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  
  const handleDeleteUser = async (userIdToDelete) => {
    try {
      const res = await fetch(`/api/auth/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        setAllUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        toast.success('User deleted successfully',{
          position: 'top-right'
        });
      }
    } catch (error) {
      toast.error('An error occurred while deleting the user');
    }finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/auth/allusers');
        const data = await res.json();
        if (res.ok) {
          setAllUsers(data.allusers);
        } else {
          toast.error('Failed to load users');
        }
      } catch (error) {
        toast.error('An error occurred while fetching users, check your internet connection');
      } finally {
        setLoading(false); 
      }
    };
    fetchUsers();
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
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user) => (
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
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.email}</Badge>
                  </TableCell>
                  <TableCell>
                  {user.isAdmin ? (
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
                        <DropdownMenuItem>
                        <Dialog>
      <DialogTrigger asChild>
        <button onClick={(e)=>e.stopPropagation()}>Edit</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
       <form onSubmit={handleSubmit}>
       <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Business Name
            </Label>
            <Input
            onClick={(e)=>e.stopPropagation()}
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
            onClick={(e)=>e.stopPropagation()}
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
            onClick={(e)=>e.stopPropagation()}
              id="password"
              placeholder='***************'
              onChange={handleChange}
              className="col-span-3"
            />
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
};

export default UsersComp;
