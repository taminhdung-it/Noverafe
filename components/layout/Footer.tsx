'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-purple-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                S
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                StoryHub
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Your ultimate platform for reading and sharing stories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/novels"
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Novels
                </Link>
              </li>
              <li>
                <Link
                  href="/comics"
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Comics
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator */}
          <div>
            <h3 className="font-semibold text-white mb-4">Create</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Upload Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 transition-colors text-slate-400 hover:text-white"
              >
                
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 transition-colors text-slate-400 hover:text-white"
              >
               
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 transition-colors text-slate-400 hover:text-white"
              >
              
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 transition-colors text-slate-400 hover:text-white"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 StoryHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
