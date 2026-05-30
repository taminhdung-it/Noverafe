
import Link from 'next/link';
import { mockComics } from '@/lib/mock-data';
import { StoryCard } from '@/components/ui/StoryCard';

export default function ComicsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Comics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockComics.map((comic) => (
          <StoryCard
            key={comic.id}
            story={comic}
            type="comic"
          />
        ))}
      </div>
    </div>
  );
}