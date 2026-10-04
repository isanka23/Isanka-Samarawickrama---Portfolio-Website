import { useEffect, useState } from "react";

/**
 * Two-page history router. The site is small enough that pulling in a routing
 * library would cost more than it saves — this swaps the rendered page on
 * pushState and popstate, and nothing else.
 *
 * Deep links to a non-root path need the host to serve index.html for every
 * path; see the rewrite in vercel.json.
 */
const ROUTE_EVENT = "routechange";

/** Trailing slashes are not meaningful here, so "/cv/" and "/cv" are one route. */
const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

export function navigate(to: string) {
  if (normalize(to) === normalize(window.location.pathname)) return;
  window.history.pushState(null, "", to);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

/**
 * Click handler for in-app links. Plain left clicks are handled in-page;
 * modified clicks (new tab, download, middle click) fall through to the
 * browser, which is why these stay real `<a href>` elements.
 */
export function onRouteClick(event: React.MouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const href = event.currentTarget.getAttribute("href");
  if (!href?.startsWith("/")) return;

  event.preventDefault();
  navigate(href);
}

export function useRoute() {
  const [path, setPath] = useState(() => normalize(window.location.pathname));

  useEffect(() => {
    const sync = () => setPath(normalize(window.location.pathname));
    window.addEventListener("popstate", sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  return path;
}
