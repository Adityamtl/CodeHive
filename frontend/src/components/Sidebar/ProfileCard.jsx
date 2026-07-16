import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ProfileCard({ children, email, firstName, lastName, imageUrl, createdAt }) {
  const joinedDate = (timestamp) => `Joined ${new Date(timestamp).toLocaleString('en-IN', { month: 'long',timeZone: 'Asia/Kolkata' })} ${new Date(timestamp).getFullYear()}`;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback className="bg-emerald-600">{firstName.slice(0, 1)}{lastName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-bold font-mono">{firstName} {lastName}</h4>
            <p className="text-xs font-extralight font-mono">
              {email}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {/* Joined December 2021 */}
                {joinedDate(createdAt)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ProfileCard;
