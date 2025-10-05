export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
    const url = API_BASE + path;
    const res = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });
    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        if (contentType.includes("application/json")) {
            try {
                const j = await res.json();
                message = (j && (j.error || j.message)) || message;
            } catch { }
        }
        throw new Error(message);
    }
    if (contentType.includes("application/json")) {
        return (await res.json()) as T;
    }
    return undefined as unknown as T;
}

export function goToAuth(): void {
    window.location.href = API_BASE + "/auth/github";
}

export function logout(): void {
    fetch(API_BASE + "/auth/logout", {
        method: "POST",
        credentials: "include",
    }).then(() => {
        window.location.href = "/";
    });
}


