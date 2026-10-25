export interface GetPublicPostsResponseDto {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
  };
}

export interface Post {
  id: string;
  content: string | null;

  commentPermission: PostCommentPermission;

  visibility: PostVisibility;
  status: PostStatus;

  authorId: string;

  media: PostMedia[];
  reactions: PostReaction[];
  comments: PostComment[];

  hashtags: PostHashtag[];

  author: User;

  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export enum PostMediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
}

export enum PostCommentPermission {
  EVERYONE = "EVERYONE",
  CONNECTIONS = "CONNECTIONS",
  NO_ONE = "NO_ONE",
}

export interface PostMedia {
  id: string;

  type: PostMediaType;

  url: string;
  publicId?: string;

  fileName?: string;
  fileSize?: number;

  position?: number;

  postId: string;
  post: Post;

  createdAt: string;
}

export enum PostVisibility {
  PUBLIC = "PUBLIC",
  CONNECTIONS = "CONNECTIONS",
  PRIVATE = "PRIVATE",
}

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}

export enum PostReactionType {
  LIKE = "LIKE",
  INSIGHTFUL = "INSIGHTFUL",
  CELEBRATE = "CELEBRATE",
  SUPPORT = "SUPPORT",
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
}

export interface PostReaction {
  id: string;

  type: PostReactionType;

  postId: string;
  post: Post;

  userId: string;
  user: User;

  createdAt: string;
}

export interface PostComment {
  id: string;
  content: string;

  postId: string;
  post: Post;

  authorId: string;
  author: User;

  parentId?: string;
  parent?: PostComment;

  replies: PostComment[];

  createdAt: string;
  updatedAt: string;
}

export interface Hashtag {
  id: string;

  name: string;
  slug: string;

  posts: PostHashtag[];

  createdAt: string;
  updatedAt: string;
}

export interface PostHashtag {
  postId: string;
  hashtagId: string;

  post: Post;
  hashtag: Hashtag;
}
