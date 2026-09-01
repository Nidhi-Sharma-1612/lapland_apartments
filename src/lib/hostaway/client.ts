import "server-only";
import {
  HOSTAWAY_API_BASE,
  HOSTAWAY_CLIENT_ID,
  HOSTAWAY_CLIENT_SECRET,
  isHostawayConfigured,
} from "./config";

type TokenCache = { accessToken: string; expiresAt: number };

// Module-level cache: survives for the lifetime of the server process, so
// the OAuth token (typically valid for months) isn't refetched per request.
let tokenCache: TokenCache | null = null;
let tokenRequest: Promise<string> | null = null;

async function requestAccessToken(): Promise<string> {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: HOSTAWAY_CLIENT_ID ?? "",
    client_secret: HOSTAWAY_CLIENT_SECRET ?? "",
    scope: "general",
  });

  const res = await fetch(`${HOSTAWAY_API_BASE}/accessTokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-control": "no-cache",
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Hostaway auth failed (${res.status}): ${await res.text()}`);
  }

  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) {
    throw new Error("Hostaway auth response did not include an access_token.");
  }

  // Refresh 5 minutes before actual expiry as a safety margin.
  const ttlSeconds = Math.max(Number(data.expires_in) || 3600, 300);
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (ttlSeconds - 300) * 1000,
  };
  return tokenCache.accessToken;
}

async function getAccessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.accessToken;
  }
  // Coalesce concurrent callers into a single token request.
  if (!tokenRequest) {
    tokenRequest = requestAccessToken().finally(() => {
      tokenRequest = null;
    });
  }
  return tokenRequest;
}

/** Thin authenticated wrapper around the Hostaway REST API.
 * Returns the `result` field of the standard `{ status, result }` envelope. */
export async function hostawayFetch<T>(
  path: string,
  options: {
    revalidate?: number;
    searchParams?: Record<string, string | number | undefined>;
    /** Bypass Next's Data Cache entirely. Required for endpoints whose
     * response can exceed the 2MB per-item cache limit (e.g. bulk listings
     * for accounts with many properties) — use an application-level cache
     * on top instead (see `listings.ts`). Also required for any mutating
     * request (POST/PATCH/etc). */
    noStore?: boolean;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
  } = {},
): Promise<T> {
  if (!isHostawayConfigured()) {
    throw new Error(
      "Hostaway is not configured: set HOSTAWAY_CLIENT_ID and HOSTAWAY_CLIENT_SECRET.",
    );
  }

  const token = await getAccessToken();

  const url = new URL(`${HOSTAWAY_API_BASE}${path}`);
  for (const [key, value] of Object.entries(options.searchParams ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-control": "no-cache",
      ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: options.noStore ? "no-store" : undefined,
    next: !options.noStore && options.revalidate !== undefined ? { revalidate: options.revalidate } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Hostaway request to ${path} failed (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as { status?: string; result?: T };
  if (json.status && json.status !== "success") {
    throw new Error(`Hostaway request to ${path} returned status "${json.status}".`);
  }

  return json.result as T;
}
