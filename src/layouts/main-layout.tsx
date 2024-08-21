import Header from "@/features/ui/header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-full w-full font-thin">
      <Header />
      <Outlet />
    </div>
  );
}
