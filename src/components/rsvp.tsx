import Image from "next/image";
import { RsvpForm } from "@/components/rsvp-form";

export function Rsvp() {
  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-blush px-6 py-[72px] lg:px-20 lg:pt-24 lg:pb-[120px]"
    >
      <Image
        src="/images/rsvp-pattern.webp"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-30 lg:opacity-20"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col items-center">
        <h2 className="font-display text-[36px] leading-none font-light text-ink uppercase lg:text-[48px]">
          RSVP
        </h2>
        <div className="mt-8 w-full lg:mt-[78px]">
          <RsvpForm />
        </div>
      </div>
    </section>
  );
}
