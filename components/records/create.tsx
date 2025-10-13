"use client"

import { RECORD_TYPES, RecordItem } from "@/components/records/row"
import { useSubdomain } from "@/components/records/subdomain"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { TableCell, TableRow } from "@/components/ui/table"
import { apiFetch } from "@/lib/api"
import { Plus } from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"


export function RecordCreateRow({ onCreated }: { onCreated: (r: RecordItem) => void }) {
    const subdomain = useSubdomain()
  
    const [record_type, setRecordType] = useState<RecordItem["record_type"]>("A")
    const [record_name, setRecordName] = useState("")
    const [record_value, setRecordValue] = useState("")
    const [ttl, setTtl] = useState(300)
    const [is_active, setIsActive] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    useEffect(() => {
      if (record_type === "TXT") {
        setRecordName("")
      } else {
        setRecordName(subdomain)
      }
      // eslint-disable-next-line
    }, [record_type, subdomain])
  
    const clearForm = useCallback(() => {
      setRecordName("")
      setRecordValue("")
      setTtl(300)
      setIsActive(true)
    }, [])
  
    const submit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
          const created = await apiFetch<RecordItem>("/subdomains/records", {
            method: "POST",
            body: JSON.stringify({
              name: record_type === "TXT" ? record_name : subdomain,
              record_type,
              content: record_value,
              ttl,
              enabled: is_active,
            }),
          })
          onCreated(created)
          clearForm()
        } catch (e: unknown) {
          const errorMessage = e instanceof Error ? e.message : String(e)
          const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/)
          const shownError = match ? match[0] : errorMessage
          toast.error(shownError, { description: "Failed to create record." })
        } finally {
          setIsSubmitting(false)
        }
      },
      [record_type, record_name, record_value, ttl, is_active, onCreated, subdomain, clearForm]
    )
  
    return (
      <>
        <TableRow className="border-b bg-background hover:bg-muted/50 transition">
          <TableCell className="text-center align-middle py-3 w-[90px]">
            <Select
              value={record_type}
              onValueChange={(value) => setRecordType(value as RecordItem["record_type"])}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full h-9 border-muted bg-muted/30 focus-visible:ring-0">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {RECORD_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell
            className={`text-center align-middle py-3 w-fit ${record_type === "TXT" ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            <div className="relative group">
              {record_type !== "TXT" && (
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-10 rounded bg-black text-white px-2 py-1 text-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Only allowed when type is TXT
                </span>
              )}
              <Input
                className={`text-center bg-muted/30 h-9 px-2 focus-visible:ring-0`}
                value={record_type === "TXT" ? record_name : subdomain}
                onChange={(e) => setRecordName(e.target.value)}
                disabled={isSubmitting || record_type !== "TXT"}
                placeholder={subdomain}
                maxLength={80}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </TableCell>
          <TableCell className="text-center align-middle py-3 w-fit">
            <Input
              className="border-muted bg-muted/30 text-center h-9 px-2 focus-visible:ring-0"
              value={record_value}
              onChange={(e) => setRecordValue(e.target.value)}
              disabled={isSubmitting}
              placeholder="IP or value"
              autoComplete="off"
              maxLength={255}
            />
          </TableCell>
          <TableCell className="text-center align-middle py-3 w-fit">
            <Input
              className="w-fit border-muted bg-muted/30 text-center h-9 px-2 focus-visible:ring-0"
              type="number"
              min={0}
              max={86400}
              value={ttl}
              onChange={(e) => setTtl(Number.parseInt(e.target.value) || 0)}
              disabled={isSubmitting}
              placeholder="TTL"
            />
          </TableCell>
          <TableCell className="py-2 align-middle text-center w-fit">
            <form onSubmit={submit} className="inline-flex">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                className="rounded-md bg-primary text-white font-semibold flex gap-1"
                title="Add Record"
              >
                {isSubmitting ? <Spinner /> : <Plus className="h-4 w-4" />}
              </Button>
            </form>
          </TableCell>
        </TableRow>
      </>
    )
  }
  