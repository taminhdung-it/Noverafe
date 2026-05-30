'use client';

import { Novel, Comic } from '@/types';
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroBannerProps {
  stories: (Novel | Comic)[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ stories }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, stories.length]);

  const current = stories[currentSlide];
  const storyPath = 'comic' in current ? `/comics/${current.id}` : `/novels/${current.id}`;

  return (
    <div
      className="relative w-full h-screen max-h-[800px] overflow-hidden group"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Background Image with Gradient */}
      <div className="absolute inset-0">
        <img
          src={current.cover}
          alt={current.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16">
        <div className="max-w-2xl">
          {/* Status Badge */}
          <div className="mb-4 inline-block">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                current.status === 'ongoing'
                  ? 'bg-green-500/30 text-green-300'
                  : current.status === 'completed'
                    ? 'bg-blue-500/30 text-blue-300'
                    : 'bg-yellow-500/30 text-yellow-300'
              }`}
            >
              {current.status.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-300 mb-6 line-clamp-3 max-w-xl">
            {current.description}
          </p>

          {/* Author & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <img
                src={current.author.avatar}
                alt={current.author.name}
                className="w-12 h-12 rounded-full border-2 border-purple-500"
              />
              <div>
                <p className="text-sm text-slate-400">By</p>
                <p className="text-white font-semibold">{current.author.name}</p>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-slate-400">Rating</p>
                <p className="text-white font-semibold">★ {current.rating}</p>
              </div>
              <div>
                <p className="text-slate-400">Chapters</p>
                <p className="text-white font-semibold">{current.totalChapters}</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={storyPath}>
              <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                <Play size={20} className="fill-white" />
                Start Reading
              </button>
            </Link>
            <button className="w-full sm:w-auto px-8 py-3 border-2 border-purple-500 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center gap-2">
              Add to Favorites
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-purple-500'
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} className="rotate-180 text-white" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % stories.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} className="text-white" />
      </button>
    </div>
  );
};
