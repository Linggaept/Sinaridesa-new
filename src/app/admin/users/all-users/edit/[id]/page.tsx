'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCredentials } from "@/hooks/use-cred";
import { getUserById, updateUser } from "@/app/services/usersService";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function EditUserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useCredentials();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id && token) {
      const fetchUser = async () => {
        try {
          const response = await getUserById(id as string, token);
          const userData = response.data;
          setUser(userData);
          setName(userData.name);
          setEmail(userData.email);
        } catch (err) {
          setError("Failed to fetch user data.");
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !token) {
      setError("User ID is missing or you are not logged in.");
      return;
    }

    setLoading(true);
    setError(null);

    const dataToUpdate: { name?: string; email?: string; } = {};
    if (name !== user?.name) dataToUpdate.name = name;
    if (email !== user?.email) dataToUpdate.email = email;

    if (Object.keys(dataToUpdate).length === 0) {
      setLoading(false);
      setError("No changes detected.");
      return;
    }

    try {
      await updateUser(Number(id), dataToUpdate, token);
      router.push("/admin/users/all-users");
    } catch (err) {
      setError("Failed to update user. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading user data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <Button asChild variant="outline">
          <Link href="/admin/users/all-users">Cancel</Link>
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
