'use client';

import EventsList from "@/components/events/events-list";
import { PaginationComp } from "@/components/pagination";
import { useEvents } from "@/hooks/use-events";
import { usePage } from "@/hooks/use-page";

interface EventClientPageProps {
  grid?: number;
}

const EventClientPage = ({ grid }: EventClientPageProps) => {
  const { page, setPage } = usePage();
  const { events, totalPages, loading } = useEvents(page, 3);

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-center">
          Program Acara bersama{" "}
          <span className="text-purple-700">SkillUpKids</span> by{" "}
          <span className="text-green-700">Sinari Desa</span>
        </h1>
        <h1 className="text-md font-normal text-center">All Events</h1>
      </div>

      <EventsList events={events} loading={loading} grid={grid} />
      <PaginationComp page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
};
export default EventClientPage;
