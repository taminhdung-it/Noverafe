'use client';

import { Novel, Comic } from '@/types';
import { StoryCard } from './StoryCard';

interface FeaturedGridProps {
  stories: (Novel | Comic)[];
  type: 'novel' | 'comic';
  columns?: number;
}

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({
  stories,
  type,
  columns = 5,
}) => {
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5';

  return (
    <div className={`grid ${gridCols} gap-4 sm:gap-6`}>
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          type={type}
        />
      ))}
    </div>
  );
};
