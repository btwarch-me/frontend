import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import StoreProvider from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "btwarch.me | Embrace the Arch Linux Way",
  description: "Embrace the Arch Linux way: claim your own free .btwarch.me subdomain and showcase your passion for open-source. Simple, unique identity for Arch users and enthusiasts.",
  keywords: [
    "btwarch.me",
    "Arch Linux",
    "free subdomain",
    "open source",
    "linux community",
    "arch linux domains",
    "linux identity"
  ],
  openGraph: {
    title: "btwarch.me | Embrace the Arch Linux Way",
    description: "Claim a free .btwarch.me subdomain and join the Arch Linux community.",
    url: "https://btwarch.me",
    siteName: "btwarch.me",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "btwarch.me | Embrace the Arch Linux Way",
    description: "Get your own .btwarch.me subdomain and show off your Arch Linux pride.",
    site: "@btwarchme"
  }
}


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased font-sans bg-background text-foreground selection:bg-blue-600/20 selection:text-blue-700`}
        style={{ fontFeatureSettings: `"liga" 1, "kern" 1` }}
      >
        <StoreProvider>
          <Suspense fallback={
            <div className="w-full min-h-screen flex items-center justify-center text-lg font-semibold">
              Loading...
            </div>
          }>
            <Navbar />
            <main className="min-h-screen font-poppins prose prose-invert prose-headings:font-extrabold prose-a:text-blue-600 hover:prose-a:underline transition-colors">
              {children}
            </main>
            <Footer />
            <Toaster />
          </Suspense>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
