"use client";
import Link from "next/link";
import UserAvatar from "../common/UserAvatr";
import { ArrowBigUp, Flame, Search } from "lucide-react";
import { Link1Icon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import AddPost from "../Post/AddPost";

function SideBarLinks() {
  const { data } = useSession();
  const user = data?.user as CustomUser;
  return (
    <div>
      <Link href="/" className="flex items-center space-x-4 py-4">
        <UserAvatar image={user?.profile_image ?? undefined} />
        <p>Feed</p>
      </Link>

      <p className="my-2 text-muted-foreground font-bold text-sm">Discover</p>

      <ul>
        <li>
          <Link href="/popular" className="flex space-x-3 items-center mb-4">
            <Flame className="w-5 h-5" />
            <p>Popular</p>
          </Link>

          <Link href="/search" className="flex space-x-3 items-center mb-4">
            <Search className="w-5 h-5" />
            <p>Search</p>
          </Link>

          <Link href="/mostvoted" className="flex space-x-3 items-center mb-4">
            <ArrowBigUp className="w-5 h-5" />
            <p>Most Voted</p>
          </Link>
        </li>
      </ul>

      <p className="my-2 text-muted-foreground font-bold text-sm">Contribute</p>

      <ul>
        <li>
          <AddPost />
        </li>
      </ul>
    </div>
  );
}

export default SideBarLinks;
