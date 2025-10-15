"use client";

import {
  deleteTeam,
  getTeams,
  searchTeams,
} from "@/app/services/teamService";
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

interface Skill {
  id: number;
  name: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  picture: string | null;
  skills?: Skill[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: TeamMember[];
  pagination: {
    totalTeamMembers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export function TeamsTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalTeamMembers: 1,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });
  const [detailRow, setDetailRow] = useState<TeamMember | null>(null);
  const [deleteRow, setDeleteRow] = useState<TeamMember | null>(null);
  const { token } = useCredentials();
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      let response: ApiResponse;

      if (debouncedQuery.trim()) {
        response = await searchTeams(debouncedQuery, page, perPage);
      } else {
        response = await getTeams(page, perPage);
      }

      setTeams(response.data || []);
      setPagination(
        response.pagination || {
          totalTeamMembers: 0,
          totalPages: 1,
          currentPage: 1,
          limit: perPage,
        }
      );
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]);
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
      await deleteTeam(deleteRow.id, token);
      setDeleteRow(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  function resetPagination() {
    setPage(1);
  }

  React.useEffect(() => {
    resetPagination();
  }, [debouncedQuery, perPage]);

  function openDetail(row: TeamMember) {
    setDetailRow(row);
  }

  function openEdit(row: TeamMember) {
    router.push(`/admin/teams/all-teams/edit/${row.id}`);
  }

  function requestDelete(row: TeamMember) {
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
              placeholder="Cari nama, posisi, skill..."
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
            <Link href="/admin/teams/all-teams/create">
              <PlusCircle className="mr-2 size-4" />
              Create Team
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption className="text-muted-foreground">
            Total {pagination.totalTeamMembers} data • Halaman {currentPage} dari{" "}
            {totalPages}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Picture</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Skills</TableHead>
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
            ) : teams.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              teams.map((row) => (
                <TableRow key={row.id} data-rowid={row.id}>
                  <TableCell>
                    <div className="size-16 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                      {row.picture ? (
                        <Image
                          src={`http://20.6.8.101/${row.picture}`}
                          alt={row.name}
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
                    <div className="truncate">{row.name}</div>
                  </TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.skills?.map(skill => skill.name).join(', ')}</TableCell>
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
          Menampilkan {teams.length > 0 ? (currentPage - 1) * perPage + 1 : 0}{" "}
          - {Math.min(currentPage * perPage, pagination.totalTeamMembers)} dari{" "}
          {pagination.totalTeamMembers}
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
                  {detailRow.picture ? (
                    <Image
                      src={`http://20.6.8.101/${detailRow.picture}`}
                      alt={detailRow.name}
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
                  <DialogTitle className="text-2xl">{detailRow.name}</DialogTitle>
                  <DialogDescription>
                    {detailRow.position}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-1">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {detailRow.skills?.map(skill => (
                        <span key={skill.id} className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                          {skill.name}
                        </span>
                      ))}
                    </div>
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
            <AlertDialogTitle>Hapus team member?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Team member{" "}
              <span className="font-medium">{deleteRow?.name}</span> akan
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
