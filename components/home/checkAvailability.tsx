"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { apiFetch, goToAuth } from "@/lib/api"
import { useAppSelector } from "@/lib/hooks"
import type { RootState } from "@/lib/store"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

type AvailabilityResponse = { available: boolean }
type ClaimResponse = {
  message: string
  subdomain: {
    id: string
    user_id: string
    subdomain: string
    base_domain: string
    full_domain: string
    status: string
    description?: string
    custom_metadata?: string
    created_at: string
    updated_at: string
  }
}

export function CheckAvailabilitySection() {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const [subdomain, setSubdomain] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [claimResult, setClaimResult] = useState<ClaimResponse | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const latestCheckRef = useRef(0)

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    if (!subdomain.trim()) {
      setAvailability(null)
      setIsChecking(false)
      return
    }

    setAvailability(null)
    setIsChecking(true)
    const checkId = Date.now()
    latestCheckRef.current = checkId

    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await apiFetch<AvailabilityResponse>("/public/subdomains/check-availability", {
          method: "POST",
          body: JSON.stringify({
            subdomain: subdomain,
            base_domain: "btwarch.me"
          }),
        })
        if (latestCheckRef.current === checkId) {
          setAvailability(res)
        }
      } catch (e: unknown) {
        if (latestCheckRef.current === checkId) {
          setAvailability(null)
          toast.error(e instanceof Error ? e.message : String(e), { description: "Error checking availability" })
        }
      } finally {
        if (latestCheckRef.current === checkId) {
          setIsChecking(false)
        }
      }
    }, 500)

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
    // eslint-disable-next-line
  }, [subdomain])

  const onFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!subdomain.trim()) return

      setAvailability(null)
      setClaimResult(null)
      setIsChecking(true)

      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      const checkId = Date.now()
      latestCheckRef.current = checkId

      try {
        const res = await apiFetch<AvailabilityResponse>("/public/subdomains/check-availability", {
          method: "POST",
          body: JSON.stringify({
            subdomain: subdomain,
            base_domain: "btwarch.me"
          }),
        })
        if (latestCheckRef.current === checkId) {
          setAvailability(res)
        }
      } catch (e: unknown) {
        if (latestCheckRef.current === checkId) {
          toast.error(e instanceof Error ? e.message : String(e), { description: "Error checking availability" })
        }
      } finally {
        if (latestCheckRef.current === checkId) {
          setIsChecking(false)
        }
      }
    },
    [subdomain]
  )

  const claimSubdomain = async () => {
    if (!isAuthenticated) {
      goToAuth()
      toast("Authentication Required", {
        description: "Please sign in to claim a subdomain.",
        icon: <AlertCircle className="text-yellow-600" />
      })
      return
    }

    setIsClaiming(true)

    try {
      const res = await apiFetch<ClaimResponse>("/subdomains", {
        method: "POST",
        body: JSON.stringify({
          subdomain: subdomain,
          base_domain: "btwarch.me"
        }),
      })
      setClaimResult(res)
      setAvailability(null)
      toast.success("Subdomain claimed!", {
        description: (
          <span>
            You now own <span className="font-poppins">{res.subdomain.full_domain}</span>
          </span>
        ),
        icon: <CheckCircle2 className="text-primary" />
      })
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : String(e), { description: "Error claiming subdomain" })
    } finally {
      setIsClaiming(false)
    }
  }

  const inputBorderClass = (() => {
    if (availability && availability.available && !isClaiming) {
      return "border-green-600"
    }
    if (availability && !availability.available && !isClaiming) {
      return "border-red-500"
    }
    return "border-border"
  })()

  function renderStatusMessage() {
    if (isChecking) {
      return (
        <div className="flex items-center text-base font-semibold text-blue-600 gap-2 pt-1">
          <Loader2 className="animate-spin w-4 h-4" />
          Checking availability...
        </div>
      )
    }
    if (availability && availability.available && !isClaiming) {
      return (
        <div className="flex items-center text-base font-medium text-green-600 gap-2 pt-1">
          <CheckCircle2 className="w-5 h-5" />
          Subdomain is available!
        </div>
      )
    }
    if (availability && !availability.available && !isClaiming) {
      return (
        <div className="flex items-center text-base font-medium text-red-600 gap-2 pt-1">
          <AlertCircle className="w-5 h-5" />
          Subdomain is already taken.
        </div>
      )
    }
    if (claimResult) {
      return (
        <div className="flex items-center text-base font-semibold text-green-700 gap-2 pt-1">
          <CheckCircle2 className="w-5 h-5" />
          Claimed! <span className="text-foreground">{claimResult.subdomain.full_domain}</span>
        </div>
      )
    }
    return null
  }

  return (
    <section id="checker" className="py-20 bg-background">
      <div className="max-w-2xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black font-poppins text-foreground mb-3 tracking-tight leading-snug">
            Claim your <span className="text-blue-600">.btwarch.me</span> subdomain
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-light font-sans">
            Find out if your unique subdomain is available below, then claim it instantly.
          </p>
        </div>
        <Card className="border border-border shadow-none bg-background">
          <CardHeader className="border-b border-border pb-5">
            <CardTitle className="text-2xl md:text-3xl font-extrabold font-poppins tracking-tight text-foreground">
              Subdomain availability
            </CardTitle>
            <CardDescription className="text-base md:text-lg mt-1 font-normal text-muted-foreground">
              <span className="font-medium font-mono">Enter the name you want (without .btwarch.me):</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-8">
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (!subdomain.trim()) return
                setClaimResult(null)

                if (availability && availability.available) {
                  await claimSubdomain()
                } else {
                  await onFormSubmit(e)
                }
              }}
              className="space-y-1"
            >
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="yourname"
                    value={subdomain}
                    onChange={e => {
                      setSubdomain(
                        e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                      )
                      setClaimResult(null)
                    }}
                    disabled={isClaiming}
                    className={`font-poppins text-lg md:text-xl px-5 py-4 ${inputBorderClass} focus-visible:ring-0 transition`}
                    inputMode="text"
                    autoComplete="off"
                    maxLength={32}
                    spellCheck={false}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none text-base md:text-lg font-mono font-semibold text-muted-foreground tracking-wider">
                    .btwarch.me
                  </span>
                </div>
                <Button
                  type="submit"
                  disabled={
                    isChecking ||
                    isClaiming ||
                    !subdomain.trim() ||
                    (!!availability && !availability.available)
                  }
                  size="lg"
                  className={`min-w-[140px] text-white font-bold text-lg uppercase ${isChecking || isClaiming ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Checking
                    </>
                  ) : availability && availability.available ? (
                    isClaiming ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Claiming...
                      </>
                    ) : (
                      <>Claim</>
                    )
                  ) : (
                    "Claim"
                  )}
                </Button>
              </div>
              <div className="min-h-[38px] mt-1">{renderStatusMessage()}</div>
            </form>
            {claimResult && (
              <div className="space-y-4">
                <Button onClick={() => router.push("/records")} size="lg" className="w-full font-semibold shadow-sm cursor-pointer">
                  Manage DNS Records
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
