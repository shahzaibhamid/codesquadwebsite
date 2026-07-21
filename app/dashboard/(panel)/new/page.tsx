import type { Metadata } from 'next';
import PostForm from '@/components/dashboard/PostForm';
import { createPost } from '@/app/dashboard/actions';

export const metadata: Metadata = { title: 'New post', robots: { index: false } };

export default function NewPostPage() {
  return (
    <>
      <div className="cs-dash__head">
        <h1>New post</h1>
      </div>
      <div className="cs-card">
        <PostForm action={createPost} submitLabel="Create post" />
      </div>
    </>
  );
}
