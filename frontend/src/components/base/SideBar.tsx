import Link from "next/link";
import UserAvatar from "../common/UserAvatr";
import { ArrowBigUp, Flame, Search } from "lucide-react";
import { Link1Icon } from "@radix-ui/react-icons";
import SideBarLinks from "./SideBarLinks";

function SideBar() {
  return (
    <div className="w-[260px] border-r p-4 h-screen hidden lg:block">
      <SideBarLinks />
    </div>
  );
}

export default SideBar;
