import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "@/components/base/NavBar";
import SideBar from "@/components/base/SideBar";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "daily.dev | Where developers suffers together",
  description: "daily.dev | Where developers suffers together",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-y-hidden">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex items-start justify-center w-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
