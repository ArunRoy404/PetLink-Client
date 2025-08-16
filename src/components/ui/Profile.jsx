import { createElement, useState } from "react";
import {
  UserCircle2,
  Settings,
  Inbox,
  LifeBuoy,
  LogOut,
  ArrowDown,
  LayoutDashboard,
} from "lucide-react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { useAuthContext } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../ReactHotToast/ReactHotToast";
import { Link } from "react-router";


export default function Profile() {
  const { userSignOut } = useAuthContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { firebaseUser } = useAuthContext()

  const closeMenu = () => setIsMenuOpen(false);

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircle2,
      link: '/dashboard/profile'
    },
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      link: '/dashboard'
    },
    // {
    //   label: "Edit Profile",
    //   icon: Settings,
    //   link: '/'
    // },
    // {
    //   label: "Inbox",
    //   icon: Inbox,
    //   link: '/'

    // },
    // {
    //   label: "Help",
    //   icon: LifeBuoy,
    //   link: '/'
    // },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={firebaseUser?.photoURL}
          />
          <ArrowDown size={10} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-transparent backdrop-blur-2xl">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          return (
            <Link to={link} key={key}>
              <MenuItem
                className={"group flex items-center gap-2 rounded hover:bg-gray-500/20 focus:bg-gray-500/20 active:bg-gray-500/20"}
              >
                {createElement(icon, {
                  className: `h-4 w-4 text-text`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-medium text-text"
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}

        {/* Sign out  */}
        <MenuItem
          key={'Sign Out'}
          onClick={() => {
            userSignOut()
              .then(() => notifySuccess('Sign Out Successful'))
              .catch(() => notifyError("Sign Out Failed!"))
            closeMenu()
          }}
          className={"group flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}
        >
          {createElement(LogOut, {
            className: `h-4 w-4 text-red-500`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="group-hover:text-black font-medium"
            color={"red"}
          >
            {"Sign Out"}
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}