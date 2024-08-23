import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/ui/navigation-menu";

import { Button } from "@/components/shadcn/ui/button";
import { Logo } from "@/components/svg/logo";
import { cn } from "@/lib/utils";
import { Contact, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/hooks/use-auth";
import Offcanvas from "./offcanvas";

const TABS = [
  { label: "Sobre nosotros", href: "/about", icon: User },
  { label: "Contacto", href: "/contact", icon: Contact },
];

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between border border-slate-200 px-2 md:px-4 py-2 text-4xl">
      <Link
        className="flex gap-2 text-[2rem] items-center text-foreground flex-1 justify-center lg:justify-start"
        to="/"
      >
        <Logo className="w-[40px] h-[40px] text-primary" />
        <h1 className="font-sans-accent text-center text-primary">
          ComunidadActiva
        </h1>
      </Link>
      <Offcanvas>
        <NavigationMenu className="w-full flex flex-col justify-center h-full px-8 max-w-none">
          <div className="w-full h-full py-10">
            <ul className="list-none">
              <PageLinks />
            </ul>
          </div>
          <div className="mt-auto w-full h-fit py-10">
            <ul className="list-none flex flex-col">
              <LoginLinks />
            </ul>
          </div>
        </NavigationMenu>
      </Offcanvas>
      <div className="hidden md:flex md:items-stretch content-center justify-items-center md:justify-center w-full lg:w-auto">
        <NavigationMenu className="flex gap-6 list-none">
          <ul className="flex gap-2 items-center justify-center">
            <PageLinks />
            <LoginLinks />
          </ul>
        </NavigationMenu>
      </div>
    </header>
  );
}

function LoginLinks() {
  const { isAuthenticated, loading, signOut, user, isAdmin } = useAuth();

  const router = useNavigate();

  return (
    <>
      {isAuthenticated && !loading && user && (
        <div className="flex gap-2 w-full flex-col md:flex-row">
          <Button
            onClick={() =>
              isAdmin
                ? router("/dashboard/reports/admin")
                : router("/dashboard/reports/user")
            }
            variant={"outline"}
          >
            {isAdmin ? "Panel" : "Reclamos"}
          </Button>

          <Button onClick={signOut} variant={"default"}>
            Cerrar Sesión
          </Button>
        </div>
      )}
      {!isAuthenticated && !loading && (
        <div className="flex flex-col md:flex-row gap-2 pb-3">
          <NavigationMenuItem key={"/sign-up"}>
            <NavLink to={"/auth/sign-up"}>
              <Button className="w-full md:w-max text-lg" variant={"secondary"}>
                Registrarse
              </Button>
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem key={"/sign-in"} className="">
            <NavLink to={"/auth/sign-in"}>
              <Button className="w-full md:w-max text-lg">
                Iniciar sesión
              </Button>
            </NavLink>
          </NavigationMenuItem>
        </div>
      )}
    </>
  );
}

function PageLinks() {
  const activeLink = TABS.find((tab) => tab.href === window.location.pathname);
  return (
    <>
      {TABS.map((tab) => {
        const className = cn({
          "bg-background text-foreground": activeLink === tab,
          "text-foreground": activeLink !== tab,
        });
        return (
          <NavigationMenuItem key={tab.href}>
            <NavLink to={tab.href}>
              <NavigationMenuLink
                className={`${cn(
                  navigationMenuTriggerStyle(),
                  className,
                  "w-full md:w-max text-lg flex gap-2 items-center"
                )}`}
              >
                {<tab.icon />}
                {tab.label}
              </NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
        );
      })}
    </>
  );
}
