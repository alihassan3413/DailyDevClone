import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideBarLinks from "./SideBarLinks";

function MobileSideBar() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="lg:hidden cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left">
          <SideBarLinks />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileSideBar;
