import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import { Facebook, Linkedin, Twitter } from "lucide-react";

export const Header = ({ event }: { event: Event | null }) => {
  return (
    <header className="space-y-6">
      <Badge variant="outline">{event?.title ?? ""}</Badge>

      <h1 className="text-foreground text-4xl leading-15 font-bold tracking-tight md:text-4xl lg:text-5xl">
        {event?.title ?? ""}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={'/img/logo/logo.png'} alt={'logo'} className="object-cover bg-black p-1" />
            {/* <AvatarFallback>{event?.participant.name.charAt(0)}</AvatarFallback> */}
          </Avatar>
          <div>
            <p className="font-medium">by sinari desa</p>
            <p className="text-muted-foreground text-sm">{event?.date.slice(0, 10)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase">
            Share this
          </span>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-blog-hover h-9 w-9 rounded-full">
            <Twitter />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-blog-hover h-9 w-9 rounded-full">
            <Facebook />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-blog-hover h-9 w-9 rounded-full">
            <Linkedin />
          </Button>
        </div>
      </div>
    </header>
  );
};
