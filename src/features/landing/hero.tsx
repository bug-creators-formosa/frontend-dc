import { Button } from "@/components/shadcn/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex justify-start md:justify-center items-center w-full h-full">
      <div className="grid grid-cols-1 grid-rows-[300_px_1fr] lg:grid-cols-2 lg:grid-rows-1 mx-6 md:mx-[10rem] min-h-[90vh] pt-8 md:pt-0">
        <div className="flex flex-col justify-center items-center md:items-start">
          <hgroup className="flex flex-col text-center lg:text-start">
            <h1 className="text-[70px] leading-[1] md:text-[70px] text-bold font-sans-accent mb-5">
              Ayuda a construir una ciudad mejor
            </h1>
            <p className="text-xl font-sans font-thin lg:me-20">
              Transforma tu comunidad con un clic. Reporta problemas para
              mejorar la calidad de vida en tu barrio. Únete a Comunidad Activa
              y haz tu parte para construir un futuro mejor.
            </p>
          </hgroup>
          <div className="flex gap-2 mt-4">
            <Link to="/auth/sign-in">
              <Button
                variant="default"
                className="px-4 py-5 mt-4 rounded-md text-2xl"
              >
                Registra una denuncia
              </Button>
            </Link>
          </div>
        </div>
        <HeroImage />
      </div>
    </div>
  );
}

function HeroImage() {
  return (
    <div className="group flex justify-center items-center relative *:duration-200 *:transition-transform">
      <img
        src="/feature-posts.svg"
        alt="Hero"
        className="object-contain w-full h-full"
      />
    </div>
  );
}
