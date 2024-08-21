import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/shadcn/ui/navigation-menu";

export default function Offcanvas(props: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const className = cn(
    { "translate-x-[100vw]": !open },
    "transition-transform duration-300"
  );

  return (
    <div className="md:hidden">
      <NavigationMenu className={cn(open && "opacity-0 pointer-events-none", "list-none")}>
        <NavigationMenuLink>
          <button onClick={() => setOpen(true)}>
            <MenuIcon />
          </button>
        </NavigationMenuLink>
      </NavigationMenu>
      <div
        className={cn(
          "fixed top-0 right-0 w-screen h-screen bg-background z-[101] flex flex-col",
          className
        )}
      >
        <div className="w-full flex items-center justify-end py-2 h-20 px-3">
          <NavigationMenu className={cn(!open && "hidden", "list-none z-[100]")}>
            <NavigationMenuLink
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </NavigationMenuLink>
          </NavigationMenu>
        </div>
        {props.children}
      </div>
    </div>
  );
}
