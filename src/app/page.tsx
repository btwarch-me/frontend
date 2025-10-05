import Link from "next/link";

export default function Home() {
    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">Free Subdomains!!!</h1>

            <p>Get your own free subdomain on btw.arch to show your Arch Linux pride!</p>

            <div className="space-y-2">
                <p>As an Arch Linux user, you can:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Claim your personalized *.btw.arch subdomain</li>
                    <li>Point it to your self-hosted services</li>
                    <li>Show the world you use Arch BTW</li>
                </ul>
            </div>

            <div className="pt-4">
                <Link
                    href="/claim"
                    className="bg-blue-600 underline text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block cursor-pointer"
                >
                    Claim Your Subdomain
                </Link>
            </div>
        </main>
    );
}
