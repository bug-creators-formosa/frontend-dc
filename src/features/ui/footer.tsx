import { Button } from "@/components/shadcn/ui/button";
import FacebookIcon from "@/components/svg/icons/facebook";
import InstagramIcon from "@/components/svg/icons/instagram";
import { WhiteLogo } from "@/components/svg/logo";
import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  {
    icon: <InstagramIcon className="w-6 fill-foreground" />,
    to: "https://www.instagram.com/example/",
    text: "ComunidadActiva",
  },
  {
    icon: <FacebookIcon className="w-6 fill-foreground" />,
    to: "https://www.facebook.com/example/",
    text: "ComunidadActiva",
  },
];

export default function Footer() {
  return (
    <footer className="bg-background text-foreground flex flex-col gap-4 mt-24">
      <div className="flex justify-between mx-auto content-center w-full lg:max-w-[70%] gap-2 md:gap-12">
        <div className="min-h-[30vh] w-full md:max-w-full flex flex-col justify-center">
          <Link
            className="flex gap-2 text-[3rem] items-center flex-1 justify-center lg:justify-start p-2 md:p-5"
            to="/"
          >
            <WhiteLogo className="w-[80px] h-[80px] fill-background stroke-foreground" />
            <span className="font-sans-accent text-center">
              ComunidadActiva
            </span>
          </Link>
          <div className="px-5 flex flex-col gap-2 items-center md:items-start mt-4 md:mt-8 ">
            <Link to="/sign-in">
              <Button className="p-6 text-2xl">Registra un reclamo</Button>
            </Link>
          </div>
        </div>
        <div className="py-10 flex gap-14 justify-center md:justify-star w-full lg:w-auto">
          <div className="flex flex-col gap-5 justify-center md:justify-start">
            <h2 className="text-2xl font-bold">Compañía</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/about">Sobre nosotros</Link>
              </li>
              <li>
                <Link to="/contact">Contacto</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">Redes sociales</h2>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => {
                return (
                  <FooterLink key={link.to} to={link.to}>
                    {link.icon} {link.text}
                  </FooterLink>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100/50 col-span-2 flex justify-around md:justify-between items-center px-2 py-2 md:p-5 mt-8 w-full">
        <div className="w-max">
          <p>© 2024 ComunidadActiva</p>
        </div>
        <div className="flex gap-4 md:gap-7 w-max">
          <a href="">Términos y condiciones</a>
          <a href="">Políticas de privacidad</a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink(props: { children?: React.ReactNode; to: string }) {
  return (
    <Link to={props.to} className="flex gap-3 text-foreground">
      {props.children}
    </Link>
  );
}
