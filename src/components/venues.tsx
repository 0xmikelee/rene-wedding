import { venues } from "@/lib/content";

export function Venues() {
  return (
    <section id="venues" className="bg-dark px-6 py-[72px] text-ivory lg:px-20 lg:py-24">
      <h2 className="text-center font-display text-[36px] leading-none font-light uppercase lg:text-[48px]">
        Venues
      </h2>

      <div className="mx-auto mt-10 flex w-full max-w-[1088px] flex-col items-center gap-10 lg:mt-8 lg:flex-row lg:items-stretch lg:justify-center lg:gap-[70px]">
        {venues.map((venue) => (
          <article
            key={venue.name}
            className="flex w-full max-w-[509px] flex-col gap-5 rounded-[5px] bg-cream px-6 py-[30px] text-ink lg:gap-6 lg:p-12"
          >
            <h3 className="font-display text-[28px] leading-[1.1] font-light tracking-[0.56px] uppercase lg:text-[35px] lg:tracking-[0.7px]">
              {venue.name}
            </h3>

            <div>
              <p className="font-display text-[22px] leading-[1.1] font-light lg:text-2xl">
                {venue.room}
              </p>
              <p
                className={`mt-1.5 text-xs leading-[18px] lg:hidden ${
                  venue.name === "The Henderson" ? "uppercase" : ""
                }`}
              >
                {venue.mobileEvent}
              </p>
              <p className="text-xs leading-[18px] lg:hidden">{venue.address}</p>
              <p className="mt-2 hidden text-[12px] leading-normal whitespace-nowrap uppercase lg:block">
                {venue.event}
                <span className="px-2 normal-case">|</span>
                <span className="normal-case">{venue.address}</span>
              </p>
            </div>

            <div>
              <p className="text-[11px] leading-[1.55] tracking-[0.22px] text-black uppercase">
                Parking &amp; Arrival
              </p>
              <p className="text-[11px] leading-5 tracking-[0.22px] text-muted lg:text-[13px] lg:leading-[23px] lg:tracking-[0.26px]">
                Please note that there will be no parking available at the venue.
              </p>
            </div>

            <a
              href={venue.mapHref}
              target="_blank"
              rel="noreferrer"
              className="w-fit text-xs text-[#2d221e] uppercase underline decoration-from-font underline-offset-2"
            >
              View on map
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
