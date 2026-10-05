import { NextResponse } from "next/server";
import { rsvpSchema, toSheetRow } from "@/lib/rsvp";

/**
 * Accepts an RSVP and appends it to the Google Sheet behind
 * `GOOGLE_SHEETS_WEBHOOK_URL` (an Apps Script web app).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        fieldErrors: {
          firstName: flat.firstName?.[0],
          lastName: flat.lastName?.[0],
          email: flat.email?.[0],
          attending: flat.attending?.[0],
          dietary: flat.dietary?.[0],
          menu: flat.menu?.[0],
        },
      },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set.");
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? "RSVP storage is not configured. Add GOOGLE_SHEETS_WEBHOOK_URL to .env.local."
            : "We couldn’t save your RSVP just now. Please try again in a moment.",
      },
      { status: 503 },
    );
  }

  try {
    await appendToSheet(webhookUrl, toSheetRow(parsed.data));
  } catch (error) {
    console.error("RSVP sheet write failed", error);
    const message =
      error instanceof Error && error.message === "SHEET_AUTH"
        ? "The Google Sheet link is not public. Redeploy the Apps Script as Anyone."
        : "We couldn’t save your RSVP just now. Please try again in a moment.";
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "development" && error instanceof Error ? error.message : message,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function appendToSheet(webhookUrl: string, row: ReturnType<typeof toSheetRow>) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(row),
    redirect: "manual",
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location") ?? "";
    if (location.includes("accounts.google.com")) {
      throw new Error("SHEET_AUTH");
    }
    return;
  }

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`SHEET_HTTP_${response.status}: ${text.slice(0, 180)}`);
  }

  if (text.includes("accounts.google.com")) {
    throw new Error("SHEET_AUTH");
  }

  try {
    const payload = JSON.parse(text) as { ok?: boolean; error?: string };
    if (payload.ok === false) {
      throw new Error(payload.error || "SHEET_REJECTED");
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return;
    }
    throw error;
  }
}
