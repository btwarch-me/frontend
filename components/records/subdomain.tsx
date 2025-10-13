"use client"

import { apiFetch } from "@/lib/api"
import { useEffect, useState } from "react"

export function useSubdomain() {
    const [subdomain, setSubdomain] = useState("")
    useEffect(() => {
      apiFetch<{ subdomain: { subdomain: string } }>("/subdomains")
        .then((data) => setSubdomain(data.subdomain.subdomain))
        .catch(() => setSubdomain(""))
    }, [])
    return subdomain
  }
  