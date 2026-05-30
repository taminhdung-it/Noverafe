'use client';

import { Novel, Comic } from '@/types';
import React from 'react';

interface StorySectionProps {
  title: string;
  subtitle?: string;
  stories: (Novel | Comic)[];
  type: 'novel' | 'comic';
  children?: React.ReactNode;
}

export const StorySection: React.FC<StorySectionProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-400 text-lg">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        {children}
      </div>
    </section>
  );
};
