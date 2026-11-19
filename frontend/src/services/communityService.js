/* Community board posts. Resident submissions enter moderation as "pending" and
   only approved posts are shown publicly. Never expose phone numbers or other
   private submission details through this module. */

import { STORAGE_KEYS, readStore, writeStore, buildReference, sortByNewest, todayIsoDate } from './storageService';
import { MOCK_COMMUNITY_POSTS } from '../data/mockCommunity';

const ID_PREFIX = 'CMT';

function ensurePosts() {
  const existing = readStore(STORAGE_KEYS.posts, null);
  if (Array.isArray(existing)) return existing;
  writeStore(STORAGE_KEYS.posts, MOCK_COMMUNITY_POSTS);
  return MOCK_COMMUNITY_POSTS;
}

export function getPosts() {
  return sortByNewest(ensurePosts());
}

export function getPublicPosts() {
  return getPosts().filter((post) => post.status === 'approved');
}

export function getPostsForUser(user) {
  if (!user) return [];
  const email = String(user.email || '').toLowerCase();
  return getPosts().filter((post) => String(post.ownerEmail || '').toLowerCase() === email);
}

export function addPost(payload) {
  const posts = ensurePosts();

  const record = {
    id: buildReference(ID_PREFIX, posts),
    name: String(payload.name).trim(),
    ownerEmail: payload.ownerEmail ? String(payload.ownerEmail).toLowerCase() : null,
    category: payload.category,
    title: String(payload.title).trim(),
    description: String(payload.description).trim(),
    image: payload.image || null,
    /* Resident posts are NOT auto-published — they await moderation. */
    status: 'pending',
    likes: 0,
    likedBy: [],
    reported: false,
    reportedBy: [],
    createdAt: todayIsoDate(),
  };

  writeStore(STORAGE_KEYS.posts, [...posts, record]);
  return record;
}

/* `actorKey` identifies the resident (email) or "guest" so likes/reports are
   per-visitor without needing server accounts. */
export function toggleLike(id, actorKey) {
  const posts = ensurePosts();
  let updated = null;

  const next = posts.map((post) => {
    if (post.id !== id) return post;
    const likedBy = post.likedBy || [];
    const already = likedBy.includes(actorKey);
    const nextLikedBy = already ? likedBy.filter((key) => key !== actorKey) : [...likedBy, actorKey];
    updated = {
      ...post,
      likedBy: nextLikedBy,
      likes: Math.max(0, (post.likes || 0) + (already ? -1 : 1)),
    };
    return updated;
  });

  if (updated) writeStore(STORAGE_KEYS.posts, next);
  return updated;
}

export function reportPost(id, actorKey) {
  const posts = ensurePosts();
  let updated = null;

  const next = posts.map((post) => {
    if (post.id !== id) return post;
    const reportedBy = post.reportedBy || [];
    if (reportedBy.includes(actorKey)) return post;
    updated = {
      ...post,
      reported: true,
      reportedBy: [...reportedBy, actorKey],
    };
    return updated;
  });

  if (updated) writeStore(STORAGE_KEYS.posts, next);
  return updated;
}
