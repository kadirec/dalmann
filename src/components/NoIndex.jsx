import { useEffect } from "react";

export default function NoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    meta.setAttribute("data-managed", "true");
    document.head.appendChild(meta);

    return () => {
      document.head.querySelectorAll('meta[data-managed="true"]').forEach((el) => el.remove());
    };
  }, []);

  return null;
}
