import { Button } from "@/components/shadcn/ui/button";
import useAuth from "@/features/auth/hooks/use-auth";
import { XIcon } from "lucide-react";
import { useState } from "react";

export default function WelcomeBanner() {
  const [dissmissed, setDissmissed] = useState(false);
  const { user } = useAuth();

  if (dissmissed) return null;

  return (
    <div className="bg-white px-6 py-3 shadow-sm border-b flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">
          ¡Bienvenido de vuelta, {user?.username}!
        </h1>
        <p className="text-gray-500">
          Aquí puedes gestionar los usuarios de la aplicación.
        </p>
      </div>
      <div>
        <Button onClick={() => setDissmissed(true)} variant={"ghost"}>
          <XIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
