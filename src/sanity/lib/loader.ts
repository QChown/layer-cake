import "server-only";

import * as queryStore from "@sanity/react-loader";
import { draftMode } from "next/headers";

import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

queryStore.setServerClient(client.withConfig({ token }));

// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const usingCdn = client.config().useCdn;
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && !token) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  // Don't cache by default
  let revalidate: number | false = 0;
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags) && options.next.tags.length) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective: isDraftMode ? "previewDrafts" : "published",
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: isDraftMode,
  });
}) satisfies typeof queryStore.loadQuery;
