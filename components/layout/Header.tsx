'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';

interface HeaderProps {
    darkMode?: boolean;
    onThemeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode = true, onThemeToggle }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header
            className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${darkMode
                ? 'bg-slate-950/80 border-purple-500/20'
                : 'bg-white/80 border-slate-200/20'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div
                            className={`w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform`}
                        >
                            S
                        </div>
                        <span
                            className={`font-bold text-xl hidden sm:inline bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}
                        >
                            StoryHub
                        </span>
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`font-medium hover:text-purple-400 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-700'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/novels"
                            className={`font-medium hover:text-purple-400 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-700'
                                }`}
                        >
                            Novels
                        </Link>
                        <Link
                            href="/comics"
                            className={`font-medium hover:text-purple-400 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-700'
                                }`}
                        >
                            Comics
                        </Link>
                        <Link
                            href="/dashboard"
                            className={`font-medium hover:text-purple-400 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-700'
                                }`}
                        >
                            Create
                        </Link>
                    </nav>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Bar - Desktop */}
                        <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search stories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-slate-300 placeholder-slate-500 w-40"
                            />
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={onThemeToggle}
                            aria-label="Toggle Theme"
                            className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center shrink-0 ${
                                darkMode
                                    ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                                }`}
                        >
                            {darkMode ? (
                                <Sun size={20} className="sm:w-5 sm:h-5 w-4.5 h-4.5" />
                            ) : (
                                <Moon size={20} className="sm:w-5 sm:h-5 w-4.5 h-4.5" />
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden pb-4 flex flex-col gap-2">
                        {/* Mobile Search */}
                        <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-purple-500/20">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search stories..."
                                className="bg-transparent border-none outline-none text-slate-300 placeholder-slate-500 flex-1"
                            />
                        </div>

                        <Link
                            href="/"
                            className="text-slate-300 hover:text-purple-400 py-2 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/novels"
                            className="text-slate-300 hover:text-purple-400 py-2 transition-colors"
                        >
                            Novels
                        </Link>
                        <Link
                            href="/comics"
                            className="text-slate-300 hover:text-purple-400 py-2 transition-colors"
                        >
                            Comics
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-slate-300 hover:text-purple-400 py-2 transition-colors"
                        >
                            Create
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
};
