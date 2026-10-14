const SESSION_VERSION = "v1";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export const SITE_ACCESS_COOKIE = "site-access";

/**
 * Reads the site password from the environment.
 * An empty value means the gate stays closed until an admin sets it.
 */
export function getSitePassword() {
  return process.env.SITE_PASSWORD?.trim() ?? "";
}

/** Keeps post-login redirects on this site. */
export function safeNextPath(value: string | null | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/";
  }

  try {
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost" || url.pathname.startsWith("/unlock")) {
      return "/";
    }
    return `${url.pathname}${url.search}`;
  } catch {
    return "/";
  }
}

/** Compares a submitted password with the configured one without early-exit on mismatch. */
export async function passwordsMatch(input: string, expected: string) {
  if (!input || !expected) return false;
  const [left, right] = await Promise.all([digest(input), digest(expected)]);
  return bytesEqual(left, right);
}

/** Builds a signed cookie value that expires with the session. */
export async function createSessionValue(secret: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${SESSION_VERSION}.${expiresAt}`;
  const signature = await sign(secret, payload);
  return `${payload}.${signature}`;
}

/** Returns true when the cookie was signed with the current password and has not expired. */
export async function isValidSession(value: string | undefined, secret: string) {
  if (!value || !secret) return false;

  const parts = value.split(".");
  if (parts.length !== 3) return false;

  const [version, expiresAt, signature] = parts;
  if (version !== SESSION_VERSION || !expiresAt || !signature) return false;

  const expiry = Number(expiresAt);
  if (!Number.isFinite(expiry) || expiry * 1000 <= Date.now()) return false;

  const expected = await sign(secret, `${version}.${expiresAt}`);
  return textEqual(signature, expected);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

async function digest(value: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return new Uint8Array(hash);
}

async function sign(secret: string, value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toBase64Url(signature);
}

function toBase64Url(value: ArrayBuffer) {
  const bytes = new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function bytesEqual(left: Uint8Array, right: Uint8Array) {
  if (left.length !== right.length) return false;

  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index]! ^ right[index]!;
  }
  return difference === 0;
}

function textEqual(left: string, right: string) {
  const encoder = new TextEncoder();
  return bytesEqual(encoder.encode(left), encoder.encode(right));
}
