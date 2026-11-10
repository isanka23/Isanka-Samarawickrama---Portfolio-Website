import type { ElementType } from "react";

/**
 * Renders each line inside its own mask so GSAP can slide `[data-line]`
 * up from below. The full text stays in one accessible label.
 */
export function Lines({
  lines,
  as: Tag = "span",
  id,
  className = "",
  emphasis,
  emphasisClassName = "italic",
}: {
  lines: readonly string[];
  as?: ElementType;
  id?: string;
  className?: string;
  /** Index of a line to set in the emphasis style (italic by default). */
  emphasis?: number;
  emphasisClassName?: string;
}) {
  return (
    <Tag id={id} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask" aria-hidden="true">
          <span data-line className={`block will-change-transform ${i === emphasis ? emphasisClassName : ""}`}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
