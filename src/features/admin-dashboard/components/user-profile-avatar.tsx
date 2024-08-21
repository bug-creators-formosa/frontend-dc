import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { User } from "@/features/auth/interfaces/user";
import { getInitials } from "@/features/common/utils";
import { cn } from "@/lib/utils";

export default function UserProfileAvatar({
  user,
  className,
}: {
  user: User;
  className?: string;
  height?: number;
}) {
  return (
    <Avatar
      className={cn(
        "bg-backgroundflex justify-center text-foreground font-semibold items-center h-8 w-8",
        className
      )}
    >
      <AvatarFallback className="text-center flex items-center justify-center text-md">
        {getInitials(user.username)}
      </AvatarFallback>
    </Avatar>
  );
}
