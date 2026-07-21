import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostForm from '@/components/dashboard/PostForm';
import { updatePost } from '@/app/dashboard/actions';
import { getPost } from '@/lib/posts';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const metadata: Metadata = { title: 'Edit post', robots: { index: false } };

// Fully dynamic route — no posts are pre-rendered at build time.
export function generateStaticParams() {
  return [];
}

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <div className="cs-dash__head">
        <h1>Edit post</h1>
      </div>
      <div className="cs-card">
        <PostForm action={updatePost} post={post} submitLabel="Save changes" />
      </div>
    </>
  );
}
