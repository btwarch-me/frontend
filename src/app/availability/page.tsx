"use client";

import { useState } from "react";
import { apiFetch, goToAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AvailabilityResponse = { available: boolean };

export default function AvailabilityPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [data, setData] = useState<AvailabilityResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await apiFetch("/auth/check");
            } catch (e) {
                goToAuth();
            }
        };
        checkAuth();
    }, [router]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setData(null);
        setLoading(true);
        try {
            const res = await apiFetch<AvailabilityResponse>("/records/checkavailability", {
                method: "POST",
                body: JSON.stringify({ record_name: name }),
            });
            setData(res);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="max-w-4xl mx-auto p-4 font-mono">
            <div className="border border-gray-300 bg-white">
                <div className="bg-blue-600 text-white p-2">
                    <h1 className="text-lg">Check Domain Availability</h1>
                </div>
                <div className="p-4 space-y-4">
                    <form onSubmit={onSubmit} className="space-y-3">
                        <label className="block">
                            <span className="block text-sm">Subdomain name:</span>
                            <input
                                className="w-full mt-1 px-2 py-1 border border-gray-300 bg-gray-100 focus:bg-white"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 py-1 px-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? "Checking..." : "Check Availability for Subdomain"}
                        </button>
                    </form>

                    {error && <p className="text-red-600 text-sm">Error: {error}</p>}
                    {loading && <p className="text-blue-600 text-sm">Checking availability...</p>}
                    {data && (
                        <div className="bg-gray-100 p-2 border border-gray-300 text-sm">
                            <pre className="overflow-auto">{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
