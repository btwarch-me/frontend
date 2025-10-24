import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-2 sm:px-4 py-10 sm:py-16 gap-8 md:gap-10">
        <div className="w-full md:w-1/2 flex flex-col items-start gap-5 sm:gap-7">
          <h1 className="text-left text-3xl xs:text-4xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tighter md:leading-[1.1] mb-1 sm:mb-2 uppercase drop-shadow-lg">
            <span className="block font-extrabold font-display text-blue-700 drop-shadow-2xl tracking-tight">BTW</span>
            <span className="block font-display text-foreground">
              we use <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-black">Arch</span>
            </span>
          </h1>
          <p className="text-left text-base xs:text-lg sm:text-xl md:text-2xl xl:text-3xl font-light text-muted-foreground max-w-full sm:max-w-xl mb-2 tracking-tight leading-relaxed">
            <span className="font-medium text-foreground">Minimal OS, maximal control.</span> 
            <br className="hidden sm:block" />
            <span className="font-mono font-semibold text-blue-600 bg-muted-foreground/10 px-2 py-0.5 rounded-lg">pacman -Syu</span>{" "}
            <span className="text-xs sm:text-sm md:text-lg text-muted-foreground">...and your terminal just works.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2 w-full">
            <a
              href="#checker"
              className="rounded-full bg-blue-600 shadow-lg px-4 py-2 sm:px-6 sm:py-2.5 font-semibold text-sm sm:text-base text-white tracking-wide transition-all duration-150 hover:bg-blue-700 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-200 focus:outline-none w-full sm:w-auto text-center"
            >
              Claim your <span className="font-mono font-semibold">.btwarch.me</span> domain
            </a>
            <a
              href="/why-windows-sucks"
              className="rounded-full border border-blue-500 px-4 py-2 sm:px-6 sm:py-2.5 font-semibold text-sm sm:text-base text-blue-700 bg-background/20 tracking-wide transition-all duration-150 hover:bg-blue-50/50 hover:border-blue-700 active:scale-95 w-full sm:w-auto text-center"
            >
              Why Windows <span className="font-bold">Sucks?</span>
            </a>
          </div>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-none md:w-[400px] lg:w-[700px]">
              <Image
                src="/fuckwindows.png"
                alt="BTW, We Use Arch"
                className="object-cover w-full h-auto select-none rounded-xl shadow-lg"
                width={700}
                height={700}
                priority
              />
            </div>
        </div>
      </div>
    </section>
  )
}