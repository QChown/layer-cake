"use client";

import { QueryResponseInitial, useQuery } from "@sanity/react-loader";

import { POSTS_QUERY } from "@/sanity/lib/queries";
import { POSTS_QUERYResult } from "@/sanity/types";
import { PostCard } from "@/components/PostCard";

export function PostCardPreview({ initial }: { initial: QueryResponseInitial<POSTS_QUERYResult> }) {
  const { data } = useQuery<POSTS_QUERYResult>(POSTS_QUERY, {}, { initial });

  return Array.isArray(data) && data.length > 0 ? data.map((post) => <PostCard key={post._id} {...post} />) : <div className='bg-red-100 p-12'>No posts found</div>;
}
