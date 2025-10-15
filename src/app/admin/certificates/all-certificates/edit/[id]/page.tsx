'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCredentials } from "@/hooks/use-cred";
import { getCertificateById, updateCertificate } from "@/app/services/certificateService";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

interface Certificate {
  id: number;
  name: string;
  eventId: number;
  revoked: boolean;
}

export default function EditCertificatePage() {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [name, setName] = useState("");
  const [eventId, setEventId] = useState<number | ''>( '');
  const [revoked, setRevoked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useCredentials();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id && token) {
      const fetchCertificate = async () => {
        try {
          const response = await getCertificateById(id as string, token);
          const certData = response;
          setCertificate(certData);
          setName(certData.name);
          setEventId(certData.eventId);
          setRevoked(certData.revoked);
        } catch (err) {
          setError("Failed to fetch certificate data.");
          console.error(err);
        }
      };
      fetchCertificate();
    }
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !token) {
      setError("Certificate ID is missing or you are not logged in.");
      return;
    }

    setLoading(true);
    setError(null);

    const dataToUpdate: { name?: string; eventId?: number; revoked?: boolean } = {};
    if (name !== certificate?.name) dataToUpdate.name = name;
    if (Number(eventId) !== certificate?.eventId) dataToUpdate.eventId = Number(eventId);
    if (revoked !== certificate?.revoked) dataToUpdate.revoked = revoked;

    if (Object.keys(dataToUpdate).length === 0) {
      setLoading(false);
      setError("No changes detected.");
      return;
    }

    try {
      await updateCertificate(Number(id), dataToUpdate, token);
      router.push("/admin/certificates/all-certificates");
    } catch (err) {
      setError("Failed to update certificate. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!certificate) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading certificate data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Certificate</h1>
        <Button asChild variant="outline">
          <Link href="/admin/certificates/all-certificates">Cancel</Link>
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eventId">Event ID</Label>
            <Input
              id="eventId"
              type="number"
              value={eventId}
              onChange={(e) => setEventId(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="revoked" checked={revoked} onCheckedChange={(checked) => setRevoked(!!checked)} />
            <label
              htmlFor="revoked"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Revoked
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
