import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canOptimizeImage } from './image-config.mjs';

test('optimizes local raster files and the existing public image providers', () => {
  for (const src of [
    '/energybits-cover.png',
    '/images/example.webp',
    'https://qqxqwcnkyafwflxipmyn.supabase.co/storage/v1/object/public/medspa-uploads/clients/portrait.jpg',
    'https://res.cloudinary.com/demo/image/upload/cover.jpg',
    'https://i.ytimg.com/vi/WtQPvKmYS3k/maxresdefault.jpg',
  ]) assert.equal(canOptimizeImage(src), true, src);
});

test('unknown dashboard providers and SVGs keep their original URLs', () => {
  for (const src of [
    '', '/brand.svg', '/brand.svg?v=1', '//untrusted.example/image.jpg',
    'https://example.com/custom-cover.jpg',
    'http://res.cloudinary.com/demo/image.jpg',
    'https://res.cloudinary.com:444/demo/image.jpg',
    'https://qqxqwcnkyafwflxipmyn.supabase.co/storage/v1/object/sign/private/image.jpg',
    'https://i.ytimg.com/unexpected/image.jpg',
    'not a URL',
  ]) assert.equal(canOptimizeImage(src), false, src);
});
