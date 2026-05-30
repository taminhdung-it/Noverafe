'use client';

import { mockNovels, mockComics } from '@/lib/mock-data';
import { useState } from 'react';
import {
  BarChart3,
  Eye,
  Heart,
  BookOpen,
  TrendingUp,
  Upload,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react';

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'stories' | 'analytics' | 'upload'>('overview');
  const [creatorStories] = useState([...mockNovels.slice(0, 3), ...mockComics.slice(0, 3)]);

  const totalViews = creatorStories.reduce((sum, story) => sum + story.views, 0);
  const totalLikes = creatorStories.reduce((sum, story) => sum + story.likes, 0);
  const totalFollows = creatorStories.reduce((sum, story) => sum + story.follows, 0);
  const monthlyRevenue = (totalViews / 1000000 * 150).toFixed(0); // Mock calculation

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-purple-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Creator Dashboard</h1>
          <p className="text-slate-300">Manage your stories and track performance</p>
        </div>
      </div>

      {/* Stats Overview */}
      {activeTab === 'overview' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Eye,
                label: 'Total Views',
                value: (totalViews / 1000000).toFixed(1) + 'M',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Heart,
                label: 'Total Likes',
                value: (totalLikes / 1000).toFixed(0) + 'K',
                color: 'from-red-500 to-pink-500',
              },
              {
                icon: BookOpen,
                label: 'Total Follows',
                value: (totalFollows / 1000).toFixed(0) + 'K',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: TrendingUp,
                label: 'Monthly Revenue',
                value: '$' + monthlyRevenue,
                color: 'from-green-500 to-emerald-500',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
                >
                  <stat.icon size={24} className="text-white" />
                </div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Performance Chart
            </h3>
            <div className="h-64 flex items-center justify-center bg-slate-900 rounded-lg">
              <p className="text-slate-500">Views & Engagement Trend</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white">New comment on Chapter {i}</p>
                    <p className="text-sm text-slate-400">2 hours ago</p>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    New
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stories Management Tab */}
      {activeTab === 'stories' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Your Stories</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2">
              <Plus size={20} />
              New Story
            </button>
          </div>

          <div className="space-y-4">
            {creatorStories.map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={story.cover}
                    alt={story.title}
                    className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {story.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              story.status === 'ongoing'
                                ? 'bg-green-500/30 text-green-300'
                                : 'bg-blue-500/30 text-blue-300'
                            }`}
                          >
                            {story.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-slate-400">
                            {story.totalChapters} chapters/episodes
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-blue-400">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-slate-400 text-sm">Views</p>
                        <p className="text-lg font-bold text-white">
                          {(story.views / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Likes</p>
                        <p className="text-lg font-bold text-white">
                          {(story.likes / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Follows</p>
                        <p className="text-lg font-bold text-white">
                          {(story.follows / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Rating</p>
                        <p className="text-lg font-bold text-white">
                          ★ {story.rating}
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

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Analytics</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Views Timeline */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Views Timeline</h3>
              <div className="h-48 bg-slate-900 rounded-lg flex items-center justify-center">
                <p className="text-slate-500">Chart Placeholder</p>
              </div>
            </div>

            {/* Engagement */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Engagement Rate</h3>
              <div className="h-48 bg-slate-900 rounded-lg flex items-center justify-center">
                <p className="text-slate-500">Chart Placeholder</p>
              </div>
            </div>
          </div>

          {/* Top Stories */}
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Top Performing Stories</h3>
            <div className="space-y-3">
              {creatorStories
                .sort((a, b) => b.views - a.views)
                .map((story, index) => (
                  <div key={story.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-purple-400">#{index + 1}</span>
                      <div>
                        <p className="font-semibold text-white">{story.title}</p>
                        <p className="text-sm text-slate-400">
                          {story.totalChapters} chapters • Rating {story.rating}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-white">
                      {(story.views / 1000000).toFixed(1)}M views
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Upload New Content</h2>

          <div className="space-y-6">
            {/* Story Type Selection */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">
                Content Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['Novel', 'Comic'].map((type) => (
                  <button
                    key={type}
                    className="p-4 rounded-lg border-2 border-slate-700 hover:border-purple-500 transition-colors text-white font-semibold"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Story title..."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Description
              </label>
              <textarea
                placeholder="Tell readers what your story is about..."
                rows={4}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Genres
              </label>
              <div className="flex flex-wrap gap-2">
                {['Fantasy', 'Romance', 'Action', 'Comedy'].map((genre) => (
                  <button
                    key={genre}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:border-purple-500 transition-colors"
                  >
                    + {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Content File
              </label>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto mb-2 text-slate-400" />
                <p className="text-white font-medium mb-1">
                  Drop your file here or click to upload
                </p>
                <p className="text-sm text-slate-400">
                  Supports .txt, .pdf, .jpg, .png
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              Publish Story
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 border-b border-slate-700 mb-8">
          {['overview', 'stories', 'analytics', 'upload'].map((tab) => (
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
      </div>
    </div>
  );
}
