import featurePostLink from "@/assets/img/feature-posts.svg";
import FeatureAlert from "@/components/svg/feature-alert";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import DestinationFeature from "../../components/svg/destination-feature";
import HeadingTitle from "../ui/heading-title";

const commonClassName = "h-full min-h-64 lg:h-[80%]";

const FEATURES = [
  {
    img: <FeatureAlert />,
    title: "Botón de pánico",
    description:
      "Envía tu ubicación en situaciones urgentes a tus contactos de emergencia, a las autoridades o a tu comunidad, para que puedan actuar rápidamente en situaciones de peligro",
  },
  {
    img: <DestinationFeature className={commonClassName} />,
    title: "Reporte de incidencias",
    description:
      "Reporta situaciones de peligro, accidentes, robos, entre otros, para informar a tu comunidad y a las autoridades. Registra una ubicación y un horario. Visualiza incidencias cercanas a ti y recibe notificaciones de las que te interesen",
  },
  {
    img: <img src={featurePostLink} className={commonClassName} />,
    title: "Publicaciones en comunidad",
    description:
      "Comparte información relevante con tu comunidad, como alertas de seguridad, noticias, eventos, entre otros. Publica fotos, videos y texto. Comenta y reacciona a las publicaciones de otros usuarios",
  },
];

export default function FeatureList() {
  return (
    <section className="mx-auto w-full lg:max-w-[70%] my-16 flex flex-col gap-2 md:gap-4">
      <HeadingTitle as="h2">Funcionalidades</HeadingTitle>
      {FEATURES.map((f, i) => {
        return (
          <FeatureCard
            icon={f.img}
            key={f.title}
            heading={f.title}
            description={f.description}
            reversed={i % 2 === 0}
          />
        );
      })}
    </section>
  );
}

function FeatureCard(props: {
  reversed?: boolean;
  heading?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center justify-center min-h-64 lg:h-[400px] my-2 gap-7",
        {
          "lg:flex-row-reverse": props.reversed,
        }
      )}
    >
      {props.icon ? (
        props.icon
      ) : (
        <DestinationFeature className="h-full min-h-64 lg:h-[80%]" />
      )}
      <article className="border bg-white transition-colors hover:bg-background hover:text-foreground px-8 py-10 max-w-2xl max-h-3xl rounded-md hover:shadow-md">
        <h3 className="font-sans-accent text-2xl lg:text-4xl mb-2">
          {props.heading ?? "Feature"}
        </h3>
        <p className="font-sans-accent text-lg lg:text-2xl">{props.description}</p>
      </article>
    </div>
  );
}
