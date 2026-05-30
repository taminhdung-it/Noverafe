'use client';

import { mockNovels } from '@/lib/mock-data';
import { use, useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, BookOpen, Home } from 'lucide-react';
import Link from 'next/link';

interface ReadingPageProps {
  params: Promise<{
    id: string;
    chapter: string;
  }>;
}

const SAMPLE_NOVEL_CONTENT = `
Chapter 1: The Awakening

The sun had barely crested the horizon when the first tremor shook the ancient tower. Maya gripped the stone railing, her knuckles white with tension, and stared out toward the shimmering barrier that had protected the Realm for a thousand years.

Something was changing. She could feel it in her bones, a deep resonance that echoed through the very fabric of magic itself. The barrier flickered—just for a moment—but that moment was enough. After all these centuries of stability, after generations of peace, the impossible had happened.

The barrier was weakening.

She had discovered the anomaly three weeks ago while studying the ancient texts in the archive. A passage, so obscure that even the Head Archivist had missed it, mentioned something about cycles. Great cycles of power and weakness that repeated every thousand years. And if the calculations were correct...

A voice interrupted her thoughts. "You're up early again," her mentor's gravelly tone came from behind. She didn't turn to look—she didn't need to. She knew the worry etched into every line of his aged face.

"Master Kael, I've found something. Something important." Maya finally turned to face him, her emerald eyes blazing with determination. "The barrier—"

"The barrier is fine," he interrupted, but she could see the lie dancing in his eyes. He knew. Of course he knew. How could the most powerful mage in the Realm not know?

"It's not fine, and you know it," Maya said quietly. "Whatever you're not telling me, whatever they're keeping from the lower ranks of the order, it ends now. I'm ready. I've been ready."

Master Kael sighed deeply, the weight of centuries seeming to press down upon his shoulders. "Some secrets exist for a reason, child. Some burdens are too heavy even for the strongest shoulders to bear."

But Maya was no longer a child. She was a mage of the Silver Circle, trained in the ancient arts, versed in languages long dead, and possessed of a power that the council had been carefully trying to suppress since the day it manifested. She had spent her entire life being told that she wasn't ready. That she needed more training, more patience, more humility.

She was done waiting.

"Then teach me," she demanded. "Let me share that burden. Let me help. Because whether you tell me or not, something is coming. I can feel it. We all can, deep down. And when it arrives, we need to be ready."

For a long moment, Master Kael simply looked at her. And then, slowly, he nodded.

"Very well. Come with me. It's time you learned the truth about what you are, and why the council fears you so much."

As they turned to descend the spiral staircase, Maya felt the barrier flicker again. This time it lasted longer. The light that had always been constant, always been there, wavered like a candle flame in the wind.

Change was coming. And for better or worse, Maya would be ready to meet it.
`;

export default function NovelReadingPage({ params }: ReadingPageProps) {
  const { id, chapter } = use(params);
  const novel = mockNovels.find((n) => n.id === id);
  const chapterNumber = parseInt(chapter);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  if (!novel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Novel not found</p>
      </div>
    );
  }

  const currentChapter = novel.chapters[chapterNumber - 1];
  const hasNextChapter = chapterNumber < novel.totalChapters;
  const hasPrevChapter = chapterNumber > 1;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'}`}>
      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-40 ${
          darkMode
            ? 'bg-slate-950/80 border-b border-purple-500/20'
            : 'bg-white/80 border-b border-slate-200'
        } backdrop-blur-sm`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/novels/${novel.id}`}>
            <div className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer">
              <Home size={20} />
              <span className="hidden sm:inline">{novel.title}</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Chapter {chapterNumber} of {novel.totalChapters}
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
          <div
            className={`border-t ${
              darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'
            } p-4`}
          >
            <div className="max-w-4xl mx-auto space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Font Size</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm">{fontSize}px</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Line Height</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1.4"
                    max="2.2"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm">{lineHeight.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-200 text-slate-950'
                  }`}
                >
                  {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reading Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Chapter Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{currentChapter?.title}</h1>
          <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Chapter {chapterNumber} • {currentChapter?.readingTime} min read
          </p>
        </div>

        {/* Chapter Content */}
        <div
          className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}
          style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
        >
          <p
            className={`${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            } leading-relaxed whitespace-pre-wrap`}
          >
            {SAMPLE_NOVEL_CONTENT}
          </p>
        </div>

        {/* Chapter Navigation */}
        <div className="mt-16 flex items-center justify-between gap-4">
          {hasPrevChapter ? (
            <Link href={`/reading/novel/${novel.id}/${chapterNumber - 1}`}>
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-950'
                }`}
              >
                <ChevronLeft size={20} />
                Previous Chapter
              </button>
            </Link>
          ) : (
            <div />
          )}

          {/* Progress Bar */}
          <div className="flex-1 px-4">
            <div
              className={`w-full h-2 rounded-full ${
                darkMode ? 'bg-slate-800' : 'bg-slate-200'
              }`}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                style={{ width: `${(chapterNumber / novel.totalChapters) * 100}%` }}
              />
            </div>
            <p className={`text-sm mt-2 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {chapterNumber} / {novel.totalChapters}
            </p>
          </div>

          {hasNextChapter ? (
            <Link href={`/reading/novel/${novel.id}/${chapterNumber + 1}`}>
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  darkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30'
                } text-white`}
              >
                Next Chapter
                <ChevronRight size={20} />
              </button>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Story Completed Message */}
        {!hasNextChapter && (
          <div
            className={`mt-8 p-8 rounded-lg border-2 text-center ${
              darkMode
                ? 'bg-purple-950/30 border-purple-500/50'
                : 'bg-purple-100/30 border-purple-500/50'
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">Story Completed!</h3>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Thank you for reading. Check back later for new chapters.
            </p>
            <Link href={`/novels/${novel.id}`}>
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                Back to Story
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
