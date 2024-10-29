/* eslint-disable react/no-unknown-property */
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Bar, BarChart, CartesianGrid, XAxis, Label, Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart"
import '../index.css'
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import {
  CardContent,
} from "../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { useEffect, useMemo, useState } from "react"
import { FaUser } from "react-icons/fa6"
import Product from "../admin/Product"
import Category from "../admin/Category"
import UsersComp from "../admin/UsersComp"
import Outlet from "../admin/Outlet"
import Transaction from "../admin/Transaction"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { signoutSuccess } from "../redux/userSlice"
/* import { IoCartOutline } from "react-icons/io5"; */
import CartItems from "../admin/CartItems"

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [allTransaction, setAllTransaction] = useState([]);
  const [allCashPayment, setAllCashPayment] = useState([]);
  console.log(allCashPayment)
  const [allProducts, setAllProducts] = useState([])

  /* const {cart} = useSelector((state) => state.cart) */

 /*  const getTotalQuantity = () => {
    let total = 0
    cart.forEach(item => {
      total += item.quantity
    })
    return total
  }
 */
  const fetchAllTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/route/admin-transaction`);
      const data = await res.json();
      if (res.ok) {
        setAllTransaction(data.adminTransactions.reverse());
      }
    // Optionally, you can set the total amount in state
    } catch (error) {
      toast.error(`An error occurred while fetching transactions, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchAllTransactions();
  }, []);

  //cash payment
  const fetchAllCashPayment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/route/admin-get-cash-payment`);
      const data = await res.json();
      if (res.ok) {
        setAllCashPayment(data.getPayment.reverse());
      }
    // Optionally, you can set the total amount in state
    } catch (error) {
      toast.error(`An error occurred while fetching transactions, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCashPayment();
  }, []);


  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/route/allproducts");
        const data = await res.json();
        if (res.ok) {
          setAllProducts(data.products);
          const lowStockProducts = data.products.filter(product => product.numberOfProductsAvailable < 3);
          setLowStockProducts(lowStockProducts);
        }
      } catch (error) {
        toast.error('An error occurred while fetching products, check your internet connection')
      } finally {
        setLoading(false); 
      }
    };
    fetchAllProducts();
  }, []);

  const {currentUser} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today
  
  const todaysTransactions = allTransaction.filter(transaction => {
    const transactionDate = new Date(transaction.workingDay);
    return transactionDate >= startOfDay && transaction.status === 'success'; // Include only today's successful transactions
  });
  
  const todaysTotalCashAmount = todaysTransactions.reduce((total, transaction) => {
    return total + (transaction.cashAmount || 0);
  }, 0); 
  const todaysTotalEcashAmount = todaysTransactions.reduce((total, transaction) => {
    return total + (transaction.EcashAmount || 0);
  }, 0); 

 const totalAmount = allTransaction.reduce((total, transaction) => {
    return total + (transaction.amount || 0);
  }, 0);

  const handleLogout = async () =>{
    try {
      const res = await fetch('/api/auth/logout',{
        method: 'POST',
      })
      const data = await res.json()
      if(res.ok){
        dispatch(signoutSuccess(data))
        toast.success('Logout Successfully',{
          position: 'top-right'
        })
        navigate('/login')
      }else{
        toast.error(data.message, {
          position: 'top-right'
        })
      }
    } catch (error) {
toast.error(error.message)
    }
  }


  
  const chartData = [
    { days: "Monday", desktop: 186, mobile: 80 },
    { days: "Tuesday", desktop: 305, mobile: 200 },
    { days: "Wednesday", desktop: 237, mobile: 120 },
    { days: "Thursday", desktop: 73, mobile: 190 },
    { days: "Friday", desktop: 209, mobile: 130 },
    { days: "Saturday", desktop: 214, mobile: 140 },
    { days: "Sunday", desktop: 201, mobile: 160 },
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } 

  const PieData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ]
  const PieConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  }
  const totalVisitors = useMemo(() => {
    return PieData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to='/dashboard?tab=dash' className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">InvenPilot</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to='/dashboard?tab=dash'
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to='/dashboard?tab=products'
              className="flex items-center active:bg-blue-200 hover:bg-blue-200 gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Product
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {allProducts.length}
              </Badge>
            </Link>
            <Link
              to='/dashboard?tab=category'
              className="flex items-center active:bg-blue-200 hover:bg-blue-200 gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Category{" "}
            </Link>
            <Link
              to='/dashboard?tab=users'
              className="flex active:bg-blue-200 hover:bg-blue-200 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              to='/dashboard?tab=outlets'
              className="flex items-center active:bg-blue-200 hover:bg-blue-200 gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <FaUser className="h-4 w-4" />
              Outlets
            </Link>
            <Link
              to='/dashboard?tab=transactions'
              className="flex items-center active:bg-blue-200 hover:bg-blue-200 gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Transactions
            </Link>
          </nav>
        </div>
        {/* <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Latest version
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col bg-white">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">InvenPilot</span>
              </Link>
              <Link
                to='/dashboard?tab=dash'
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to='/dashboard?tab=products'
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Product
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {allProducts.length}
                </Badge>
              </Link>
              <Link
                to='/dashboard?tab=category'
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Category
              </Link>
              <Link
                to='/dashboard?tab=users'
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Users
              </Link>
              <Link
                to='/dashboard?tab=outlets'
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Outlet
              </Link>
              <Link
                to='/dashboard?tab=transactions'
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Transactions
              </Link>
            </nav>
  
            <div className="mt-auto">
              {/* <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our
                    support team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card> */}
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        {/* <div onClick={()=>navigate('/dashboard?tab=cart-items')} className="relative rounded-full hover:bg-gray-200 duration-200 transition-all ease-in-out cursor-pointer py-1 px-1">
          <IoCartOutline className="relative w-8 h-8" />
          <p className="absolute top-[-1px] right-[-3px] bg-red-500 rounded-full py-[9px] text-xs px-[9px] text-white w-4 h-4 flex items-center justify-center">{getTotalQuantity() || 0}</p>
        </div> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {
                currentUser ? (
                  <img className="rounded-full" src={currentUser.profilePicture} />
                ) : (
                  <CircleUser className="h-5 w-5" />
                )
              }
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <hr />
            <DropdownMenuLabel>@{currentUser?.username}</DropdownMenuLabel>
            <DropdownMenuLabel>@{currentUser?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {tab === 'products' && <Product/>}
      {/* category... */}
      {tab === 'category' && <Category/>}
      {/* users */}
      {tab === 'users' && <UsersComp/>}
      {/* outlet  */}
      {tab === 'outlets' && <Outlet/>}
      {/* transactions */}
      {tab === 'transactions' && <Transaction/>}
      {tab === 'cart-items' && <CartItems/>}
         {tab === 'dash' && <div>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventor</h1>
          </div>
          <div
            className="flex items-center rounded-lg shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            {/* form will be here */}
      <div className="flex flex-wrap items-center w-full">

<article className="rounded-lg border border-gra-100 bg-white p-6 w-96 md:w-72">
  <div className="flex items-center justif-between">
    <div>
      <p className="text-sm text-gra-500">Current Stock Level </p>

      <p className="text-2xl font-medium text-gra-900">{allProducts.length}</p>
    </div>

    <span className="rounded-full bg-blue-100 p-3 text-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </span>
  </div>
</article>
<article className="rounded-lg border border-gra-100 bg-white p-6 w-96 md:w-72">
  <div className="flex items-center justif-between">
    <div>
      <p className="text-sm text-gra-500">Products Low in Stock</p>

      <p className="text-2xl font-medium text-gra-900">{lowStockProducts.length}</p>
    </div>

    <span className="rounded-full bg-blue-100 p-3 text-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </span>
  </div>
</article>
<article className="rounded-lg border border-gra-100 bg-white p-6 w-96 md:w-72">
  <div className="flex items-center justif-between">
    <div>
      <p className="text-sm text-gra-500">Earnings Today</p>

      <p className="text-2xl font-medium text-gra-900">GH₵ {(todaysTotalEcashAmount + todaysTotalCashAmount).toFixed(2)}</p>
    </div>

    <span className="rounded-full bg-blue-100 p-3 text-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </span>
  </div>
</article>
<article className="rounded-lg border border-gra-100 bg-white p-6 w-96 md:w-72">
  <div className="flex items-center justif-between">
    <div>
      <p className="text-sm text-gra-500">Today’s Cash</p>

      <p className="text-2xl font-medium text-gra-900">GH₵ {todaysTotalCashAmount.toFixed(2)}</p>
    </div>

    <span className="rounded-full bg-blue-100 p-3 text-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </span>
  </div>
</article>
<article className="rounded-lg border border-gra-100 bg-white p-6 w-96 md:w-72">
  <div className="flex items-center justif-between">
    <div>
      <p className="text-sm text-gra-500">Today’s E-Cash</p>

      <p className="text-2xl font-medium text-gra-900">GH₵ {todaysTotalEcashAmount.toFixed(2)}</p>
    </div>

    <span className="rounded-full bg-blue-100 p-3 text-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </span>
  </div>
</article>
      </div>

          </div>
<div className="flex justif-center items-center gap-5 flex-col md:flex-row">
<div className="w-[23rem] md:w-[30rem] h-72">
     
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="days"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
</div>
{/* pie chart */}
<div className="yw-[23rem] md:yw-[30rem] yh-72">

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={PieConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={PieData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
</div>

</div>
          </div>}
        </main>
    </div>
  </div>
  
  )
}

export default Dashboard
