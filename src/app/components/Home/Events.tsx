"use client";

import EventsList from "@/components/events/events-list";
import { useEvents } from "@/hooks/use-events";
import Link from "next/link";

const EventsPage = () => {
  const { events, loading } = useEvents(1, 3);

  return (
    <section
      className="p-10 md:py-20 lg:px-60 xl:px-72 scroll-mt-14 md:scroll-mt-0 text-black"
      id="Events"
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-center">
          Events bersama{" "}
          <span className="text-purple-700">SkillUpKids</span> by{" "}
          <span className="text-green-700">Sinari Desa</span>
        </h1>
        <h1 className="text-md font-normal text-center">Top Events</h1>
      </div>

      <EventsList events={events} loading={loading} />
      <Link href={"/events"}>
        <div className="mt-4 bg-green-700 rounded-md w-full  cursor-pointer hover:bg-green-600 duration-300">
          <h1 className="text-sm text-white font-normal text-center p-2 md:p-4">
            See All Events
          </h1>
        </div>
      </Link>
    </section>
  );
};
export default EventsPage;