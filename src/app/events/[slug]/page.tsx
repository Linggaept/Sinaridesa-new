"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventBySlug } from "@/app/services/eventService";
import { Content } from "@/components/content";
import { Header } from "@/components/header";
import { Event } from "@/lib/types";
import Footer from "@/app/Footer";

export default function Page() {
  const [event, setEvent] = useState<Event | null>(null);
  const params = useParams<{ slug: string }>(); // ambil slug dari url
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventBySlug(params.slug);
        setEvent(data.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    if (params?.slug) {
      fetchEvent();
    }
  }, [params?.slug]);

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Header event={event} />

        <div className="mt-16">
          <Content
            description={event?.description || ""}
            image={event?.image || ""}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
