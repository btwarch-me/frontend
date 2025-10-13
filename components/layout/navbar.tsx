"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { apiFetch, goToAuth, logout } from "@/lib/api"
import { clearUser, setUser } from "@/lib/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import type { RootState } from "@/lib/store"
import { LogIn, LogOut, Network, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Navbar() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    apiFetch<{ authenticated: boolean; user?: { id: string; username: string; avatar_url?: string } }>("/auth/me")
      .then((res) => {
        if (res.authenticated && res.user) {
          dispatch(setUser(res.user))
        }
      })
      .catch(() => {
        dispatch(clearUser())
      })
  }, [dispatch])

  const handleLogout = () => {
    logout()
    dispatch(clearUser())
    router.push("/") 
  }

  return (
    <nav className="sticky top-0 z-50 flex w-full p-2">
      <div className="container mx-auto flex justify-between rounded-full bg-foreground/5 p-2 px-3 pl-6 backdrop-blur-3xl">
        <div className="flex items-center justify-center">
          <Link href="/" className="text-2xl font-bold flex gap-1 select-none">
            BTW<span className="text-blue-500">ARCH</span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4">
          
          {!isAuthenticated ? (
            <button
              onClick={() => goToAuth()}
              className="flex items-center gap-2 rounded-full bg-amber-50/10 px-2 py-1 text-sm font-medium text-gray-500 transition-all duration-300 ease-out hover:bg-amber-50/20 hover:text-foreground"
            >
              <LogIn className="size-4" />
              Login
            </button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none rounded-full flex items-center gap-3 px-1 py-1 bg-foreground/10 hover:bg-foreground/20 transition-colors">
                  <Avatar className="h-7 w-7 cursor-pointer shadow-sm">
                    <AvatarImage src={user?.avatar_url || "/placeholder.svg"} alt={user?.username || "User"} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold text-foreground/90">{user?.username}</span>
                  <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-60 rounded-xl mt-2 shadow-xl border border-border bg-background/95 backdrop-blur-xl p-2"
              >
                <div className="flex items-center gap-3 px-3 py-2 mb-1 rounded-lg bg-foreground/5">
                  <Avatar className="h-10 w-10 cursor-pointer ring-1 ring-primary/40 border border-border">
                    <AvatarImage src={user?.avatar_url || "/placeholder.svg"} alt={user?.username || "User"} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-base text-foreground">{user?.username}</div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link 
                    href="/records"
                    className="flex gap-2 items-center py-2 hover:bg-primary/10 rounded-md transition-colors text-foreground"
                  >
                    <Network />
                    Manage DNS Records
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="flex gap-2 items-center py-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors font-semibold"
                >
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}
