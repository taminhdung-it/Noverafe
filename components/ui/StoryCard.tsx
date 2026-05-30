'use client';

import { Novel, Comic } from '@/types';
import Link from 'next/link';
import { Heart, BookOpen, Eye, Play } from 'lucide-react';
import { useState } from 'react';

interface StoryCardProps {
  story: Novel | Comic;
  type: 'novel' | 'comic';
  onFavoriteClick?: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  type,
  onFavoriteClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(story.isFavorite);
  const [showDetails, setShowDetails] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavoriteClick?.();
  };

  const storyPath =
    type === 'novel'
      ? `/novels/${story.id}`
      : `/comics/${story.id}`;

  return (
    <Link href={storyPath}>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-800/50 border border-purple-500/10 hover:border-purple-500/50 transition-all duration-300 h-full"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        {/* Cover Image */}
        <div className="relative overflow-hidden bg-slate-900 aspect-2/3">
          <img
            src={story.cover}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status Badge */}
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              story.status === 'ongoing'
                ? 'bg-green-500/80 text-white'
                : story.status === 'completed'
                  ? 'bg-blue-500/80 text-white'
                  : 'bg-yellow-500/80 text-white'
            }`}
          >
            {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart
              size={18}
              className={`${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-white'
              }`}
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-3 right-3 bg-yellow-500/90 text-white px-2 py-1 rounded-lg text-xs font-bold">
            ★ {story.rating.toFixed(1)}
          </div>

          {/* Play Button for Comics */}
          {type === 'comic' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-purple-500 rounded-full p-3 hover:bg-purple-600 transition-colors">
                <Play size={24} className="fill-white text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-slate-950 to-transparent">
          {/* Title */}
          <h3 className="font-bold text-white line-clamp-2 mb-2">
            {story.title}
          </h3>

          {/* Author */}
          <p className="text-sm text-slate-300 mb-3">
            by {story.author.name}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-3">
            {story.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="text-xs px-2 py-1 rounded-full bg-purple-500/30 text-purple-300"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-700">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{(story.views / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span>{(story.likes / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              <span>{story.totalChapters} chapters</span>
            </div>
          </div>
        </div>

        {/* Quick Stats (visible without hover on mobile) */}
        <div className="md:hidden p-3 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Eye size={14} /> {(story.views / 1000000).toFixed(1)}M
          </span>
          <span className="flex items-center gap-1">
            <Heart size={14} /> {(story.likes / 1000).toFixed(0)}K
          </span>
        </div>
      </div>
    </Link>
  );
};
