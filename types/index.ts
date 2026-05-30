// Story types
export interface Author {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  isFollowing: boolean;
  bio: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface Genre {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  content?: string;
  images?: string[];
  publishedAt: Date;
  readingTime?: number;
  viewCount: number;
  likes: number;
}

export interface Novel {
  id: string;
  title: string;
  description: string;
  cover: string;
  author: Author;
  genres: Genre[];
  chapters: Chapter[];
  status: 'ongoing' | 'completed' | 'hiatus';
  rating: number;
  views: number;
  likes: number;
  follows: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
  isFollowing: boolean;
  lastChapterRead?: number;
  readingProgress?: number;
  totalChapters: number;
}

export interface Comic {
  id: string;
  title: string;
  description: string;
  cover: string;
  author: Author;
  genres: Genre[];
  chapters: Chapter[];
  status: 'ongoing' | 'completed' | 'hiatus';
  rating: number;
  views: number;
  likes: number;
  follows: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
  isFollowing: boolean;
  lastChapterRead?: number;
  readingProgress?: number;
  totalChapters: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  favorites: Novel[] | Comic[];
  publishedWorks: (Novel | Comic)[];
  readingHistory: ReadingHistory[];
}

export interface ReadingHistory {
  id: string;
  storyId: string;
  storyType: 'novel' | 'comic';
  chapterNumber: number;
  lastReadAt: Date;
  progress: number;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  likes: number;
  createdAt: Date;
  replies?: Comment[];
}

export interface TrendingStory {
  story: Novel | Comic;
  trend: 'rising' | 'top' | 'new';
  position: number;
  changePercent: number;
}
