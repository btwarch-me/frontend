"use client"

import { useSubdomain } from "@/components/records/subdomain"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { TableCell, TableRow } from "@/components/ui/table"
import { apiFetch } from "@/lib/api"
import { PencilIcon, SaveIcon, Trash2, X } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"


export type RecordItem = {
    id: string
    subdomain_id: string
    record_type: "A" | "AAAA" | "CNAME" | "TXT"
    name: string
    content: string
    ttl: number
    priority?: number | null
    enabled: boolean
    cloudflare_record_id?: string | null
    created_at: string
    updated_at: string
}


export const RECORD_TYPES: RecordItem["record_type"][] = ["A", "AAAA", "CNAME", "TXT"]

export function Row({
    item,
    onChanged,
    onDeleted,
}: {
    item: RecordItem
    onChanged: (r: RecordItem) => void
    onDeleted: (id: string) => void
}) {
    const subdomain = useSubdomain()
    const [isEditing, setIsEditing] = useState(false)
    const [record_type, setRecordType] = useState<RecordItem["record_type"]>(item.record_type)
    const [record_name, setRecordName] = useState(item.name)
    const [record_value, setRecordValue] = useState(item.content)
    const [ttl, setTtl] = useState(item.ttl)
    const [is_active, setIsActive] = useState(item.enabled)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        if (record_type === "TXT") {
            setRecordName(item.name)
        } else {
            setRecordName(subdomain)
        }
        // eslint-disable-next-line
    }, [record_type, subdomain])

    const isLoading = isSaving || isDeleting

    const save = useCallback(async () => {
        setIsSaving(true)
        try {
            const updated = await apiFetch<RecordItem>(`/subdomains/records/${item.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name: record_type === "TXT" ? record_name : subdomain,
                    record_type,
                    content: record_value,
                    ttl,
                    enabled: is_active,
                }),
            })
            onChanged(updated)
            setIsEditing(false)
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e)
            const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/)
            const shownError = match ? match[0] : errorMessage
            toast.error(shownError, { description: "Failed to save record." })
        } finally {
            setIsSaving(false)
        }
    }, [record_type, record_name, record_value, ttl, is_active, item.id, subdomain, onChanged])

    const del = useCallback(async () => {
        setIsDeleting(true)
        try {
            await apiFetch(`/subdomains/records/${item.id}`, { method: "DELETE" })
            onDeleted(item.id)
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e)
            const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/)
            const shownError = match ? match[0] : errorMessage
            toast.error(shownError, { description: "Failed to delete record." })
        } finally {
            setIsDeleting(false)
        }
    }, [item.id, onDeleted])

    const badgeVariant = useMemo(() => {
        switch (record_type) {
            case "A":
                return "secondary"
            case "AAAA":
                return "default"
            case "CNAME":
            case "TXT":
            default:
                return "outline"
        }
    }, [record_type])

    return (
        <>
            <TableRow
                className={`
            group border-b last:border-b-0 
            transition hover:bg-muted/40 
            ${!isEditing && !item.enabled ? "opacity-50" : ""}
            ${isEditing && "bg-muted/20"}
          `}
            >
                <TableCell className="text-center align-middle py-3 w-fit">
                    {isEditing ? (
                        <Select
                            value={record_type}
                            onValueChange={(value) => setRecordType(value as RecordItem["record_type"])}
                            disabled={isLoading}
                        >
                            <SelectTrigger className="w-fit h-9 border-muted bg-muted/40 focus-visible:ring-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {RECORD_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <Badge variant={badgeVariant} className="px-2 w-full py-2 text-xs uppercase tracking-wider">{record_type}</Badge>
                    )}
                </TableCell>

                <TableCell className="text-center align-middle py-3 w-fit">
                    {isEditing ? (
                        <Input
                            className="text-center bg-muted/30 h-9 px-2 focus-visible:ring-0"
                            value={record_type === "TXT" ? record_name : subdomain}
                            onChange={(e) => setRecordName(e.target.value)}
                            disabled={isLoading || record_type !== "TXT"}
                            placeholder={subdomain}
                            maxLength={80}
                        />
                    ) : (
                        <div className="py-1.5 px-2 text-center bg-foreground/10 rounded-lg border border-foreground/10 whitespace-nowrap font-poppins text-sm truncate block max-w-full">
                            {record_name || subdomain}
                        </div>
                    )}
                </TableCell>

                <TableCell className="text-center align-middle py-3 w-fit">
                    {isEditing ? (
                        <Input
                            className="border-muted bg-muted/30 text-center h-9 px-2 focus-visible:ring-0"
                            value={record_value}
                            onChange={(e) => setRecordValue(e.target.value)}
                            disabled={isLoading}
                            placeholder="IP or value"
                            maxLength={255}
                        />
                    ) : (
                        <div className="py-1.5 px-2 text-center bg-foreground/10 rounded-lg border border-foreground/10 whitespace-nowrap font-poppins text-sm truncate block max-w-full text-foreground/90">
                            {record_value}
                        </div>
                    )}
                </TableCell>

                <TableCell className="text-center align-middle py-3 w-fit">
                    {isEditing ? (
                        <Input
                            className="w-fit border-muted bg-muted/30 text-center h-9 px-2 focus-visible:ring-0"
                            type="number"
                            min={0}
                            max={86400}
                            value={ttl}
                            onChange={(e) => setTtl(Number.parseInt(e.target.value) || 0)}
                            disabled={isLoading}
                            placeholder="TTL"
                        />
                    ) : (
                        <div className="text-xs px-2 py-1 rounded bg-muted/10 font-bold tracking-wide">{ttl}s</div>
                    )}
                </TableCell>


                <TableCell className="py-2 align-middle text-center w-fit">
                    <div className="flex items-center justify-center gap-1">
                        {isEditing ? (
                            <>
                                <Button onClick={save} disabled={isLoading} size="sm" className="rounded-md font-semibold flex text-white gap-1" title="Save">
                                    {isSaving ? <Spinner /> : <SaveIcon className="h-4 w-4" />}
                                </Button>
                                <Button onClick={del} disabled={isLoading} variant="destructive" size="sm" className="rounded-md flex bg-red-500 text-white gap-1" title="Delete">
                                    {isDeleting ? <Spinner /> : <Trash2 className="h-4 w-4" />}
                                </Button>
                                <Button
                                    type="button"
                                    disabled={isLoading}
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-md"
                                    onClick={() => {
                                        setIsEditing(false)
                                    }}
                                    title="Cancel"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => setIsEditing(true)}
                                variant="ghost"
                                size="sm"
                                className="rounded-md flex gap-1"
                                title="Edit"
                            >
                                <PencilIcon className="h-4 w-4 text-primary" />
                            </Button>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}
