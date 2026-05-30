

import Link from 'next/link';
import { mockComics, mockNovels } from '@/lib/mock-data';
import { StoryCard } from '@/components/ui/StoryCard';

export default function NovelsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Novels</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockNovels.map((novel) => (
          <StoryCard
            key={novel.id}
            story={novel}
            type="novel"
          />
        ))}
      </div>
    </div>
  );
}