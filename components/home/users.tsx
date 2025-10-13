import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Marquee } from "../ui/marquee";

type UserWithSubdomain = {
  user: {
    id: string;
    github_id: number;
    username: string;
    email: string;
    avatar_url: string;
  };
  subdomain: {
    full_domain: string;
  };
};

export function Users() {
  const [items, setItems] = useState<UserWithSubdomain[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ users: UserWithSubdomain[] }>("/public/users/with-subdomains")
      .then((data) => setItems(data.users))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="w-full py-12 flex flex-col items-center gap-2  mt-10">
      <h2 className="font-poppins text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight text-center drop-shadow">
        <span className="text-blue-600">
          Developers Using BTWArch.me
        </span>
      </h2>
      <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl text-center font-light font-sans tracking-tight">
        Explore the community of developers with their personal <span className="font-mono text-primary px-1 py-0.5 rounded">.btwarch.me</span> subdomains.
      </p>
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-10">
          <span className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="w-full container relative">
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[130px] bg-gradient-to-r from-[#0b0a0a] via-background/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[130px] bg-gradient-to-l from-[#0b0a0a] via-background/80  to-transparent" />

          <Marquee
            className="[--duration:50s] md:[--duration:80s] px-2"
            pauseOnHover
            reverse
          >
            {items.map(({ user, subdomain }) => (
              <a
                key={user.id}
                href={`https://${subdomain.full_domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 px-7 py-5 rounded-lg min-w-[120px] group shadow-sm hover:shadow-lg hover:scale-[1.04]"
                title={subdomain.full_domain}
              >
                <div className="relative">
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className="w-12 h-12 rounded-full transition"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                </div>
                <span className="text-base font-semibold text-primary transition">
                  {user.username}
                </span>
                <span className="text-xs font-mono text-muted-foreground bg-muted/70 rounded-md px-2 py-0.5 mt-1 group-hover:bg-primary/10 transition">
                  {subdomain.full_domain}
                </span>
              </a>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
