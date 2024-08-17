import Image from "next/image";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";
import ProfileMenu from "./ProfileMenu";
import MobileSideBar from "./MobileSidebar";

function NavBar() {
  return (
    <nav className="flex justify-between items-center p-2 px-4 border-b">
      <div className="flex-grow flex justify-start lg:hidden">
        <MobileSideBar />
      </div>
      <div className="flex-grow flex justify-center lg:justify-start">
        <Image src="/logo.svg" alt="Daily.Dev" width={100} height={100} />
      </div>

      <div className="flex-grow lg:flex justify-center items-center hidden">
        <div className="flex items-center">
          <SearchInput />
        </div>
      </div>

      <div className="flex-grow flex justify-end items-center gap-3">
        <Button className="rounded-lg font-bold hidden lg:block">
          New Post
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="text-white hidden lg:flex"
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 pointer-events-none size-6"
          >
            <path
              d="M7.833 13a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005H6.167a3.167 3.167 0 01-3.162-2.987L3 17.833v-1.666a3.167 3.167 0 012.987-3.162l.18-.005h1.666zm10 0a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005h-1.666a3.167 3.167 0 01-3.162-2.987l-.005-.18v-1.666a3.167 3.167 0 012.987-3.162l.18-.005h1.666zm-10 1.5H6.167c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152v-1.666c0-.872-.67-1.588-1.523-1.66l-.144-.007zm10 0h-1.666c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152v-1.666c0-.872-.67-1.588-1.523-1.66l-.144-.007zM7.833 3a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005H6.167a3.167 3.167 0 01-3.162-2.987L3 7.833V6.167a3.167 3.167 0 012.987-3.162L6.167 3h1.666zm12.528 3.259a.75.75 0 01-.009 1.484l-.102.007h-2.5v2.5a.75.75 0 01-1.491.111l-.009-.11V7.75h-2.5l-.111-.009a.75.75 0 01.009-1.484l.102-.007h2.5v-2.5a.75.75 0 011.491-.111l.009.11V6.25h2.5l.111.009zM7.833 4.5H6.167c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152V6.167c0-.872-.67-1.588-1.523-1.66L7.833 4.5z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </Button>

        <Button
          size="icon"
          className="text-white  hidden lg:flex"
          variant="secondary"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 pointer-events-none"
          >
            <path
              d="M12 3a2.312 2.312 0 012.25 2.847 6.39 6.39 0 014.106 5.491l.015.264.004.21v2.226l.072.022c.803.28 1.405.988 1.53 1.852l.018.175.005.158c0 1.224-.95 2.226-2.154 2.307l-.159.006-2.046-.001-.013.033a3.94 3.94 0 01-3.216 2.384l-.21.016-.202.005a3.926 3.926 0 01-3.536-2.22l-.083-.183-.015-.035H6.313c-1.171 0-2.139-.87-2.292-1.998l-.016-.156L4 16.245c0-.903.52-1.693 1.325-2.076l.165-.071.135-.048v-2.238A6.377 6.377 0 019.75 5.846 2.312 2.312 0 0112 3zm0 3.938c-.437 0-.86.057-1.262.165l-.148.042a4.876 4.876 0 00-3.46 4.441l-.005.226v2.808c0 .414-.31.756-.71.806l-.197.012a.813.813 0 00-.007 1.613l.101.007h3.25l.005.143a2.438 2.438 0 002.272 2.289l.161.005.16-.005a2.438 2.438 0 002.272-2.265l.005-.168h3.25l.102-.006a.813.813 0 000-1.612l-.196-.012a.813.813 0 01-.712-.704l-.006-.103v-2.807l-.003-.183a4.878 4.878 0 00-3.461-4.485l-.143-.041A4.881 4.881 0 0012 6.937zM12 4.5a.812.812 0 10.788 1.013l.018-.099.007-.101A.812.812 0 0012 4.5z"
              fill="currentcolor"
              fillRule="evenodd"
            ></path>
          </svg>
        </Button>
        <span className="">
          <ProfileMenu />
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
