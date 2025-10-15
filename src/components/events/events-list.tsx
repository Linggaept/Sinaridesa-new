"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Event {
  thumbnail: string;
  title: string;
  slug?: string;
  description: string;
  date: string;
  location: string;
  participant: string;
  image: string;
}


const EventCardSkeleton = () => (
  <Card className="grid grid-rows-[auto_auto_1fr_auto] pt-0">
    <Skeleton className="aspect-video w-full rounded-t-2xl" />
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-1/2 mt-2" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-5 w-24" />
    </CardFooter>
  </Card>
);

const EventsList = ({ events, loading, grid }: { events: Event[], loading: boolean, grid?: number }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-${grid} gap-5 mt-10`}>
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))
        : events.map((card, index) => (
            <Link key={index} href={`/events/${card.slug}`}>
              <Card
                key={card.slug}
                className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
              >
                <div className="aspect-video w-full">
                  <Link
                    href={`/events/${card.slug}`}
                    target="_blank"
                    className="transition-opacity duration-200 fade-in hover:opacity-70"
                  >
                    <Image
                      src={"http://20.6.8.101/" + card.thumbnail}
                      width={400}
                      height={225}
                      alt={card.title}
                      className="h-full w-full object-cover object-center rounded-t-2xl"
                    />
                  </Link>
                </div>
                <CardHeader>
                  <h3 className="text-lg font-semibold hover:underline md:text-xl">
                    <a href={card.slug} target="_blank">
                      {card.title}
                    </a>
                  </h3>
                </CardHeader>
                <CardContent className="overflow-hidden h-24">
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/events/${card.slug}`}
                    target="_blank"
                    className="flex items-center text-foreground hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </CardFooter>
              </Card>
            </Link>
          ))}
    </div>
  );
};

export default EventsList;