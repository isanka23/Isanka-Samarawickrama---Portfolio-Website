import { useEffect, useId, useRef, useState } from "react";
import { Lines } from "@/components/Lines";
import { brand, roomTypes } from "@/data/content";
import {
  BookingNotConfiguredError,
  addDays,
  nightsBetween,
  submitBooking,
  toDateInputValue,
  type BookingRequest,
} from "@/lib/booking";
import { MOTION_OK, gsap } from "@/lib/motion";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; nights: number }
  | { kind: "error"; message: string };

const field =
  "w-full border-0 border-b border-paper/30 bg-transparent px-0 py-3 text-lg text-paper placeholder:text-paper/35 focus:border-glow focus:outline-none focus:ring-0 [color-scheme:dark] user-invalid:border-clay";
const label = "eyebrow mb-1 block text-paper/60";

export function Reserve() {
  const root = useRef<HTMLElement>(null);
  const abort = useRef<AbortController | null>(null);
  const uid = useId();
  const [today] = useState(() => toDateInputValue(new Date()));

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 3));
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const nights = nightsBetween(checkIn, checkOut);

  useEffect(() => () => abort.current?.abort(), []);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(MOTION_OK, () => {
      gsap.from("[data-line]", {
        yPercent: 110,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      // Opacity only — autoAlpha would set visibility:hidden and drop the
      // fields out of the tab order until they scrolled into view.
      gsap.from("[data-field]", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: "form", start: "top 85%" },
      });
    });
    return () => mm.revert();
  }, []);

  const onCheckInChange = (value: string) => {
    setCheckIn(value);
    // Keep the stay at least one night long.
    if (value && checkOut <= value) setCheckOut(addDays(value, 1));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const request: BookingRequest = {
      checkIn,
      checkOut,
      guests: Number(data.get("guests")),
      suite: String(data.get("suite")),
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      requests: String(data.get("requests") ?? "").trim(),
    };

    abort.current?.abort();
    abort.current = new AbortController();
    setStatus({ kind: "submitting" });
    try {
      await submitBooking(request, abort.current.signal);
      setStatus({ kind: "success", nights });
      form.reset();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error(err);
      setStatus({
        kind: "error",
        message:
          err instanceof BookingNotConfiguredError
            ? `Online reservations aren't open yet. Please call ${brand.phone} or write to ${brand.email}.`
            : `We couldn't send your request. Please try again, or call ${brand.phone}.`,
      });
    }
  }

  const id = (name: string) => `${uid}-${name}`;

  return (
    <section
      ref={root}
      id="reserve"
      aria-labelledby="reserve-heading"
      className="grain relative bg-sea py-24 text-paper md:py-36"
    >
      <div className="gutter grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6 text-glow">Reservations</p>
          <Lines
            as="h2"
            id="reserve-heading"
            lines={["Stay a", "little longer"]}
            emphasis={1}
            emphasisClassName="italic text-glow"
            className="display text-[clamp(2.75rem,7vw,6.5rem)]"
          />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-paper/75">
            Send us your dates and we'll reply within a few hours with availability and a held rate. Nothing is
            charged until you confirm.
          </p>
          <div className="eyebrow mt-10 flex flex-col gap-3 text-paper/70">
            <a href={brand.phoneHref} className="link-underline w-fit">{brand.phone}</a>
            <a href={`mailto:${brand.email}`} className="link-underline w-fit">{brand.email}</a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2 md:col-span-6 md:col-start-7">
          <div data-field>
            <label htmlFor={id("in")} className={label}>Arrival</label>
            <input
              id={id("in")}
              name="checkIn"
              type="date"
              required
              min={today}
              value={checkIn}
              onChange={(e) => onCheckInChange(e.target.value)}
              className={field}
            />
          </div>
          <div data-field>
            <label htmlFor={id("out")} className={label}>Departure</label>
            <input
              id={id("out")}
              name="checkOut"
              type="date"
              required
              min={checkIn ? addDays(checkIn, 1) : today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              aria-describedby={id("nights")}
              className={field}
            />
            <p id={id("nights")} className="mt-2 text-xs text-paper/50" aria-live="polite">
              {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "Departure must be after arrival"}
            </p>
          </div>
          <div data-field>
            <label htmlFor={id("guests")} className={label}>Guests</label>
            <select id={id("guests")} name="guests" defaultValue="2" className={field}>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-sea">
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
          <div data-field>
            <label htmlFor={id("suite")} className={label}>Room</label>
            <select id={id("suite")} name="suite" defaultValue={roomTypes[1]} className={field}>
              {roomTypes.map((r) => (
                <option key={r} value={r} className="bg-sea">{r}</option>
              ))}
            </select>
          </div>
          <div data-field>
            <label htmlFor={id("name")} className={label}>Full name</label>
            <input id={id("name")} name="name" required autoComplete="name" className={field} />
          </div>
          <div data-field>
            <label htmlFor={id("email")} className={label}>Email</label>
            <input id={id("email")} name="email" type="email" required autoComplete="email" className={field} />
          </div>
          <div data-field className="sm:col-span-2">
            <label htmlFor={id("req")} className={label}>Anything we should know? <span className="normal-case tracking-normal">(optional)</span></label>
            <textarea id={id("req")} name="requests" rows={2} className={`${field} resize-none`} />
          </div>

          <div data-field className="flex flex-wrap items-center gap-6 sm:col-span-2">
            <button
              type="submit"
              disabled={status.kind === "submitting" || nights < 1}
              className="group eyebrow relative overflow-hidden rounded-full bg-glow px-9 py-5 text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-10">
                {status.kind === "submitting" ? "Sending…" : "Request to book"}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-enabled:group-hover:translate-y-0"
              />
            </button>
            <p role="status" aria-live="polite" className="text-sm text-paper/85">
              {status.kind === "success" &&
                `Thank you — your ${status.nights}-night request is with us. We'll be in touch shortly.`}
              {status.kind === "error" && <span className="text-glow">{status.message}</span>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
