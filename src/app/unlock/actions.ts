"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SITE_ACCESS_COOKIE,
  createSessionValue,
  getSitePassword,
  passwordsMatch,
  safeNextPath,
  sessionCookieOptions,
} from "@/lib/site-auth";

export type UnlockState = {
  error?: string;
};

/**
 * Checks the invitation password and stores a signed session cookie.
 */
export async function unlockSite(_previous: UnlockState, formData: FormData): Promise<UnlockState> {
  const configured = getSitePassword();
  if (!configured) {
    return {
      error:
        process.env.NODE_ENV === "development"
          ? "Add SITE_PASSWORD to .env.local, then restart the dev server."
          : "This site isn’t open yet.",
    };
  }

  const password = String(formData.get("password") ?? "").trim();
  if (!(await passwordsMatch(password, configured))) {
    return { error: "That password isn’t quite right." };
  }

  const jar = await cookies();
  jar.set(SITE_ACCESS_COOKIE, await createSessionValue(configured), sessionCookieOptions());
  redirect(safeNextPath(String(formData.get("next") ?? "")));
}
