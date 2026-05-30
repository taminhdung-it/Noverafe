'use client';

import { mockNovels, mockComics, mockGenres } from '@/lib/mock-data';
import { HeroBanner } from '@/components/home/HeroBanner';
import { StorySection } from '@/components/ui/StorySection';
import { FeaturedGrid } from '@/components/ui/FeaturedGrid';
import { useState } from 'react';
import { Flame, TrendingUp, Zap, Users } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export default function Home() {

  const [continueReading] = useState(
    [...mockNovels, ...mockComics].filter((story) => story.lastChapterRead)
  );

  // Separate novels and comics
  const trendingNovels = mockNovels.slice(0, 5);
  const trendingComics = mockComics.slice(0, 5);
  const newReleases = [...mockNovels, ...mockComics].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 6);
  
  
  return (
    
    <div className="bg-slate-950 min-h-screen">
      {/* Hero Banner */}
      <HeroBanner stories={[...mockNovels.slice(0, 3), ...mockComics.slice(0, 2)]} />

      {/* Continue Reading Section */}
      {continueReading.length > 0 && (
        <StorySection
          title="Continue Reading"
          subtitle="Pick up where you left off" stories={[]} type={'novel'}        >
          <FeaturedGrid
            stories={continueReading.slice(0, 5)}
            type="novel"
            columns={5}
          />
        </StorySection>
      )}

      {/* Trending Novels */}
      <StorySection
        title="Trending Novels"
        subtitle="Most popular stories this week" stories={[]} type={'novel'}      >
        <FeaturedGrid
          stories={trendingNovels}
          type="novel"
          columns={5}
        />
      </StorySection>

      {/* Trending Comics */}
      <StorySection
        title="Trending Webtoons"
        subtitle="Fan-favorite comics and webtoons" stories={[]} type={'novel'}      >
        <FeaturedGrid
          stories={trendingComics}
          type="comic"
          columns={5}
        />
      </StorySection>

      {/* Genre Spotlight */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
            Explore Genres
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockGenres.map((genre) => (
              <div
                key={genre.id}
                className="group relative overflow-hidden rounded-xl bg-linear-to-br from-slate-800 to-slate-900 p-6 cursor-pointer hover:scale-105 transition-transform duration-300 border border-purple-500/10 hover:border-purple-500/50"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition-all duration-300" />
                <div className="relative text-center">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-3 bg-linear-to-br"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${genre.color || '#8B5CF6'}, ${genre.color ? genre.color + '80' : '#6B21A880'})`,
                    }}
                  />
                  <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {genre.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <StorySection
        title="New Releases"
        subtitle="Fresh stories from talented creators" stories={[]} type={'novel'}      >
        <FeaturedGrid
          stories={newReleases}
          type="novel"
          columns={6}
        />
      </StorySection>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-purple-950/50 to-pink-950/50 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Flame,
                label: 'Active Readers',
                value: '2.5M+',
                color: 'from-red-500 to-orange-500',
              },
              {
                icon: TrendingUp,
                label: 'Stories Published',
                value: '50K+',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Zap,
                label: 'Daily Updates',
                value: '1000+',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Users,
                label: 'Creator Community',
                value: '100K+',
                color: 'from-blue-500 to-cyan-500',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors text-center"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon size={24} className="text-white" />
                </div>
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 p-12 text-center">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Share Your Story?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of creators and publish your novels, comics, or webtoons on StoryHub.
              </p>
              <button className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Start Creating
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
         
        
