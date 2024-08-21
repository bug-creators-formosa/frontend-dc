import { NavigationMenu } from "@/components/shadcn/ui/navigation-menu";
import { Separator } from "@/components/shadcn/ui/separator";
import { Logo } from "@/components/svg/logo";
import { cn } from "@/lib/utils";
import {
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SidebarLinks from "./sidebar-links";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const handleClick = () => {
    setExpanded(!expanded);
  };

  const panelClassnames = cn(
    "flex flex-col h-full p-2 py-3 border-x transition-all duration-300 ease-in-out bg-white shadow-md group",
    {
      "w-16": !expanded,
      "w-80": expanded,
    },
    { "border-r": expanded }
  );

  const linkClassnames = cn(
    "flex flex-col justify-start w-full max-w-none mt-6 overflow-hidden",
    {
      // Disable pointer events when the sidebar is collapsed
      "pointer-events-none": !expanded,
    }
  );
  return (
    <aside className={cn(panelClassnames, "sticky top-0 left-0")}>
      <div className="flex items-center justify-between w-full py-3">
        <Link to="/" className="flex items-center">
          <Logo className="h-10 aspect-square" />
          {expanded && (
            <h1 className="font-sans-accent text-3xl text-foreground">Template</h1>
          )}
        </Link>
        <div className="cursor-pointer">
          {expanded && <PanelRightOpen onClick={handleClick} />}
          {!expanded && <PanelRightClose onClick={handleClick} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:opacity-100" />}
          <span className="sr-only">Toggle sidebar</span>
        </div>
      </div>
      <Separator orientation="horizontal" className="" />
      <div
        className="z-10 flex-1"
        onClick={() =>
          // When the sidebar is collapsed, expand it when the user clicks on it
          setExpanded(true)
        }
      >
        <NavigationMenu className={linkClassnames}>
          <SidebarLinks />
        </NavigationMenu>
      </div>
    </aside>
  );
}





