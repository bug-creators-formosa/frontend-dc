import signInBg from "@/assets/img/sign-in-bg.jpg";
import useAuth from "@/features/auth/hooks/use-auth";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import { Link, Navigate, Outlet } from "react-router-dom";

export default function FormLayout() {
  const { loading, isAuthenticated } = useAuth();
  
  if (loading) return <FullScreenSpinner />;

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <main className="h-full py-10 px-4 md:px-8 md:py-4 xl:p-0 flex items-center">
      <div className="md:bg-[#f7d7c8] h-full border rounded-lg flex mx-auto lg:px-0 w-full lg:max-w-6xl xl:max-w-max overflow-hidden shadow-md">
        <section className="h-full w-full flex-shrink-1 hidden md:flex md:items-center xl:p-24">
          {/* TODO: Maybe limit the image's width or height to prevent a blurry effect */}
          <img src={signInBg} className="object-contain xl:min-w-[734px]" />
        </section>
        <section className="flex bg-background flex-col justify-center gap-3 p-4 py-2 text-lg xl:w-2/3 md:px-10 w-full max-h-min">
          <Link to="/" className="flex items-center max-w-4xl">
            <h1 className="font-sans-accent text-7xl text-foreground">
              Template
            </h1>
          </Link>
          <Outlet />
        </section>
      </div>
    </main>
  );
}
