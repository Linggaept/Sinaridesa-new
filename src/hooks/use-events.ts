import { getEvents } from "@/app/services/eventService";
import { useEffect, useRef, useState } from "react";

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

export const useEvents = (page: number, limit: number) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && effectRan.current) {
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await getEvents(page, limit);
        setEvents(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();

    return () => {
      effectRan.current = true;
    };
  }, [page, limit]);

  return { events, totalPages, loading };
};
