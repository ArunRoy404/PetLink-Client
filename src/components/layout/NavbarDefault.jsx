
import {
  Navbar,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Logo from "../ui/Logo";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Home, PawPrint, HeartHandshake } from "lucide-react";
import Profile from "../ui/Profile";
import ThemeToggle from "../ui/ThemeToggle";
import { useAuthContext } from "../../context/AuthContext";



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
          <span>Sign in</span>
        </Button>
      </div>
    )
  }



  const navList = (
    <ul className="nav-links mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <NavLink to={'/'} className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home size={16} />
          <span className="text-sm font-medium">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/pets'} className="flex items-center gap-1 hover:text-primary transition-colors">
          <div className="flex items-center gap-1 hover:text-primary transition-colors">
            <PawPrint size={16} />
            <span className="text-sm font-medium">Pet Listing</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/donation'} className="flex items-center gap-1 hover:text-primary transition-colors">
          <div className="flex items-center gap-1 hover:text-primary transition-colors">
            <HeartHandshake size={16} />
            <span className="text-sm font-medium">Donation Campaigns</span>
          </div>
        </NavLink>
      </li>
    </ul>
  );


  return (
    <Navbar className="mx-auto shadow-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-text">

        <div className="flex items-center gap-10">
          {/* logo  */}
          <Logo />

          {/* navLinks  */}
          <div className="hidden lg:block">{navList}</div>
        </div>


        <div className="flex items-center gap-2">

          <ThemeToggle />

          {
            firebaseUser
            ? <Profile/>
            : <SignInButton/>
          }


          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>


      <Collapse open={openNav}>
        <div className="container mx-auto text-text">
          {navList}
        </div>
      </Collapse>
    </Navbar>
  );
}