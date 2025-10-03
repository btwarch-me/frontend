"use client";
import Link from "next/link";

import { apiFetch, goToAuth, logout } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        apiFetch<{ authenticated: boolean }>("/auth/me", {
            method: "GET",
        }).then((res) => {
            setIsLoggedIn(res.authenticated);
        });
    }, []);

    return (
        <nav className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex gap-8">
                        <Link
                            href="/"
                            className="text-gray-900 underline cursor-pointer hover:text-gray-600 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/records"
                            className="text-gray-900 underline cursor-pointer hover:text-gray-600 font-medium"
                        >
                            Records
                        </Link>
                        <Link
                            href="/claim"
                            className="text-gray-900 underline cursor-pointer hover:text-gray-600 font-medium"
                        >
                            Claim
                        </Link>
                        <Link
                            href="/availability"
                            className="text-gray-900 underline cursor-pointer hover:text-gray-600 font-medium"
                        >
                            Check Availability
                        </Link>
                    </div>
                    {!isLoggedIn && (
                        <button
                            onClick={() => goToAuth()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                    )}
                    {isLoggedIn && (
                        <button
                            onClick={() => logout()}
                            className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
