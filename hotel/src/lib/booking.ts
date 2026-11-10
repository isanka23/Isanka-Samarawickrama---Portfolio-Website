export interface BookingRequest {
  checkIn: string; // YYYY-MM-DD, property local date
  checkOut: string; // YYYY-MM-DD
  guests: number;
  suite: string;
  name: string;
  email: string;
  requests: string;
}

export class BookingNotConfiguredError extends Error {
  constructor() {
    super("Online booking is not connected (VITE_BOOKING_ENDPOINT is unset).");
    this.name = "BookingNotConfiguredError";
  }
}

const ENDPOINT = import.meta.env.VITE_BOOKING_ENDPOINT;

export async function submitBooking(request: BookingRequest, signal?: AbortSignal): Promise<void> {
  if (!ENDPOINT) throw new BookingNotConfiguredError();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(request),
    signal,
  });
  if (!res.ok) throw new Error(`Booking request failed with ${res.status}`);
}

/** Local calendar date as YYYY-MM-DD. toISOString() would give the UTC date, which is off by one near midnight. */
export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(value: string, days: number): string {
  const [y, m, d] = value.split("-").map(Number);
  return toDateInputValue(new Date(y, m - 1, d + days));
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const [a, b] = [checkIn, checkOut].map((v) => {
    const [y, m, d] = v.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  });
  return Math.round((b - a) / 86_400_000);
}
