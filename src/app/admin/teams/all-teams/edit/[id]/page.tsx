"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCredentials } from "@/hooks/use-cred";
import { getTeamById, updateTeam } from "@/app/services/teamService";
import { Loader2, PlusCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Skill {
  id: number;
  name: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  picture: string | null;
  skills: Skill[];
}

export default function EditTeamPage() {
  const [team, setTeam] = useState<TeamMember | null>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState<string[]>([""]);
  const [picture, setPicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useCredentials();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchTeam = async () => {
        try {
          const response = await getTeamById(id as string);
          const teamData = response.data;
          setTeam(teamData);
          setName(teamData.name);
          setPosition(teamData.position);
          setSkills(teamData.skills.map((skill: Skill) => skill.name));
        } catch (err) {
          setError("Failed to fetch team data.");
          console.error(err);
        }
      };
      fetchTeam();
    }
  }, [id]);

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !token) {
      setError("Team ID is missing or you are not logged in.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("skills", skills.join(","));
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      await updateTeam(Number(id), formData, token);
      router.push("/admin/teams/all-teams");
    } catch (err) {
      setError("Failed to update team member. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!team) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading team data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Team Member</h1>
        <Button asChild variant="outline">
          <Link href="/admin/teams/all-teams">Cancel</Link>
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
            <Label htmlFor="position">Position</Label>
            <Select onValueChange={setPosition} value={position}>
              <SelectTrigger>
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MENTOR">Mentor</SelectItem>
                <SelectItem value="TEAM">Team</SelectItem>
                <SelectItem value="ALUMNI">Alumni</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Skills</Label>
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSkill(index)}
                  disabled={skills.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSkill} className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="picture">Picture (leave blank to keep existing)</Label>
            <Input
              id="picture"
              type="file"
              onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
              accept="image/*"
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
