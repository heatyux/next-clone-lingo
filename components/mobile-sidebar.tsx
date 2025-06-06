import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <SheetTitle>
          <Menu className="text-white" />
        </SheetTitle>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 z-[100]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
