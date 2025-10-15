"use client";

import {
  deleteCertificate,
  getAllCertificates,
  revokeCertificate,
  searchCertificates,
} from "@/app/services/certificateService";
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
import { Loader2, MoreHorizontal, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Events {
  title: string;
}

interface Certificate {
  id: number;
  certificate_code: string;
  hash: string;
  name: string;
  event: Events;
  issued_at: string;
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
}

export function CertificatesTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalCertificates: 1,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });
  const [detailRow, setDetailRow] = useState<Certificate | null>(null);
  const [revokeRow, setRevokeRow] = useState<Certificate | null>(null);
  const [deleteRow, setDeleteRow] = useState<Certificate | null>(null);
  const [showHash, setShowHash] = useState(false);
  const { token } = useCredentials();
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      let response;
      if (debouncedQuery.trim()) {
        response = await searchCertificates(debouncedQuery, token);
        setCertificates(response || []);
      } else {
        response = await getAllCertificates(token);
        setCertificates(response || []);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage, debouncedQuery, token]);

  const handleRevoke = async () => {
    if (!revokeRow || !token) return;

    try {
      await revokeCertificate(revokeRow.id, token);
      setRevokeRow(null);
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error revoking certificate:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteRow || !token) return;

    try {
      await deleteCertificate(deleteRow.id, token);
      setDeleteRow(null);
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  function openDetail(row: Certificate) {
    setDetailRow(row);
  }

  function openEdit(row: Certificate) {
    router.push(`/admin/certificates/all-certificates/edit/${row.id}`);
  }

  function requestRevoke(row: Certificate) {
    setRevokeRow(row);
  }

  function requestDelete(row: Certificate) {
    setDeleteRow(row);
  }

  return (
    <div className="space-y-4">
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
              placeholder="Cari nama..."
              className="pl-8"
              aria-label="Cari"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption className="text-muted-foreground">
            Total {certificates.length} data
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Certificate Code</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Issued At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-0 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <div className="flex items-center justify-center gap-2 py-8">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Memuat data...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : certificates.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground py-8"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.certificate_code}</TableCell>
                  <TableCell>{row.event.title}</TableCell>
                  <TableCell>
                    {new Date(row.issued_at).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>
                    {row.revoked ? (
                      <span className="text-red-500">Revoked</span>
                    ) : (
                      <span className="text-green-500">Active</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <RowActions
                      onDetail={() => openDetail(row)}
                      onEdit={() => openEdit(row)}
                      onRevoke={() => requestRevoke(row)}
                      onDelete={() => requestDelete(row)}
                      isRevoked={row.revoked}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!detailRow} onOpenChange={(o) => {
        if (!o) {
          setDetailRow(null);
          setShowHash(false); // Reset when closing
        }
      }}>
        <DialogContent className="max-w-3xl">
          {detailRow ? (
            <>
              <DialogHeader>
                <DialogTitle>Certificate Details</DialogTitle>
                <DialogDescription>ID: {detailRow.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {detailRow.name}
                </p>
                <p>
                  <strong>Certificate Code:</strong>{" "}
                  {detailRow.certificate_code}
                </p>
                <div className="flex items-center gap-2">
                  <strong>Hash:</strong>
                  <Button variant="outline" size="sm" onClick={() => setShowHash(!showHash)}>
                    {showHash ? "Hide" : "Show"}
                  </Button>
                </div>
                {showHash && (
                  <p className="break-words max-w-full p-2 bg-muted rounded-md">
                    {detailRow.hash}
                  </p>
                )}
                <p>
                  <strong>Event:</strong> {detailRow.event.title}
                </p>
                <p>
                  <strong>Issued At:</strong>{" "}
                  {new Date(detailRow.issued_at).toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {detailRow.revoked ? "Revoked" : "Active"}
                </p>
              </div>
            </>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailRow(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Confirm */}
      <AlertDialog
        open={!!revokeRow}
        onOpenChange={(o) => !o && setRevokeRow(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to revoke this certificate?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Certificate for{" "}
              <span className="font-medium">{revokeRow?.name}</span> will be
              revoked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-red-700"
              onClick={handleRevoke}
            >
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteRow}
        onOpenChange={(o) => !o && setDeleteRow(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this certificate?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Certificate for{" "}
              <span className="font-medium">{deleteRow?.name}</span> will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
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
  onRevoke,
  onDelete,
  isRevoked,
}: {
  onDetail: () => void;
  onEdit: () => void;
  onRevoke: () => void;
  onDelete: () => void;
  isRevoked: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Row Actions">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onDetail}>Detail</DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onRevoke} disabled={isRevoked}>
          Revoke
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={onDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
