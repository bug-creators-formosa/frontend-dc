import heroImage from "@/assets/img/hero.jpg";
import { Button } from "@/components/shadcn/ui/button";

export default function Hero() {
  return (
    <div className="flex justify-start md:justify-center items-center w-full h-full">
      <div className="grid grid-cols-1 grid-rows-[300_px_1fr] lg:grid-cols-2 lg:grid-rows-1 mx-6 md:mx-[10rem] min-h-[90vh] pt-8 md:pt-0">
        <div className="flex flex-col justify-center items-center md:items-start">
          <hgroup className="flex flex-col text-center lg:text-start">
            <h1 className="text-[90px] leading-[1] md:text-[100px] text-bold font-sans-accent mb-5">
              Hero
            </h1>
            <p className="text-xl font-sans font-thin lg:me-20">
              Descripción de Hero. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dicta assumenda doloribus doloremque dolores
              officia voluptas in eveniet neque aliquam labore eligendi,
              delectus facere, at quia? Porro harum culpa eveniet possimus? Nam
              omnis voluptates sunt nemo! Quo ipsam, distinctio consequuntur
            </p>
          </hgroup>
          <div className="flex gap-2 mt-4">
            <Button
              variant="default"
              className="px-4 py-5 mt-4 rounded-md text-xl"
            >
              Call to Action
            </Button>
            <Button
              variant="outline"
              className="px-4 py-5 mt-4 rounded-md text-xl"
            >
              Outline action
            </Button>
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
        src={heroImage}
        alt="Hero"
        className="object-contain w-full h-full"
      />
    </div>
  );
}
