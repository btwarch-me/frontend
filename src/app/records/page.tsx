"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

type RecordsResponse = {
    records: RecordItem[];
    message: string;
};

type RecordItem = {
    id: string;
    user_id: string;
    record_name: string;
    record_type: "A" | "AAAA" | "CNAME" | "TXT";
    record_value: string;
    ttl: number;
    is_active: boolean;
    cloudflare_record_id?: string | null;
};

function CreateForm({ onCreated }: { onCreated: (r: RecordItem) => void }) {
    const [record_name, setRecordName] = useState("");
    const [record_type, setRecordType] = useState<RecordItem["record_type"]>("A");
    const [record_value, setRecordValue] = useState("");
    const [ttl, setTtl] = useState(300);
    const [is_active, setIsActive] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        try {
            const created = await apiFetch<RecordItem>("/records/", {
                method: "POST",
                body: JSON.stringify({ record_name, record_type, record_value, ttl, is_active }),
            });
            onCreated(created);
            setRecordName("");
            setRecordValue("");
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            // Extract just the message portion if it's a Cloudflare error
            const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/);
            setError(match ? match[0] : errorMessage);
        }
    }

    return (
        <section className="mb-8 border border-gray-300 p-4 bg-white">
            <h2 className="text-lg font-mono mb-4 text-blue-900">Create record</h2>
            <form onSubmit={submit} className="space-y-4">
                <label className="block">
                    <span className="block font-mono mb-1">Name</span>
                    <input
                        className="w-full p-1 border border-gray-300 font-mono bg-gray-50"
                        value={record_name}
                        onChange={(e) => setRecordName(e.target.value)}
                    />
                </label>
                <label className="block">
                    <span className="block font-mono mb-1">Type</span>
                    <select
                        className="w-full p-1 border border-gray-300 font-mono bg-gray-50"
                        value={record_type}
                        onChange={(e) => setRecordType(e.target.value as RecordItem["record_type"])}
                    >
                        <option value="A">A</option>
                        <option value="AAAA">AAAA</option>
                        <option value="CNAME">CNAME</option>
                        <option value="TXT">TXT</option>
                    </select>
                </label>
                <label className="block">
                    <span className="block font-mono mb-1">Value</span>
                    <input
                        className="w-full p-1 border border-gray-300 font-mono bg-gray-50"
                        value={record_value}
                        onChange={(e) => setRecordValue(e.target.value)}
                    />
                </label>
                <label className="block">
                    <span className="block font-mono mb-1">TTL</span>
                    <input
                        className="w-full p-1 border border-gray-300 font-mono bg-gray-50"
                        type="number"
                        value={ttl}
                        onChange={(e) => setTtl(parseInt(e.target.value || "0", 10))}
                    />
                </label>
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={is_active} onChange={(e) => setIsActive(e.target.checked)} />
                    <span className="font-mono">Active</span>
                </label>
                <button
                    type="submit"
                    className="px-4 py-1 cursor-pointer underline bg-blue-900 text-white font-mono hover:bg-blue-800"
                >
                    Create
                </button>
            </form>
            {error && <p className="text-red-700 font-mono mt-4">Error: {error}</p>}
        </section>
    );
}

function Row({
    item,
    onChanged,
    onDeleted,
}: {
    item: RecordItem;
    onChanged: (r: RecordItem) => void;
    onDeleted: (id: string) => void;
}) {
    const [record_name, setRecordName] = useState(item.record_name);
    const [record_type, setRecordType] = useState<RecordItem["record_type"]>(item.record_type);
    const [record_value, setRecordValue] = useState(item.record_value);
    const [ttl, setTtl] = useState(item.ttl);
    const [is_active, setIsActive] = useState(item.is_active);
    const [error, setError] = useState<string | null>(null);

    async function save() {
        setError(null);
        try {
            const updated = await apiFetch<RecordItem>(`/records/${item.id}`, {
                method: "PUT",
                body: JSON.stringify({ record_name, record_type, record_value, ttl, is_active: true }),
            });
            onChanged(updated);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/);
            setError(match ? match[0] : errorMessage);
        }
    }

    async function deactivate() {
        setError(null);
        try {
            const updated = await apiFetch<RecordItem>(`/records/${item.id}`, {
                method: "PUT",
                body: JSON.stringify({ record_name, record_type, record_value, ttl, is_active: false }),
            });
            onChanged(updated);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/);
            setError(match ? match[0] : errorMessage);
        }
    }

    async function del() {
        setError(null);
        try {
            await apiFetch(`/records/${item.id}`, { method: "DELETE" });
            onDeleted(item.id);
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/);
            setError(match ? match[0] : errorMessage);
        }
    }

    return (
        <li className="border border-gray-300 bg-white p-4 space-y-3">
            <div className="grid gap-2 md:grid-cols-6">
                <input
                    className="p-1 border border-gray-300 font-mono bg-gray-50 md:col-span-2"
                    value={record_name}
                    onChange={(e) => setRecordName(e.target.value)}
                />
                <select
                    className="p-1 border border-gray-300 font-mono bg-gray-50"
                    value={record_type}
                    onChange={(e) => setRecordType(e.target.value as RecordItem["record_type"])}
                >
                    <option value="A">A</option>
                    <option value="AAAA">AAAA</option>
                    <option value="CNAME">CNAME</option>
                    <option value="TXT">TXT</option>
                </select>
                <input
                    className="p-1 border border-gray-300 font-mono bg-gray-50 md:col-span-2"
                    value={record_value}
                    onChange={(e) => setRecordValue(e.target.value)}
                />
                <input
                    className="p-1 border border-gray-300 font-mono bg-gray-50"
                    type="number"
                    value={ttl}
                    onChange={(e) => setTtl(parseInt(e.target.value || "0", 10))}
                />
            </div>
            <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={is_active} onChange={(e) => setIsActive(e.target.checked)} />
                    <span className="font-mono">Active</span>
                </label>
                <button
                    className="px-4 py-1 cursor-pointer bg-blue-900 text-white font-mono hover:bg-blue-800"
                    onClick={save}
                >
                    Save
                </button>
                <button
                    className="px-4 py-1 border border-gray-300 font-mono cursor-pointer hover:bg-gray-100"
                    onClick={deactivate}
                >
                    Deactivate
                </button>
                <button
                    className="px-4 py-1 border border-gray-300 font-mono cursor-pointer hover:bg-gray-100"
                    onClick={del}
                >
                    Delete
                </button>
            </div>
            {error && <p className="text-red-700 font-mono">Error: {error}</p>}
        </li>
    );
}

export default function RecordsPage() {
    const [error, setError] = useState<string | null>(null);
    const [records, setRecords] = useState<RecordItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        apiFetch<RecordsResponse>("/records")
            .then((data: RecordsResponse) => setRecords(data.records))
            .catch((e: unknown) => {
                const errorMessage = e instanceof Error ? e.message : String(e);
                const match = errorMessage.match(/Content for \w+ record must be .+?(?="})/);
                setError(match ? match[0] : errorMessage);
            })
            .finally(() => setLoading(false));
    }, []);

    function onCreated(r: RecordItem) {
        setRecords((prev) => [r, ...prev]);
    }

    function onChanged(r: RecordItem) {
        setRecords((prev) => prev.map((x) => (x.id === r.id ? r : x)));
    }

    function onDeleted(id: string) {
        setRecords((prev) => prev.filter((x) => x.id !== id));
    }

    return (
        <main className="max-w-5xl mx-auto p-8 bg-background min-h-screen">
            <h1 className="text-2xl font-mono text-blue-900 mb-8">Records</h1>
            {error && <p className="text-red-700 font-mono mb-4">{error}</p>}
            {loading && <p className="font-mono mb-4">Loading...</p>}
            <CreateForm onCreated={onCreated} />
            <ul className="space-y-4">
                {records.map((it) => (
                    <Row key={it.id} item={it} onChanged={onChanged} onDeleted={onDeleted} />
                ))}
            </ul>
        </main>
    );
}
