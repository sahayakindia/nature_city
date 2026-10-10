import { useEffect } from "react";
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · The Nature City by Mangal Realty` : "The Nature City by Mangal Realty — Resort-style plotted township near Visakhapatnam";
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
