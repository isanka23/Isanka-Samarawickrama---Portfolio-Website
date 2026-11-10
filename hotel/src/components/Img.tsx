import { useState } from "react";
import type { Photo } from "@/data/content";

/**
 * Image on a tonal backdrop. While loading — or if the source fails — the
 * frame keeps its colour instead of collapsing or showing a broken icon.
 */
export function Img({
  photo,
  className = "",
  imgClassName = "",
  priority = false,
  sizes = "100vw",
}: {
  photo: Photo;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: photo.tone }}>
      {state !== "failed" && (
        <img
          src={photo.src}
          alt={photo.alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => setState("failed")}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
      {state === "failed" && (
        <span role="img" aria-label={photo.alt} className="absolute inset-0" />
      )}
    </div>
  );
}
