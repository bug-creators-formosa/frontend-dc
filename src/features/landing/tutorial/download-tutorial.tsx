import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import HeadingTitle from "@/features/ui/heading-title";
import { DownloadIcon } from "lucide-react";
import { ReactNode } from "react";

const STEPS = [
  {
    number: 1,
    imageUrl: "/tutorial-steps/1.png",
    title: "Descarga la APK",
    description: (
      <p className="py-2 text-foreground font-normal">
        Descarga la aplicación haciendo{" "}
        <a
          href="/app.apk"
          className="text-foreground underline"
          download={"app.apk"}
        >
          click aquí
        </a>
      </p>
    ),
  },
  {
    number: 2,
    imageUrl: "/tutorial-steps/2.png",
    title: "Abre el archivo",
    description: (
      <p className="py-2 text-slate-600 font-normal">
        Abre el archivo descargado en tu dispositivo móvil. Puede que tengas que
        habilitar la opción de instalar aplicaciones de fuentes desconocidas.
      </p>
    ),
  },
  {
    number: 3,
    title: "Instala la aplicación",
    imageUrl: "/tutorial-steps/3.png",
    description: (
      <p className="py-2 text-slate-600 font-normal">
        Instala la aplicación y disfruta de todas las funcionalidades que te
        ofrece.
      </p>
    ),
  },
  {
    number: 4,
    title: "Abre la aplicación",
    imageUrl: "/tutorial-steps/5.png",
    description: (
      <p className="py-2 text-slate-600 font-normal">
        Abre la aplicación, sea en el menú de aplicaciones o en la pantalla de
        inicio, si no lo hiciste al instalarla.
      </p>
    ),
  },
  {
    number: 5,
    title: "Regístrate",
    imageUrl: "/tutorial-steps/6.png",
    description: (
      <p className="py-2 text-slate-600 font-normal">
        Regístrate en la aplicación para poder disfrutar de todas las
        funcionalidades.
      </p>
    ),
  },
];

export default function DownloadTutorial() {
  return (
    <section id="download-section" className="flex flex-col justify-center items-center my-16">
      <HeadingTitle as="h2" className="my-4 px-4">
        ¿Cómo descargar la aplicación?
      </HeadingTitle>
      <a
        className="bg-background transition-colors duration-200 hover:bg-background px-5 py-3 text-foreground max-w-fit flex rounded-md items-center gap-2 font-sans-accent cursor-pointer mb-3"
        href=""
      >
        <DownloadIcon />
        Descargar ahora
      </a>
      <TutorialVideo />
      <article className="mx-6 xl:mx-[15rem] pt-8 md:pt-0 flex flex-col motion-safe:hidden">
        {STEPS.map((step) => {
          return <Step {...step} />;
        })}
      </article>
    </section>
  );
}

function TutorialVideo() {
  return (
    <div className="mx-4 md:mx-[5rem] lg:mx-[14rem] motion-reduce:hidden">
      <video
        className="max-w-full rounded-md"
        src="/video/tutorial.mp4"
        controls
      ></video>
    </div>
  );
}

function Step(props: {
  number: number;
  title: string;
  description: ReactNode;
  imageUrl: string;
}) {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-around items-center gap-8 px-2 lg:px-[5rem] my-0 mt-4 py-5">
      <div className="h-72 aspect-video bg-slate-400 rounded-md shadow-md overflow-hidden hover:scale-115">
        <img
          src={`${props.imageUrl}`}
          alt={`Step ${props.number}`}
          className="w-full h-full"
        />
      </div>
      <Card className="shadow-md min-w-full lg:max-w-[40%] lg:min-w-[510px] min-h-32 w-full lg:w-auto mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <div className="group relative rounded-full w-10 aspect-square bg-background flex items-center justify-center text-foreground">
              <span className="z-10">{props.number}</span>
            </div>
            {props.title}
          </CardTitle>
          <CardContent className="ps-[3.5rem] pb-0 text-slate-800">
            {props.description}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
