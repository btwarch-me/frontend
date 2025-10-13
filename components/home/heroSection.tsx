import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4 py-16 gap-2 md:gap-10">
        {/* Left: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-7">
          <h1 className="text-left text-4xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tighter md:leading-[1.1] mb-2 uppercase drop-shadow-lg">
            <span className="block font-extrabold font-display text-blue-700 drop-shadow-2xl tracking-tight">BTW</span>
            <span className="block font-display text-foreground">
              we use <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-black">Arch</span>
            </span>
          </h1>
          <p className="text-left text-xl md:text-2xl xl:text-3xl font-light text-muted-foreground max-w-xl mb-2 tracking-tight leading-relaxed">
            <span className="font-medium text-foreground">Minimal OS, maximal control.</span> 
            <br className="hidden sm:block" />
            <span className="font-mono font-semibold text-blue-600 bg-muted-foreground/10 px-2 py-0.5 rounded-lg">pacman -Syu</span>{" "}
            <span className="text-sm md:text-lg text-muted-foreground">...and your terminal just works.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#checker"
              className="rounded-full bg-blue-600 shadow-xl px-8 py-4 font-bold text-lg text-white tracking-wider transition-all hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-100"
            >
              Claim your <span className="font-mono font-semibold">.btwarch.me</span> domain
            </a>
            <a
              href="/why-windows-sucks"
              className="rounded-full border border-blue-500/60 px-8 py-4 font-bold text-lg text-blue-700 bg-background/30 tracking-wider transition-all"
            >
              Why Windows <span className="font-bold">Sucks?</span>
            </a>
          </div>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/fuckwindows.png"
              alt="BTW, We Use Arch"
              className="object-cover w-full max-w-[700px] md:max-w-none md:w-[700px] select-none"
              width={700}
              height={700}
              priority
            />
        </div>
      </div>
    </section>
  )
}