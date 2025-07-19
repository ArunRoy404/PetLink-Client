import { createElement, useState } from "react";
import {
  UserCircle2,
  Settings,
  Inbox,
  LifeBuoy,
  LogOut,
  ArrowDown,
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


export default function Profile() {
  const {userSignOut} = useAuthContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { firebaseUser } = useAuthContext()

  const closeMenu = () => setIsMenuOpen(false);

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircle2,
    },
    {
      label: "Edit Profile",
      icon: Settings,
    },
    {
      label: "Inbox",
      icon: Inbox,
    },
    {
      label: "Help",
      icon: LifeBuoy,
    },
    {
      label: "Sign Out",
      icon: LogOut,
    },
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
            src={firebaseUser.photoURL}
          />
          <ArrowDown size={10} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-transparent backdrop-blur-2xl">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if(label==='Sign Out'){
                  userSignOut()
                  .then(()=>notifySuccess('Sign Out Successful'))
                  .catch(()=>notifyError("Sign Out Failed!"))
                }
                closeMenu()
              }}
              className={`group flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : "text-black"}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="group-hover:text-black font-medium"
                color={isLastItem ? "red" : "black"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}