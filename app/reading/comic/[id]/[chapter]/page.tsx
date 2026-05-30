'use client';
export const runtime = 'edge';
import { mockComics } from '@/lib/mock-data';
import { use, useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, ZoomIn, ZoomOut, Home } from 'lucide-react';
import Link from 'next/link';

interface ComicReadingPageProps {
  params: Promise<{
    id: string;
    chapter: string;
  }>;
}

// Mock comic images - in a real app, these would come from the API
const SAMPLE_COMIC_IMAGES = [
  'https://images.unsplash.com/photo-1609708536965-59b6b5bbb5b1?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1578307584307-40cf7a8ec26a?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1559329007-40790c361539?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1578926314433-6b62cfc69ee7?w=600&h=800&fit=crop',
];

export default function ComicReadingPage({ params }: ComicReadingPageProps) {
   const { id, chapter } = use(params);
  const comic = mockComics.find((c) => c.id === id);
  const chapterNumber = parseInt(chapter);
  const [zoom, setZoom] = useState(100);
  const [showSettings, setShowSettings] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!comic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Comic not found</p>
      </div>
    );
  }

  const currentChapter = comic.chapters[chapterNumber - 1];
  const hasNextChapter = chapterNumber < comic.totalChapters;
  const hasPrevChapter = chapterNumber > 1;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-slate-950/80 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/comics/${comic.id}`}>
            <div className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors cursor-pointer">
              <Home size={20} />
              <span className="hidden sm:inline">{comic.title}</span>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-white">
            <span className="text-sm text-slate-400">
              Episode {chapterNumber} of {comic.totalChapters}
            </span>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="border-t border-slate-700 bg-slate-900 p-4">
            <div className="max-w-6xl mx-auto flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ZoomOut size={20} className="text-white" />
                </button>
                <span className="text-white font-medium w-12 text-center">{zoom}%</span>
                <button
                  onClick={() => setZoom(Math.min(200, zoom + 10))}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ZoomIn size={20} className="text-white" />
                </button>
              </div>

              <div className="text-sm text-slate-400">
                💡 Tip: Scroll to read more episodes
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comic Content - Webtoon Style (Vertical Scrolling) */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Episode Header */}
        <div className="mb-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Episode {chapterNumber}</h1>
          <p className="text-slate-400">{currentChapter?.title}</p>
        </div>

        {/* Images Container */}
        <div className="space-y-4">
          {SAMPLE_COMIC_IMAGES.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-slate-900 border border-slate-700"
              style={{ maxWidth: `${zoom}%`, margin: '0 auto' }}
            >
              <img
                src={image}
                alt={`Page ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Episode Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {hasPrevChapter ? (
            <Link href={`/reading/comic/${comic.id}/${chapterNumber - 1}`}>
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-slate-800 hover:bg-slate-700 text-white transition-all">
                <ChevronLeft size={20} />
                Previous Episode
              </button>
            </Link>
          ) : (
            <div />
          )}

          {/* Progress Bar */}
          <div className="flex-1 px-4">
            <div className="w-full h-2 rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                style={{ width: `${(chapterNumber / comic.totalChapters) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-2 text-center text-slate-400">
              {chapterNumber} / {comic.totalChapters}
            </p>
          </div>

          {hasNextChapter ? (
            <Link href={`/reading/comic/${comic.id}/${chapterNumber + 1}`}>
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                Next Episode
                <ChevronRight size={20} />
              </button>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Episode Completed */}
        {!hasNextChapter && (
          <div className="mt-8 p-8 rounded-lg border-2 bg-purple-950/30 border-purple-500/50 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Episode Complete!</h3>
            <p className="text-slate-400">
              Thanks for reading! Check back later for new episodes.
            </p>
            <Link href={`/comics/${comic.id}`}>
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                Back to Series
              </button>
            </Link>
          </div>
        )}

        {/* Related Episodes */}
        <div className="mt-12 p-6 bg-slate-900/50 rounded-lg border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">More Episodes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {comic.chapters.slice(0, 6).map((ch, idx) => (
              <Link
                key={ch.id}
                href={`/reading/comic/${comic.id}/${ch.number}`}
              >
                <button
                  className={`w-full p-3 rounded-lg text-sm font-medium transition-all ${
                    ch.number === chapterNumber
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Ep {ch.number}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
