import "server-only";

export const HOSTAWAY_API_BASE = "https://api.hostaway.com/v1";
export const HOSTAWAY_CLIENT_ID = process.env.HOSTAWAY_CLIENT_ID;
export const HOSTAWAY_CLIENT_SECRET = process.env.HOSTAWAY_CLIENT_SECRET;

export function isHostawayConfigured(): boolean {
  return Boolean(HOSTAWAY_CLIENT_ID && HOSTAWAY_CLIENT_SECRET);
}
