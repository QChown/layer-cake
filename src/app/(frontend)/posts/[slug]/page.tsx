import { draftMode } from "next/headers";
import { loadQuery } from "@/sanity/lib/loader";
import { notFound } from "next/navigation";
import { Post } from "@/components/Post";
import { POST_QUERY } from "@/sanity/lib/queries";
import { POST_QUERYResult } from "@/sanity/types";
import { PostPreview } from "@/components/PostPreview";

type PostIndexProps = { params: { slug: string } };

export default async function Page({ params }: PostIndexProps) {
  const initial = await loadQuery<POST_QUERYResult>(POST_QUERY, params, {
    next: { tags: [`post:${params.slug}`, "author", "category"] },
  });

  if (!initial.data) {
    notFound();
  }

  return <main className='container mx-auto grid grid-cols-1 gap-6 p-12'>{draftMode().isEnabled ? <PostPreview initial={initial} /> : <Post {...initial.data} />}</main>;
}
