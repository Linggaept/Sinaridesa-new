"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCredentials } from "@/hooks/use-cred";
import { createCertificates } from "@/app/services/certificateService";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getEvents } from "@/app/services/eventService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateCertificatesPage() {
  const [names, setNames] = useState("");
  const [events, setEvents] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { token } = useCredentials();
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents(1, 10);
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!names || !selectedId || !token) {
      setError("Please fill all fields and make sure you are logged in.");
      return;
    }

    setLoading(true);
    setError(null);

    const namesArray = names.split("\n").filter((name) => name.trim() !== "");

    try {
      console.log(`selected id : ${selectedId}, names : ${namesArray}`);
      await createCertificates(
        { names: namesArray, eventId: Number(selectedId) },
        token
      );
      router.push("/admin/certificates/all-certificates");
    } catch (err) {
      setError("Failed to create certificates. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create New Certificates</h1>
        <Button asChild variant="outline">
          <Link href="/admin/certificates/all-certificates">Cancel</Link>
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="names">Names (one per line)</Label>
            <Textarea
              id="names"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              className="min-h-[200px]"
              placeholder="John Doe\nJane Smith..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eventId">Event</Label>
            <Select onValueChange={setSelectedId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event, _) => (
                  <SelectItem
                    key={event.id}
                    value={event.id.toString()}
                  >
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Certificates
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
