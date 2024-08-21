import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/shadcn/ui/card";
import HeadingTitle from "../ui/heading-title";

const TESTIMONIALS = [
  {
    username: "Mario Gómez",
    text: `
     Excelente.
     La app funciona muy bien. Hacía falta algo así para combatir entre nosotros la delincuencia, ojalá se sume más gente y ahora sean los Ladrones los que anden con miedo 💪🏻💪🏻
    `,
  },
  {
    username: "María Pérez",
    text: `
       Tiene potencial
    He probado la aplicación por poco tiempo y creo que tiene mucho potencial. ¡Sólo haría falta integrar todas las municipalidades de Formosa!
    Saludo 
    `,
  },
  {
    username: "Gonzalo Navarro",
    text: `
       Son geniales!

    La app es buenisima y genial la idea. Ojalá se sumen más personas y se pueda expandir a más lugares.
    `,
  },
  {
    username: "María Gómez",
    text: `
       Buenisima
       Muy buena app, me siento más segura al salir a la calle.
    `,
  },
  {
    username: "Ricardo Pérez",
    text: `
      Al menos en mi barrio funciona muy bien y es muy útil tanto para inconvenientes pequeños (actitudes sospechosas) y emergencias de seguridad más grandes. 
    `,
  },
  {
    username: "Mario Sandoval",
    text: `
    Muy buena experiencia. En algunos barrios el link con seguridad es muy bueno, en otras no tanto, pero sirve para estar alerta.
    `,
  },
];

export default function Testimonials() {
  return (
    <section className="flex flex-col justify-center my-4">
      <HeadingTitle as="h2" className="my-4">
        Testimonios
      </HeadingTitle>
      <article className="mx-6 xl:mx-[10rem] pt-8 md:pt-0 grid md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
        {TESTIMONIALS.map((t) => {
          return <Testimonial {...t} />;
        })}
      </article>
    </section>
  );
}

function Testimonial(props: (typeof TESTIMONIALS)[0]) {
  return (
    <Card className="shadow-md max-w-xl">
      <CardContent className="font-medium p-6 text-lg">
        {props.text}
      </CardContent>

      <CardHeader className="flex flex-row gap-4">
        <Avatar className="">
          <AvatarFallback>
            {props.username
              .split(" ")
              .map((s) => s.toUpperCase()[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <CardDescription className="font-bold text-xl text-black">
          {props.username}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
