"use client";

import {
  deleteEvent,
  getEvents,
  searchEvents,
} from "@/app/services/eventService";
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
  PlusCircle,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
  participants: number;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Event[];
  pagination: {
    totalEvents: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export function EventsTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalEvents: 1,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });
  const [detailRow, setDetailRow] = useState<Event | null>(null);
  const [deleteRow, setDeleteRow] = useState<Event | null>(null);
  const { token } = useCredentials();
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      let response: ApiResponse;

      if (debouncedQuery.trim()) {
        response = await searchEvents(debouncedQuery, page, perPage);
      } else {
        response = await getEvents(page, perPage);
      }

      setEvents(response.data || []);
      setPagination(
        response.pagination || {
          totalEvents: 0,
          totalPages: 1,
          currentPage: 1,
          limit: perPage,
        }
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
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
      await deleteEvent(deleteRow.id, token);
      setDeleteRow(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  function resetPagination() {
    setPage(1);
  }

  React.useEffect(() => {
    resetPagination();
  }, [debouncedQuery, perPage]);

  function openDetail(row: Event) {
    setDetailRow(row);
  }

  function openEdit(row: Event) {
    router.push(`/admin/events/all-events/edit/${row.id}`);
  }

  function requestDelete(row: Event) {
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
              placeholder="Cari judul, deskripsi, lokasi..."
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
          <Button asChild>
            <Link href="/admin/events/all-events/create">
              <PlusCircle className="mr-2 size-4" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption className="text-muted-foreground">
            Total {pagination.totalEvents} data • Halaman {currentPage} dari{" "}
            {totalPages}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>participants</TableHead>
              <TableHead>Lokasi</TableHead>
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
            ) : events.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              events.map((row) => (
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
                  <TableCell>{row.participants}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(row.date).toLocaleDateString("id-ID", {
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
          Menampilkan {events.length > 0 ? (currentPage - 1) * perPage + 1 : 0}{" "}
          - {Math.min(currentPage * perPage, pagination.totalEvents)} dari{" "}
          {pagination.totalEvents}
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
        <DialogContent className="max-w-4xl">
          {detailRow ? (
            <div className="flex gap-8">
              <div className="w-1/3 flex-shrink-0">
                <div className="aspect-square relative rounded-md overflow-hidden">
                  {detailRow.thumbnail ? (
                    <Image
                      src={`https://api.sinaridesa.com/${detailRow.thumbnail}`}
                      alt={detailRow.title}
                      layout="fill"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">No Image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl">{detailRow.title}</DialogTitle>
                  <DialogDescription>
                    {new Date(detailRow.date).toLocaleDateString("id-ID", {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })} • {detailRow.location}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-1">Description</h3>
                    <p className="text-muted-foreground">{detailRow.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Participants</h3>
                    <p className="text-muted-foreground">{detailRow.participants}</p>
                  </div>
                  <div className="text-xs text-muted-foreground pt-4">
                    <p>Created at: {new Date(detailRow.createdAt).toLocaleString("id-ID")}</p>
                    <p>Last updated: {new Date(detailRow.updatedAt).toLocaleString("id-ID")}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailRow(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteRow}
        onOpenChange={(o) => !o && setDeleteRow(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus event?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Event{" "}
              <span className="font-medium">{deleteRow?.title}</span> akan
              dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-red-700"
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
