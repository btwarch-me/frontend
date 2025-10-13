export default function Footer() {
  return (
    <footer className="relative w-full mt-16 px-4 md:px-10 py-14 border-t border-border select-none shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-14">

          <div className="flex flex-col items-start gap-6">
            <div>
              <span className="font-poppins font-black text-3xl md:text-4xl text-foreground tracking-tight drop-shadow leading-tight">
                BTW
                <span className="text-blue-600">ARCH</span>
                <span className="font-normal text-lg align-super text-blue-400/90 ml-2">.me</span>
              </span>
            </div>
            <p className="text-base text-muted-foreground/90 font-light tracking-tight">
              Claim your own <span className="font-mono bg-blue-100/70 dark:bg-blue-900/30 px-1 py-0.5 rounded text-blue-600">.btwarch.me</span> subdomain.<br className="hidden md:block"/> Simple, fun &amp; open.
            </p>
            <div>
              <p className="text-xs text-muted-foreground font-mono">Copyright © 2025 <span className="font-semibold">BTWARCH</span>.</p>
              <p className="text-[11px]/relaxed text-muted-foreground/70 max-w-sm mt-1 italic">Not affiliated with or endorsed by Arch Linux.</p>
            </div>
          </div>
          <div className="flex flex-row gap-12 lg:gap-20 md:justify-between">

            <div className="flex flex-col gap-6">
              <h2 className="text-lg md:text-xl font-poppins font-semibold text-foreground tracking-wide mb-2 underline underline-offset-4 decoration-blue-500/60">
                Quick Links
              </h2>
              <nav className="flex flex-col gap-2 font-sans">
                <a
                  href="/"
                  className="text-base text-muted-foreground transition hover:text-blue-600 hover:font-semibold"
                >
                  Home
                </a>
                <a
                  href="#checker"
                  className="text-base text-muted-foreground transition hover:text-blue-600 hover:font-semibold"
                >
                  Claim a Subdomain
                </a>
                <a
                  href="https://github.com/btwarch-me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-muted-foreground transition flex items-center gap-1 hover:text-blue-600 hover:font-semibold"
                >
                  GitHub
                </a>
              </nav>
            </div>

            {/* Community */}
            <div className="flex flex-col gap-6">
              <h2 className="text-lg md:text-xl font-poppins font-semibold text-foreground tracking-wide mb-2 underline underline-offset-4 decoration-blue-500/60">
                Community
              </h2>
              <nav className="flex flex-col gap-2 font-sans">
                <a
                  href="https://discord.gg/p53RZzgeHA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-muted-foreground transition flex items-center gap-1 hover:text-blue-600 hover:font-semibold"
                >
                  Discord
                </a>
                <a
                  href="https://reddit.com/r/btwarch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-muted-foreground transition hover:text-blue-600 hover:font-semibold"
                >
                  Reddit
                </a>
                <a
                  href="https://github.com/btwarch-me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-muted-foreground transition hover:text-blue-600 hover:font-semibold"
                >
                  GitHub
                </a>
              </nav>
            </div>

          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4 md:items-end justify-">
            <h2 className="text-lg md:text-xl font-poppins font-semibold text-foreground tracking-wide mb-2 underline underline-offset-4 decoration-blue-500/60">
              Contact
            </h2>
            <div className="flex flex-col gap-1 font-mono">
              <a
                href="mailto:contact@btwarch.me"
                className="text-base text-blue-600 hover:underline underline-offset-2"
              >
                contact@btwarch.me
              </a>
              <span className="text-sm text-muted-foreground/80 mt-1 font-sans">
                Happy to help! Reach out if you have questions or suggestions.
              </span>
            </div>
          </div>

        </div>
        <div className="w-full pt-10 flex justify-center">
          <span className="text-xs text-muted-foreground/70 font-mono tracking-tighter">
            Made for developers, by <span className="text-blue-600 font-semibold">the community</span>.
          </span>
        </div>
      </div>
    </footer>
  );
}
