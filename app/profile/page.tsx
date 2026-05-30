'use client';

import { mockAuthors, mockNovels, mockComics } from '@/lib/mock-data';
import { useState } from 'react';
import { Heart, MapPin, Link as LinkIcon, Mail, BookOpen, Edit, Share2, MessageCircle } from 'lucide-react';

export default function ProfilePage() {
  const author = mockAuthors[0]; // Using first author as profile
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'works' | 'favorites' | 'followers'>('works');

  const authorWorks = [...mockNovels.slice(0, 2), ...mockComics.slice(0, 1)];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Cover Image */}
      <div className="h-64 bg-gradient-to-r from-purple-900/50 to-pink-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        </div>
      </div>

      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-32 mb-8">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-40 h-40 rounded-xl border-4 border-slate-950 shadow-xl"
            />

            {/* Info */}
            <div className="flex-1 pb-2">
              <h1 className="text-4xl font-bold text-white mb-2">{author.name}</h1>
              <p className="text-slate-300 mb-4">{author.bio}</p>

              <div className="flex flex-wrap gap-4 mb-4">
                {author.socialLinks.twitter && (
                  <a href={author.socialLinks.twitter} className="text-slate-400 hover:text-purple-400 transition-colors">
                    🐦 Twitter
                  </a>
                )}
                {author.socialLinks.instagram && (
                  <a href={author.socialLinks.instagram} className="text-slate-400 hover:text-purple-400 transition-colors">
                    📷 Instagram
                  </a>
                )}
                {author.socialLinks.website && (
                  <a href={author.socialLinks.website} className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-1">
                    <LinkIcon size={16} /> Website
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-6">
                <div>
                  <p className="text-slate-400 text-sm">Followers</p>
                  <p className="text-2xl font-bold text-white">
                    {(author.followers / 1000).toFixed(0)}K
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Works</p>
                  <p className="text-2xl font-bold text-white">{authorWorks.length}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    isFollowing
                      ? 'bg-purple-600 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
                  }`}
                >
                  {isFollowing ? '✓ Following' : '+ Follow'}
                </button>
                <button className="px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:border-purple-500 transition-colors flex items-center gap-2">
                  <MessageCircle size={18} />
                  Message
                </button>
                <button className="px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:border-purple-500 transition-colors flex items-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-slate-700 mb-8">
          {['works', 'favorites', 'followers'].map((tab) => (
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

        {/* Works Tab */}
        {activeTab === 'works' && (
          <div className="mb-12">
            <div className="space-y-4">
              {authorWorks.map((work) => (
                <div
                  key={work.id}
                  className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img
                      src={work.cover}
                      alt={work.title}
                      className="w-32 h-40 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {work.title}
                          </h3>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              work.status === 'ongoing'
                                ? 'bg-green-500/30 text-green-300'
                                : 'bg-blue-500/30 text-blue-300'
                            }`}
                          >
                            {work.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-300 mb-4 line-clamp-2">
                        {work.description}
                      </p>

                      {/* Genres */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {work.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="px-2 py-1 rounded-full bg-purple-500/30 text-purple-300 text-xs"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex gap-6 text-sm">
                        <div>
                          <p className="text-slate-400">Views</p>
                          <p className="font-bold text-white">
                            {(work.views / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400">Likes</p>
                          <p className="font-bold text-white">
                            {(work.likes / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400">Rating</p>
                          <p className="font-bold text-white">★ {work.rating}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Chapters</p>
                          <p className="font-bold text-white">
                            {work.totalChapters}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="mb-12">
            <p className="text-slate-400 text-center py-12">
              {author.name}'s favorite stories will appear here
            </p>
          </div>
        )}

        {/* Followers Tab */}
        {activeTab === 'followers' && (
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors text-center"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i}`}
                    alt={`Follower ${i}`}
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                  <p className="font-semibold text-white mb-1">Follower #{i}</p>
                  <p className="text-sm text-slate-400 mb-3">
                    @follower{i}
                  </p>
                  <button className="w-full py-2 px-3 border border-slate-700 text-slate-300 rounded-lg hover:border-purple-500 transition-colors text-sm">
                    View Profile
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
