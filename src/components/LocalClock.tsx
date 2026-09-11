import { useEffect, useState } from "react";

const TIME_ZONE = "Asia/Colombo";
const COORDS = "6.9271° N · 79.8612° E";

const format = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

/** Live Colombo coordinates + clock, ticking every second. */
export function LocalClock() {
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="font-mono text-xs text-mist">
      {COORDS} · {time} SLST
    </p>
  );
}
