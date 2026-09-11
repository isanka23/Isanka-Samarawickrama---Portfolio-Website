export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
      <span className="h-1 w-1 rounded-full bg-signal" />
      {children}
    </span>
  );
}
