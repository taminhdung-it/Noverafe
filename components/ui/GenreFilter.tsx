'use client';

import { Genre } from '@/types';
import { useState } from 'react';
import { X } from 'lucide-react';

interface GenreFilterProps {
  genres: Genre[];
  onSelectionChange?: (selected: string[]) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  onSelectionChange,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (genreId: string) => {
    const updated = selected.includes(genreId)
      ? selected.filter((id) => id !== genreId)
      : [...selected, genreId];
    setSelected(updated);
    onSelectionChange?.(updated);
  };

  const handleClear = () => {
    setSelected([]);
    onSelectionChange?.([]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Genres</h3>
        {selected.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Genre Tags */}
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleToggle(genre.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              selected.includes(genre.id)
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {genre.name}
            {selected.includes(genre.id) && <X size={16} />}
          </button>
        ))}
      </div>

      {/* Active Filters */}
      {selected.length > 0 && (
        <div className="pt-2 border-t border-slate-700">
          <p className="text-sm text-slate-400 mb-2">
            Showing {selected.length} genre{selected.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
};
