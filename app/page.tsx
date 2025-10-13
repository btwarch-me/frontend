"use client"

import { CheckAvailabilitySection } from "@/components/home/checkAvailability"
import { HeroSection } from "@/components/home/heroSection"
import { Users } from "@/components/home/users"
import { apiFetch } from "@/lib/api"
import { useEffect, useState } from "react"

export default function Home() {
  const [subdomain, setSubdomain] = useState<string>("")
  useEffect(() => {
    const fetchUsers = async () => {
      const subdomain = await apiFetch<{ subdomain: { subdomain: string } }>("/subdomains")
      setSubdomain(subdomain.subdomain.subdomain)
    }
    fetchUsers()
  }, [])

  return (
    <main className="min-h-screen font-poppins">
      <HeroSection />
      {!subdomain && <CheckAvailabilitySection /> }
      <Users />
    </main>
  )
}
