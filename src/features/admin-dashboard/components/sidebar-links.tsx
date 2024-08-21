import { cn } from "@/lib/utils";
import { Map, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLink from "./section-link";
import SidebarItem from "./sidebar-item";

const LINKS = [
  {
    section: "Mapa",
    icon: <Map className="h-6 w-6" />,
    link: "/dashboard/map",
  },
  {
    section: "Usuarios y roles",
    icon: <Users className="h-6 w-6" />,
    link: "/dashboard/users",
  },
];

export default function SidebarLinks() {
  const currentPath = window.location.pathname;

  return LINKS.map((linkSection) => {
    // @ts-expect-error Later we can add a `links` prop
    if (linkSection.link && !linkSection.links) {
      const activeClassnames = cn({
        "*:text-foreground *:fill-blue-600": linkSection.link === currentPath,
      });
      return (
        <Link
          to={linkSection.link}
          key={linkSection.link}
          className={cn(
            "block text-sm hover:bg-gray-100 w-full",
            activeClassnames
          )}
        >
          <SidebarItem text={linkSection.section} icon={linkSection.icon} />
        </Link>
      );
    }
    return (
      <SectionLink
        key={linkSection.section}
        title={linkSection.section}
        links={linkSection.links ?? []}
        icon={linkSection.icon}
      />
    );
  });
}
