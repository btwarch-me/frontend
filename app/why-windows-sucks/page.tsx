import { EyeOff, RefreshCw, Ban, Unlock, Package } from "lucide-react";

export default function WhyWindowsSucksPage() {
  return (
    <main className="min-h-screen font-poppins py-16 bg-background">
      <section className="container mx-auto px-4 max-w-6xl space-y-14">
        <header className="space-y-5 text-left">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground drop-shadow-lg mb-3 uppercase leading-tight">
            <span className="text-blue-500">Why</span> Windows <span className="text-blue-500">Sucks?</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light max-w-5xl leading-relaxed">
            <span className="font-semibold text-foreground">Real Arch users know:</span> <br />
            freedom, simplicity, and transparency always win. Here&apos;s why we run <span className="font-mono font-medium text-foreground tracking-wide">pacman -Syu</span>{" "}
            instead of tolerating Windows&apos; nonsense.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <article className="bg-background/90 p-8 rounded-3xl shadow-xl  hover:shadow-foreground/10 transition-all group border border-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground tracking-tighter flex items-center gap-2">
              <EyeOff className="inline w-7 h-7" />
              <span className="text-blue-500">No Telemetry. No Tracking.</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              Windows comes loaded with telemetry, background daemons, and forced ads.<br/>
              <span className="font-semibold text-foreground">On Arch, you are root.</span> Only what you install, nothing running behind your back.
              <br /><span className="italic text-muted-foreground">Privacy is default, not marketing.</span>
            </p>
          </article>
          <article className="bg-background/90 p-8 rounded-3xl shadow-xl  hover:shadow-foreground/10 transition-all group border border-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground tracking-tighter flex items-center gap-2">
              <RefreshCw className="inline w-7 h-7" />
              <span className="text-blue-500">Updates On Your Terms</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              Windows reboots you when it feels like it. With Arch, <span className="font-mono font-medium text-foreground">pacman -Syu</span> when <span className="font-semibold text-foreground">you</span> want.<br/>
              Roll back, pin, choose your kernel.<br/>It&apos;s <span className="font-bold">your machine</span>.
            </p>
          </article>
          <article className="bg-background/90 p-8 rounded-3xl shadow-xl  hover:shadow-foreground/10 transition-all group border border-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground tracking-tighter flex items-center gap-2">
              <Ban className="inline w-7 h-7" />
              <span className="text-blue-500">No Bloat. No Crapware.</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              Fresh Windows installs come with Candy Crush and unwanted “extras”.
              <br /><span className="font-semibold text-foreground">Arch starts pure and simple:</span> a terminal and a dream.
              <br /><span className="italic">You build up, not rip out.</span>
            </p>
          </article>
          <article className="bg-background/90 p-8 rounded-3xl shadow-xl  hover:shadow-foreground/10 transition-all group border border-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground tracking-tighter flex items-center gap-2">
              <Unlock className="inline w-7 h-7" />
              <span className="text-blue-500">100% Open, No Locks</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              <span className="font-semibold text-foreground">Arch is open, auditable, and community-driven</span> — learn and contribute at every step.<br/>
              Can&apos;t do that when your OS is closed and cryptic.
            </p>
          </article>
          <article className="bg-background/90 p-8 rounded-3xl shadow-xl  hover:shadow-foreground/10 transition-all group border border-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground tracking-tighter flex items-center gap-2">
              <Package className="inline w-7 h-7" />
              <span className="text-blue-500">Package Management That Rocks</span>  
            </h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              <span className="font-extrabold text-foreground">pacman</span> is fast and reliable.
              <br />
              The <span className="font-extrabold text-foreground">AUR</span> gives you the rest.<br />
              <span className="text-foreground">No sketchy installers, no registry, no restart roulette.</span>
              <br />It just works.
            </p>
          </article>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-10">
          <a
            href="/#checker"
            className="rounded-full bg-blue-500 px-10 py-4 text-center font-bold text-background shadow-md hover:scale-105 hover:shadow-xl transition-all text-lg tracking-widest"
          >
            Claim your .btwarch.me subdomain
          </a>
          <a
            href="/"
            className="rounded-full px-10 py-4 text-center font-bold text-foreground hover:bg-foreground/10 transition-all text-lg tracking-widest shadow"
          >
            Back to Home
          </a>
        </div>
      </section>
    </main>
  )
}
