"use client"

import { RecordCreateRow } from "@/components/records/create"
import { RecordItem, Row } from "@/components/records/row"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { apiFetch, goToAuth } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

type RecordsResponse = {
  records: RecordItem[]
  message: string
}

export default function RecordsPage() {
  const router = useRouter()
  const [records, setRecords] = useState<RecordItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    apiFetch("/auth/me").catch(goToAuth)

    setLoading(true)
    apiFetch<RecordsResponse>("/subdomains/records")
      .then((data) => setRecords(data.records))
      .catch((e: unknown) => {
        const errorMessage = e instanceof Error ? e.message : String(e)
        const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/)
        const shownError = match ? match[0] : errorMessage
        toast.error(shownError, { description: "Failed to fetch records." })
      })
      .finally(() => setLoading(false))
  }, [router])

  const onCreated = useCallback((r: RecordItem) => {
    setRecords((prev) => [r, ...prev])
  }, [])

  const onChanged = useCallback((r: RecordItem) => {
    setRecords((prev) => prev.map((x) => (x.id === r.id ? r : x)))
  }, [])

  const onDeleted = useCallback((id: string) => {
    setRecords((prev) => prev.filter((x) => x.id !== id))
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">DNS Records</h1>
            <p className="text-muted-foreground text-base">
              Manage your DNS records for your{" "}
              <span className="font-poppins bg-muted px-1 rounded">btwarch.me</span> subdomain.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        ) : (
          <Card className="shadow-2xl border border-muted/30 overflow-x-auto py-0 bg-background/90">
            <CardContent className="p-0">
              <div className="w-full overflow-x-auto custom-scrollbar">
                <Table className="min-w-full bg-transparent rounded-xl">
                  <TableHeader>
                    <TableRow className="border-b bg-muted/40 text-foreground">
                      <TableHead className="py-3 text-center tracking-widest text-xs font-semibold uppercase">Type</TableHead>
                      <TableHead className="py-3 text-center tracking-widest text-xs font-semibold uppercase">Name</TableHead>
                      <TableHead className="py-3 text-center tracking-widest text-xs font-semibold uppercase">Content</TableHead>
                      <TableHead className="py-3 text-center tracking-widest text-xs font-semibold uppercase">TTL</TableHead>
                      <TableHead className="py-3 text-center tracking-widest text-xs font-semibold uppercase">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <RecordCreateRow onCreated={onCreated} />
                    {records.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <div className="py-12 text-center text-muted-foreground font-semibold text-lg">
                            No DNS records yet.<br />
                            <span className="text-base font-normal">Create your first record above.</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      records.map((it) => (
                        <Row key={it.id} item={it} onChanged={onChanged} onDeleted={onDeleted} />
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .custom-scrollbar {
          scrollbar-color: #d1d5db transparent;
          scrollbar-width: thin;
        }
      `}</style>
    </main>
  )
}
