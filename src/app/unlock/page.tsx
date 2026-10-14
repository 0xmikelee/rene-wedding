import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PasswordGate } from "@/components/password-gate";
import { SITE_ACCESS_COOKIE, getSitePassword, isValidSession, safeNextPath } from "@/lib/site-auth";

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next);
  const password = getSitePassword();
  const session = (await cookies()).get(SITE_ACCESS_COOKIE)?.value;

  if (password && (await isValidSession(session, password))) {
    redirect(nextPath);
  }

  const intro = password
    ? "Enter the password from your invitation."
    : process.env.NODE_ENV === "development"
      ? "Add SITE_PASSWORD to .env.local, then restart the dev server."
      : "This site isn’t open yet.";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-cream px-6 py-16 text-center">
      <Image
        src="/images/monogram.webp"
        alt="Rene and Arthur monogram"
        width={504}
        height={512}
        priority
        className="h-[72px] w-auto brightness-0"
      />
      <p className="mt-8 font-instrument text-[46px] leading-none font-light uppercase italic">
        Rene &amp; Arthur
      </p>
      <p className="mt-4 font-instrument text-base tracking-[0.04em] uppercase">12. 12. 26</p>
      <p className="mt-10 max-w-xs text-sm leading-relaxed text-ink/80">
        {intro}
      </p>
      <div className="mt-8 w-full max-w-[360px]">
        <PasswordGate nextPath={nextPath} isConfigured={Boolean(password)} />
      </div>
    </main>
  );
}
