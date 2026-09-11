import { useCountUp } from "@/hooks/useCountUp";

export function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const { ref, value: shown } = useCountUp<HTMLDivElement>(value);

  return (
    <div ref={ref}>
      <p className="font-display text-chrome-gradient text-[clamp(2rem,4vw,2.75rem)]">
        {shown}
        {suffix}
      </p>
      <p className="label-mono mt-2">{label}</p>
    </div>
  );
}
