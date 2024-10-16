"use client";

import { useLiveMode } from "@sanity/react-loader";
import { createClient, VisualEditing } from "next-sanity";
import { useEffect } from "react";

import { apiVersion, dataset, projectId } from "@/sanity/env";

// Always enable stega in Live Mode
const stegaClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: { enabled: true, studioUrl: "/studio" },
});

export function LiveVisualEditing() {
  useLiveMode({ client: stegaClient });
  useEffect(() => {
    // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" && window === parent) {
      location.href = "/api/disable-draft";
    }
  }, []);

  return <VisualEditing />;
}
