import constructionImage from "@/assets/img/construction.png";

export default function ConstructionPage() {
  return (
    <main className="h-100 my-10 mx-auto md:px-8 md:py-4 xl:p-0 flex items-center">
      <section className="h-full flex flex-col w-full items-center justify-center">
        <h1 className="font-sans-accent text-4xl text-foreground">
          Página en construcción
        </h1>
        <img src={constructionImage} className="object-contain w-100 sm:w-1/2 md:w-1/3" />
      </section>
    </main>
  );
}
