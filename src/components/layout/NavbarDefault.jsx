
import {
  Navbar,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Logo from "../ui/Logo";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Home, PawPrint, HeartHandshake, User, LayoutDashboard } from "lucide-react";
import Profile from "../ui/Profile";
import ThemeToggle from "../ui/ThemeToggle";
import { useAuthContext } from "../../context/AuthContext";
import MenuBar from "../ui/MenuBar";



export function NavbarDefault() {
  const [openNav, setOpenNav] = useState(false);
  const { firebaseUser } = useAuthContext()

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const SignInButton = () => {
    return (
      <div className="flex items-center gap-x-1">
        <Button fullWidth variant="gradient" size="sm" className="">
          <Link to={'/auth/sign-in'}>Sign In</Link>
        </Button>
      </div>
    )
  }



  const navList = (
    <ul className="nav-links mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <NavLink to={'/'} className="flex items-center gap-1 hover:text-primary transition-colors">
          <div className="flex items-center gap-2 hover:text-primary  transition-colors">
            <Home size={16} />
            <span className="text-sm font-medium">Home</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/pet-listing'} className="flex items-center gap-1 hover:text-primary transition-colors">
          <div className="flex items-center gap-2 hover:text-primary  transition-colors">
            <PawPrint size={16} />
            <span className="text-sm font-medium">Pet Listing</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/campaigns'} className="flex items-center gap-1 hover:text-primary transition-colors">
          <div className="flex items-center gap-2  hover:text-primary transition-colors">
            <HeartHandshake size={16} />
            <span className="text-sm font-medium">Donation Campaigns</span>
          </div>
        </NavLink>
      </li>
      {
        firebaseUser && <>
          <li>
            <NavLink to={'/dashboard/profile'} className="flex items-center gap-1 hover:text-primary transition-colors">
              <div className="flex items-center gap-2 hover:text-primary  transition-colors">
                <User size={16} />
                <span className="text-sm font-medium">My Profile</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard'} className="flex items-center gap-1 hover:text-primary transition-colors">
              <div className="flex items-center gap-2  hover:text-primary transition-colors">
                <LayoutDashboard size={16} />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
            </NavLink>
          </li>
        </>
      }
    </ul>
  );


  return (
    <nav className="z-[100] w-full fixed border-none rounded-none backdrop-blur-md  mx-auto shadow-none py-2 md:py-4 lg:py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-text">


        <div className="flex items-center gap-8">
          {/* menubar  */}
          <MenuBar openNav={openNav} setOpenNav={setOpenNav} />
          {/* logo  */}
          <Logo />

          {/* navLinks  */}
          <div className="hidden lg:block">{navList}</div>
        </div>


        <div className="flex items-center gap-2">

          <ThemeToggle />

          {
            firebaseUser
              ? <Profile />
              : <SignInButton />
          }
        </div>
      </div>


      <Collapse open={openNav}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8  text-text">
          {navList}
        </div>
      </Collapse>
    </nav>
  );
}