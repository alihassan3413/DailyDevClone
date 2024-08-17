"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatr";
import {
  CirclePause,
  Handshake,
  IdCard,
  LogOutIcon,
  Pencil,
  Settings,
  UserRoundPen,
  Zap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import myAxios from "@/lib/axios.config";
import { LOGOUT_URL, UPDATE_PROFILE } from "@/lib/apiEndpoint";
import {
  CustomSession,
  CustomUser,
} from "@/app/api/auth/[...nextauth]/authOptions";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function ProfileMenu() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [erros, setErrors] = useState({
    profile_image: [],
  });

  const { data, update } = useSession();
  const user = data?.user as CustomUser;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const updateProfile = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("profile_image", image ?? "");
    myAxios
      .post(UPDATE_PROFILE, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const response = res.data;
        update({ profile_image: response.data });
        toast.success("Profile image updated successfully");
        setLoading(false);
        setProfileOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          toast.error("Something went wrong. Please try again!");
        }
      });
  };

  const handleLogout = async () => {
    myAxios
      .post(
        LOGOUT_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        signOut({
          redirect: true,
          callbackUrl: "/login",
        });
      })
      .catch((err) => {
        toast.error("Something went wrong.Try Again!");
      });
  };
  return (
    <div>
      {/* logout dialogue */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action expires your current session and you are going to
              logout.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4">
            <Button variant="destructive" onClick={handleLogout}>
              Yes
            </Button>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* profile dialogoue */}

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <div>
            <form action="" onSubmit={updateProfile}>
              <div className="mb-2">
                <Label htmlFor="image">Choose your photo</Label>
                <Input
                  type="file"
                  className="file:text-white"
                  onChange={handleImageChange}
                  accept="image/png,image/svg,image/jpg,image/jpeg,image/webp"
                />
              </div>
              <div className="mb-2">
                <Button className="w-full" disabled={loading}>
                  {loading ? "Processing.." : "Update Profile"}
                </Button>
              </div>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger className=" cursor-pointer">
          <UserAvatar image={user?.profile_image ?? undefined} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-start items-center"
            onClick={() => setProfileOpen(true)}
          >
            <span>
              <UserRoundPen className="w-4 h-4 mr-2" />
            </span>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-start items-center">
            <span>
              <Pencil className="w-4 h-4 mr-2" />
            </span>
            Account Details
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-start items-center">
            <span>
              <Zap className="w-4 h-4 mr-2" />
            </span>
            Reputation
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-start items-center">
            <span>
              <IdCard className="w-4 h-4 mr-2" />
            </span>
            Dev Card
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-start items-center">
            <span>
              <Handshake className="w-4 h-4 mr-2" />
            </span>
            Invite Friends
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-start items-center">
            <span>
              <CirclePause className="w-4 h-4 mr-2" />
            </span>
            Pause new tab
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-start items-center">
            <span>
              <Settings className="w-4 h-4 mr-2" />
            </span>
            Customize
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-start items-center"
            onClick={() => setLogoutOpen(true)}
          >
            <span>
              <LogOutIcon className="w-4 h-4 mr-2" />
            </span>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileMenu;
