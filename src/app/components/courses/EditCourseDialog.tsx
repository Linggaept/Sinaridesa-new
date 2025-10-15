"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCredentials } from "@/hooks/use-cred";
import { updateCourse } from "@/app/services/courseService";
import { Loader2 } from "lucide-react";

interface Course {
  id: number;
  title: string;
  uploader: string;
  description: string;
  filePath: string;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: {
    name: string;
    email: string;
  };
}

interface EditCourseDialogProps {
  course: Course | null;
  onClose: () => void;
  onCourseUpdated: () => void;
}

export function EditCourseDialog({ course, onClose, onCourseUpdated }: EditCourseDialogProps) {
  const [title, setTitle] = useState("");
  const [uploader, setUploader] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useCredentials();

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setUploader(course.uploader);
      setDescription(course.description);
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !token) {
      setError("Course data is missing or you are not logged in.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("uploader", uploader);
    formData.append("description", description);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await updateCourse(course.id, formData, token);
      onClose();
      onCourseUpdated();
    } catch (err) {
      setError("Failed to update course. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!course} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Update the details for this course.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="uploader" className="text-right">
                Uploader
              </Label>
              <Input
                id="uploader"
                value={uploader}
                onChange={(e) => setUploader(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="thumbnail" className="text-right">
                Thumbnail
              </Label>
              <Input
                id="thumbnail"
                type="file"
                onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
                className="col-span-3"
                accept="image/*"
              />
            </div>
            {error && <p className="text-red-500 text-sm col-span-4">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
