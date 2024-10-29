/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom"
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { useMemo } from "react"

const Dashboard = () => {
  return (
    <div className="ygrid ymin-h-screen yw-full md:ygrid-cols-[220px_1fr] lg:ygrid-cols-[280px_1fr]">
      <div className="yhidden yborder-r ybg-muted/40 md:yblock">
        <div className="yflex yh-full ymax-h-screen yflex-col ygap-2">
          <div className="yflex yh-14 yitems-center yborder-b ypx-4 lg:yh-[60px] lg:ypx-6">
            <Link href="/" className="yflex yitems-center ygap-2 yfont-semibold">
              <Package2 className="yh-6 yw-6" />
              <span className="">InvenPilot</span>
            </Link>
            <Button variant="outline" size="icon" className="yml-auto yh-8 yw-8">
              <Bell className="yh-4 yw-4" />
              <span className="ysr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="yflex-1">
            <nav className="ygrid yitems-start ypx-2 ytext-sm yfont-medium lg:ypx-4">
              <Link
                href="#"
                className="yflex yitems-center ygap-3 yrounded-lg ybg-muted ypx-3 ypy-2 ytext-primary ytransition-all yhover:text-primary"
              >
                <Home className="yh-4 yw-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="yflex yitems-center ygap-3 yrounded-lg ypx-3 ypy-2 ytext-muted-foreground ytransition-all yhover:text-primary"
              >
                <ShoppingCart className="yh-4 yw-4" />
                Product 
              </Link>
              <Link
                href="#"
                className="yflex yitems-center ygap-3 yrounded-lg ypx-3 ypy-2 ytext-muted-foreground ytransition-all yhover:text-primary"
              >
                <ShoppingCart className="yh-4 yw-4" />
                Category 
              </Link>
              <Link
                href="#"
                className="yflex yitems-center ygap-3 yrounded-lg ypx-3 ypy-2 ytext-muted-foreground ytransition-all yhover:text-primary"
              >
                <Package className="yh-4 yw-4" />
                Users
              </Link>
              <Link
                href="#"
                className="yflex yitems-center ygap-3 yrounded-lg ypx-3 ypy-2 ytext-muted-foreground ytransition-all yhover:text-primary"
              >
                <Users className="yh-4 yw-4" />
               Outlet
              </Link>
              <Link
                href="#"
                className="yflex yitems-center ygap-3 yrounded-lg ypx-3 ypy-2 ytext-muted-foreground ytransition-all yhover:text-primary"
              >
                <LineChart className="yh-4 yw-4" />
                Transactions
              </Link>
            </nav>
          </div>
          {/* <div className="ymt-auto yp-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="yp-2 ypt-0 md:yp-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="yp-2 ypt-0 md:yp-4 md:yt-0">
                <Button size="sm" className="yw-full">
                  Latest version
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
      <div className="yflex yflex-col">
        <header className="yflex yh-14 yitems-center ygap-4 yborder-b ybg-muted/40 ypx-4 lg:yh-[60px] lg:ypx-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="yshrink-0 md:yhidden"
              >
                <Menu className="yh-5 yw-5" />
                <span className="ysr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="yflex yflex-col ybg-white">
              <nav className="ygrid ygap-2 ytext-lg yfont-medium">
                <Link
                  href="#"
                  className="yflex yitems-center ygap-2 ytext-lg yfont-semibold"
                >
                  <Package2 className="yh-6 yw-6" />
                  <span className="ysr-only">InvenPilot</span>
                </Link>
                <Link
                  href="#"
                  className="ymx-[-0.65rem] yflex yitems-center ygap-4 yrounded-xl ypx-3 ypy-2 ytext-muted-foreground yhover:text-foreground"
                >
                  <Home className="yh-5 yw-5" />
                  Dashboard
                </Link>
                <Link
                  to='/orders'
                  className="ymx-[-0.65rem] yflex yitems-center ygap-4 yrounded-xl ybg-muted ypx-3 ypy-2 ytext-foreground yhover:text-foreground"
                >
                  <ShoppingCart className="yh-5 yw-5" />
                  Product
                </Link>
                <Link
                 to='/products'
                  className="ymx-[-0.65rem] yflex yitems-center ygap-4 yrounded-xl ypx-3 ypy-2 ytext-muted-foreground yhover:text-foreground"
                >
                  <Package className="yh-5 yw-5" />
                  Category
                </Link>
                <Link
                  to='/customers'
                  className="ymx-[-0.65rem] yflex yitems-center ygap-4 yrounded-xl ypx-3 ypy-2 ytext-muted-foreground yhover:text-foreground"
                >
                  <Users className="yh-5 yw-5" />
                  Users
                </Link>
                <Link
                  to='/analytics'
                  className="ymx-[-0.65rem] yflex yitems-center ygap-4 yrounded-xl ypx-3 ypy-2 ytext-muted-foreground yhover:text-foreground"
                >
                  <LineChart className="yh-5 yw-5" />
                 Outlet
                </Link>
                <Link
                  to='/analytics'
                  className="ymx-[-0.65rem] yflex yitems-center ygap-4 yrounded-xl ypx-3 ypy-2 ytext-muted-foreground yhover:text-foreground"
                >
                  <LineChart className="yh-5 yw-5" />
                Transactions
                </Link>
              </nav>
              <div className="ymt-auto">
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="yw-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card> */}
              </div>
            </SheetContent>
          </Sheet>
          <div className="yw-full yflex-1">
            <form>
              <div className="yrelative">
                <Search className="yabsolute yleft-2.5 ytop-2.5 yh-4 yw-4 ytext-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="yw-full yappearance-none ybg-background ypl-8 yshadow-none md:yw-2/3 lg:yw-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="yrounded-full">
                <CircleUser className="yh-5 yw-5" />
                <span className="ysr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="yflex yflex-1 yflex-col ygap-4 yp-4 lg:ygap-6 lg:yp-6">
          <div className="yflex yitems-center">
            <h1 className="ytext-lg yfont-semibold md:ytext-2xl">Inventory</h1>
          </div>
          <div
            className="yflex yitems-center yrounded-lg yshadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            {/* form will be here */}
      <div className="yflex yflex-wrap w-full">
        <h1>Blank Page</h1>
      </div>

          </div>
<div className="yflex yjustify-center yitems-center ygap-5 yflex-col md:yflex-row">
<div className="yw-[23rem] md:yw-[30rem] yh-72">
     
      <CardContent>

      </CardContent>
</div>
</div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
