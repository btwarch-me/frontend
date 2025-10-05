"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch, goToAuth } from "@/lib/api";
import { useRouter } from "next/navigation";

type ClaimResponse = {
    message: string;
    claim: { id: string; user_id: string; subdomain_name: string };
    full_domain: string;
};

interface ClaimedResponse {
    id: string;
    user_id: string;
    subdomain_name: string;
    created_at: string;
    updated_at: string;
}

export default function ClaimPage() {
    const router = useRouter();
    const [subdomain, setSubdomain] = useState("");
    const [result, setResult] = useState<ClaimResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [claimed, setClaimed] = useState<boolean>(false);
    const [claimedDomain, setClaimedDomain] = useState<ClaimedResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Check auth first
        apiFetch("/auth/me")
            .then(() => {
                // Only fetch claims if authenticated
                return apiFetch<ClaimedResponse>("/records/claim", {
                    method: "GET",
                });
            })
            .then((res) => {
                setClaimed(true);
                setClaimedDomain(res);
            })
            .catch((error) => {
                if (error.message === "Unauthorized") {
                    goToAuth();
                    return;
                }
                setClaimed(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [router]);

    async function deleteClaimedDomain() {
        setIsDeleting(true);
        try {
            await apiFetch("/records/claim", {
                method: "DELETE",
            });
            setClaimed(false);
            setClaimedDomain(null);
        } finally {
            setIsDeleting(false);
        }
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setIsSubmitting(true);
        try {
            const res = await apiFetch<ClaimResponse>("/records/claim", {
                method: "POST",
                body: JSON.stringify({ subdomain_name: subdomain }),
            });
            console.log(res);
            setResult(res);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return (
            <main className="max-w-4xl mx-auto p-4 font-mono bg-background">
                <div className="bg-[#f6f9fc] border border-[#bcd] p-4">
                    <h1 className="text-2xl font-bold text-[#06c] mb-6">Loading...</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto p-4 font-mono bg-background">
            <div className="bg-[#f6f9fc] border border-[#bcd] p-4">
                <h1 className="text-2xl font-bold text-[#06c] mb-6">Claim subdomain</h1>
                {claimed && claimedDomain ? (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-[#333] mb-2">Your claimed subdomain:</h2>
                        <div className="bg-white p-3 border border-[#bcd] flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <p className="text-[#333]">{claimedDomain.subdomain_name}.btwarch.me</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Claimed on: {new Date(claimedDomain.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={deleteClaimedDomain}
                                className="px-4 py-1 bg-[#06c] text-white hover:bg-[#05a] transition-colors underline cursor-pointer"
                                type="button"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <label className="block">
                            <span className="block mb-2 text-[#333]">Subdomain</span>
                            <input
                                className="w-full p-2 border border-[#bcd] bg-white font-mono text-[#333]"
                                value={subdomain}
                                onChange={(e) => setSubdomain(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </label>
                        <button
                            type="submit"
                            className="px-4 py-1 bg-[#06c] text-white hover:bg-[#05a] transition-colors disabled:opacity-50 underline cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Claiming..." : "Claim"}
                        </button>
                    </form>
                )}
                {error && <p className="mt-4 text-red-700 bg-red-100 p-2 border border-red-300">Error: {error}</p>}
                {result && (
                    <pre className="mt-4 bg-white p-3 border border-[#bcd] overflow-auto font-mono text-sm">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                )}
                <p className="mt-6">
                    <div className="bg-blue-500 p-2 rounded-md">
                        <Link className="text-[#06c] underline hover:text-[#05a] transition-colors" href="/records">
                            Manage Records
                        </Link>
                    </div>
                </p>
            </div>
        </main>
    );
}
