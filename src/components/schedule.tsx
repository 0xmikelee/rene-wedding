import { schedule } from "@/lib/content";

export function Schedule() {
  return (
    <section
      id="schedule"
      className="bg-cream px-6 py-[60px] text-ink lg:px-20 lg:pt-24 lg:pb-[115px]"
    >
      <h2 className="text-center font-display text-[36px] leading-none font-light uppercase lg:text-[48px]">
        Schedule
      </h2>

      <ol className="mx-auto mt-12 flex max-w-[354px] flex-col text-center lg:hidden">
        {schedule.map((event, index) => (
          <li key={event.time}>
            {index > 0 ? (
              <div className="flex flex-col items-center py-6" aria-hidden="true">
                <span className="h-[120px] w-px bg-ink" />
                <span className="mt-4 size-2.5 rounded-full bg-ink" />
              </div>
            ) : null}
            <p className="font-display text-[18px]">{event.time}</p>
            <h3 className="mt-1 font-display text-[22px] font-light">{event.title}</h3>
            <p className="mt-3 text-base leading-[1.5] tracking-[0.16px] text-ink/80">
              {event.mobileLines.map((line, lineIndex) => (
                <span key={line}>
                  {lineIndex > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ol>

      <ol className="mx-auto mt-16 hidden w-full max-w-[760px] lg:block">
        {schedule.map((event, index) => (
          <li
            key={event.time}
            className="grid grid-cols-[92px_40px_minmax(0,1fr)] gap-x-8"
          >
            <p className="pt-0.5 text-right font-display text-[18px]">{event.time}</p>
            <div className="relative flex justify-center" aria-hidden="true">
              {index < schedule.length - 1 ? (
                <span className="absolute top-3 bottom-0 w-px bg-ink" />
              ) : null}
              <span className="relative mt-2 size-2.5 rounded-full bg-ink" />
            </div>
            <div className={index < schedule.length - 1 ? "pb-12" : ""}>
              <h3 className="font-display text-[22px] leading-none font-light">
                {event.title}
              </h3>
              <p className="mt-2 text-base leading-[1.5] tracking-[0.16px] text-ink/80">
                {event.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
