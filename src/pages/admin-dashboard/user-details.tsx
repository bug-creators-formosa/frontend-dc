import { Button } from "@/components/shadcn/ui/button";
import UserDetail from "@/features/admin-dashboard/components/user-detail";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <main className="m-2">
      <hgroup className="flex gap-2">
        <Button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-sans-accent mb-6">Detalles del usuario</h1>
      </hgroup>
      <Suspense fallback={<FullScreenSpinner />}>
        <UserDetail userId={userId} />
      </Suspense>
    </main>
  );
}
