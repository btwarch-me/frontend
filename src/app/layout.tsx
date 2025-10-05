import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "btwarch.me",
    description: "btwarch.me DNS management system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
                <Navbar />
                {children}
                <footer className="text-center text-sm text-gray-500 mx-auto max-w-4xl">
                    <p>Copyright © 2025 btwarch.me. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}
