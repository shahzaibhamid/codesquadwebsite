import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * Case-study media uploads. Uses the public Supabase Storage bucket
 * `case-study-media` (via the service-role key, server-only) when Supabase is
 * configured — the source of truth in production, since the GoDaddy deploy
 * folder is not a safe place to persist uploaded files. Falls back to writing
 * into /public/uploads for local development when Supabase isn't configured.
 */
export const CASE_STUDY_MEDIA_BUCKET = 'case-study-media';

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/ogg': 'ogg',
};

export async function uploadCaseStudyFile(file: File, imageOnly = false): Promise<string> {
  const extension = EXTENSIONS[file.type];
  if (!extension || (imageOnly && !file.type.startsWith('image/'))) {
    throw new Error(`Unsupported media type: ${file.type || file.name}`);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`${file.name} is larger than the 25 MB upload limit.`);
  }

  const filename = `${Date.now()}-${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const db = getSupabaseAdmin();
  if (db) {
    const { error } = await db.storage.from(CASE_STUDY_MEDIA_BUCKET).upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw new Error(`Media upload failed: ${error.message}`);
    const { data } = db.storage.from(CASE_STUDY_MEDIA_BUCKET).getPublicUrl(filename);
    return data.publicUrl;
  }

  // Local development fallback only — never used once Supabase is configured.
  const destination = path.join(process.cwd(), 'public', 'uploads', 'case-studies');
  await fs.mkdir(destination, { recursive: true });
  await fs.writeFile(path.join(destination, filename), buffer);
  return `/uploads/case-studies/${filename}`;
}
