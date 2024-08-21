import { LoaderCircle } from "lucide-react";

export default function FullScreenSpinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <LoaderCircle className="w-12 h-12 text-foreground animate-spin" />
    </div>
  );
}
