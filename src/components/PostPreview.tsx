"use client";

import { QueryResponseInitial, useQuery } from "@sanity/react-loader";

import { POST_QUERY } from "@/sanity/lib/queries";
import { POST_QUERYResult } from "@/sanity/types";
import { Post } from "@/components/Post";
import { useParams } from "next/navigation";

export function PostPreview({ initial }: { initial: QueryResponseInitial<POST_QUERYResult> }) {
  const params = useParams();
  const { data } = useQuery<POST_QUERYResult>(POST_QUERY, params, { initial });

  return data ? <Post {...data} /> : <div className='bg-red-100 p-12'>Post not found</div>;
}
