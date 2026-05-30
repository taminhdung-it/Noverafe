'use client';

import { mockNovels, mockAuthors } from '@/lib/mock-data';
import { use, useState } from 'react';
import {
  Heart,
  BookOpen,
  Eye,
  MessageCircle,
  Share2,
  Bell,
  Star,
  Download,
} from 'lucide-react';
import Link from 'next/link';

export default function NovelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const novel = mockNovels.find((n) => n.id === id);
  const [isFavorite, setIsFavorite] = useState(novel?.isFavorite || false);
  const [isFollowing, setIsFollowing] = useState(novel?.isFollowing || false);
  const [activeTab, setActiveTab] = useState<'chapters' | 'comments' | 'details'>('chapters');

  if (!novel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Novel not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header with Cover */}
      <div className="relative">
        {/* Background Blur */}
        <div className="absolute inset-0 h-96 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover Image */}
            <div className="flex-shrink-0">
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-purple-500/20">
                <img
                  src={novel.cover}
                  alt={novel.title}
                  className="w-64 h-96 object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pt-4">
              {/* Title & Status */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      novel.status === 'ongoing'
                        ? 'bg-green-500/30 text-green-300'
                        : 'bg-blue-500/30 text-blue-300'
                    }`}
                  >
                    {novel.status.toUpperCase()}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {novel.title}
                </h1>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700">
                <img
                  src={novel.author.avatar}
                  alt={novel.author.name}
                  className="w-14 h-14 rounded-full border-2 border-purple-500"
                />
                <div className="flex-1">
                  <p className="text-slate-400 text-sm">By</p>
                  <p className="text-white font-semibold mb-1">
                    {novel.author.name}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {novel.author.followers.toLocaleString()} followers
                  </p>
                </div>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isFollowing
                      ? 'bg-purple-600 text-white'
                      : 'border border-purple-500 text-purple-300 hover:bg-purple-500/10'
                  }`}
                >
                  {isFollowing ? '✓ Following' : 'Follow'}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  {
                    icon: Eye,
                    label: 'Views',
                    value: (novel.views / 1000000).toFixed(1) + 'M',
                  },
                  {
                    icon: Heart,
                    label: 'Likes',
                    value: (novel.likes / 1000).toFixed(0) + 'K',
                  },
                  {
                    icon: BookOpen,
                    label: 'Chapters',
                    value: novel.totalChapters,
                  },
                  {
                    icon: Star,
                    label: 'Rating',
                    value: novel.rating.toFixed(1),
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                  >
                    <stat.icon size={20} className="text-purple-400 mb-2" />
                    <p className="text-slate-400 text-xs">{stat.label}</p>
                    <p className="text-white font-bold text-lg">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {novel.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-300 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed mb-8">
                {novel.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/reading/novel/${novel.id}/1`}>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                    <BookOpen size={20} />
                    Start Reading
                  </button>
                </Link>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    isFavorite
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-red-500/50'
                  }`}
                >
                  <Heart
                    size={20}
                    className={isFavorite ? 'fill-red-400' : ''}
                  />
                  {isFavorite ? 'Favorited' : 'Favorite'}
                </button>
                <button className="px-4 py-3 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:border-slate-600 transition-all flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-slate-700 mb-8">
          {['chapters', 'details', 'comments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`pb-4 font-semibold transition-colors relative ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              )}
            </button>
          ))}
        </div>

        {/* Chapters Tab */}
        {activeTab === 'chapters' && (
          <div className="mb-8">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {novel.chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/reading/novel/${novel.id}/${chapter.number}`}
                >
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        Chapter {chapter.number}: {chapter.title}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {new Date(chapter.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {(chapter.viewCount / 1000).toFixed(0)}K views
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {(chapter.likes / 1000).toFixed(0)}K likes
                      </span>
                      {chapter.readingTime && (
                        <span>{chapter.readingTime} min read</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Story Details
              </h3>
              <div className="space-y-4 text-slate-300">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Status</p>
                  <p className="capitalize">{novel.status}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Total Chapters</p>
                  <p>{novel.totalChapters}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Created</p>
                  <p>{new Date(novel.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Last Updated</p>
                  <p>{new Date(novel.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {novel.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 rounded-full bg-purple-500/30 text-purple-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="mb-8">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full bg-slate-900 text-white rounded-lg p-3 border border-slate-700 focus:border-purple-500 focus:outline-none resize-none"
                rows={3}
              />
              <button className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                Post Comment
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <img
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">Reader #{i}</p>
                      <p className="text-sm text-slate-400">Amazing story!</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-purple-400 transition-colors">
                    <Heart size={14} />
                    Like
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
