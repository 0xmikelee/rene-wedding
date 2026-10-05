import Image from "next/image";

const links = [
  { href: "#schedule", label: "Schedule" },
  { href: "#venues", label: "Venues" },
  { href: "#attire", label: "Attire" },
];

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex h-[600px] flex-col justify-between overflow-hidden md:h-[900px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-mobile.webp"
          alt="Rene and Arthur standing together on a grassy hillside"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%] md:hidden"
          unoptimized
        />
        <Image
          src="/images/hero-desktop.webp"
          alt="Rene and Arthur standing together on a grassy hillside"
          fill
          priority
          sizes="100vw"
          unoptimized
          className="hidden object-cover object-[center_38%] md:block"
        />
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-20 lg:py-8">
        <a href="#top" className="shrink-0">
          <Image
            src="/images/monogram.webp"
            alt="Rene and Arthur monogram"
            width={504}
            height={512}
            priority
            className="h-[58px] w-auto lg:h-[73px]"
          />
        </a>

        <nav
          aria-label="Page"
          className="absolute left-1/2 hidden -translate-x-1/2 gap-10 lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-[0.5px] text-ivory uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#rsvp"
          className="text-sm tracking-[0.5px] text-ivory uppercase underline decoration-from-font underline-offset-4"
        >
          RSVP
        </a>
      </div>

      <p className="relative z-10 hidden flex-1 items-center justify-center px-6 text-center font-display text-[100px] leading-none font-light text-ivory uppercase italic lg:flex">
        Rene &amp; Arthur
      </p>

      <div className="relative z-10 mt-auto px-6 pb-9 text-center text-ivory lg:pb-[60px]">
        <p className="font-display text-[38px] leading-none font-light uppercase italic lg:hidden">
          Rene &amp; Arthur
        </p>
        <p className="mt-4 font-sans text-base tracking-[0.04em] uppercase lg:mt-0 lg:text-[35px]">
          12. 12. 26
        </p>
      </div>
    </header>
  );
}
