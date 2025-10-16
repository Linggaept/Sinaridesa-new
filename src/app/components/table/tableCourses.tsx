"use client";

import {
  deleteCourse,
  getCourses,
  searchCourses
} from "@/app/services/courseService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCredentials } from "@/hooks/use-cred";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MoreHorizontal,
  Search,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useEffect, useState } from "react";
import { EditCourseDialog } from "../courses/EditCourseDialog";

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

interface ApiResponse {
  status: string;
  message: string;
  data: Course[];
  pagination: {
    totalCourses: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export function CoursesTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalCourses: 1,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });
  const [detailRow, setDetailRow] = useState<Course | null>(null);
  const [editRow, setEditRow] = useState<Course | null>(null);
  const [deleteRow, setDeleteRow] = useState<Course | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { token } = useCredentials();
  const debouncedQuery = useDebounce(query, 500);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response: ApiResponse;

      if (debouncedQuery.trim()) {
        response = await searchCourses(debouncedQuery, page, perPage);
      } else {
        response = await getCourses(page, perPage);
      }

      setCourses(response.data || []);
      setPagination(
        response.pagination || {
          totalCourses: 0,
          totalPages: 1,
          currentPage: 1,
          limit: perPage,
        }
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage, debouncedQuery]);

  const handleDelete = async () => {
    if (!deleteRow || !token) return;

    try {
      await deleteCourse(deleteRow.id, token);
      setDeleteRow(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  function resetPagination() {
    setPage(1);
  }

  React.useEffect(() => {
    resetPagination();
  }, [debouncedQuery, perPage]);

  function openDetail(row: Course) {
    setDetailRow(row);
  }

  function openEdit(row: Course) {
    setEditRow(row);
  }

  function requestDelete(row: Course) {
    setDeleteRow(row);
  }

  const totalPages = pagination.totalPages ?? 1;
  const currentPage = pagination.currentPage ?? 1;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:max-w-md">
          <div className="relative w-full">
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul, uploader, deskripsi..."
              className="pl-8"
              aria-label="Cari"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="per-page" className="text-sm text-muted-foreground">
            Baris per halaman
          </label>
          <select
            id="per-page"
            className={cn(
              "h-9 rounded-md border px-2 text-sm",
              "bg-background text-foreground"
            )}
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            aria-label="Baris per halaman"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption className="text-muted-foreground">
            Total {pagination.totalCourses} data • Halaman {currentPage} dari{" "}
            {totalPages}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Uploader</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="w-0 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="flex items-center justify-center gap-2 py-8">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Memuat data...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : courses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              courses.map((row) => (
                <TableRow key={row.id} data-rowid={row.id}>
                  <TableCell>
                    <div className="size-16 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                      {row.thumbnail ? (
                        <Image
                          src={`https://api.sinaridesa.com/${row.thumbnail}`}
                          alt={row.title}
                          className="size-full object-cover"
                          width={64}
                          height={64}
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No Image
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate">{row.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {row.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{row.uploader}</div>
                    <div className="text-xs text-muted-foreground">
                      {row.author.email}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(row.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <RowActions
                      onDetail={() => openDetail(row)}
                      onEdit={() => openEdit(row)}
                      onDelete={() => requestDelete(row)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Menampilkan {courses.length > 0 ? (currentPage - 1) * perPage + 1 : 0}{" "}
          - {Math.min(currentPage * perPage, pagination.totalCourses)} dari{" "}
          {pagination.totalCourses}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || loading}
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="mr-1 size-4" />
            Prev
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              const pageNumber = idx + 1;
              return (
                <Button
                  key={pageNumber}
                  size="sm"
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  onClick={() => setPage(pageNumber)}
                  disabled={loading}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                >
                  {pageNumber}
                </Button>
              );
            })}
            {totalPages > 5 ? (
              <>
                <span className="px-1 text-sm text-muted-foreground">...</span>
                <Button
                  size="sm"
                  variant={currentPage === totalPages ? "default" : "outline"}
                  onClick={() => setPage(totalPages)}
                  disabled={loading}
                >
                  {totalPages}
                </Button>
              </>
            ) : null}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || loading}
            aria-label="Halaman berikutnya"
          >
            Next
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!detailRow} onOpenChange={(o) => !o && setDetailRow(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Course</DialogTitle>
            <DialogDescription>
              Informasi lengkap course terpilih.
            </DialogDescription>
          </DialogHeader>
          {detailRow ? (
            <div className="grid gap-3 text-sm">
              {detailRow.thumbnail && (
                <div className="flex items-center justify-center">
                  <Image
                    src={`https://api.sinaridesa.com/${detailRow.thumbnail}`}
                    alt={detailRow.title}
                    className="max-h-48 rounded-md object-cover"
                    width={500}
                    height={500}
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground min-w-24">Judul</span>
                <span className="font-medium text-right">
                  {detailRow.title}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground min-w-24">
                  Deskripsi
                </span>
                <span className="text-right">{detailRow.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Uploader</span>
                <span className="font-medium">{detailRow.uploader}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Author</span>
                <div className="text-right">
                  <div>{detailRow.author.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {detailRow.author.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">PDF</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `https://api.sinaridesa.com/${detailRow.filePath}`,
                      "_blank"
                    )
                  }
                >
                  Download PDF
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Dibuat</span>
                <span>
                  {new Date(detailRow.createdAt).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Diupdate</span>
                <span>
                  {new Date(detailRow.updatedAt).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailRow(null)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditCourseDialog
        course={editRow}
        onClose={() => setEditRow(null)}
        onCourseUpdated={fetchData}
      />

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteRow}
        onOpenChange={(o) => !o && setDeleteRow(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus course?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Course{" "}
              <span className="font-medium">{deleteRow?.title}</span> akan
              dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function RowActions({
  onDetail,
  onEdit,
  onDelete,
}: {
  onDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Aksi baris">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuItem onClick={onDetail}>Detail</DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={onDelete}
        >
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
