"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Home, ArrowLeft, Search, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10 py-12">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>LearnOra Knowledge Base</span>
        </div>

        {/* 404 Large Visual Element */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-slate-900/90 border border-purple-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3">
              <Compass className="w-8 h-8 text-purple-400 animate-spin-slow" />
              <span className="text-sm font-medium text-slate-300">
                Page Lost in Cyberspace
              </span>
            </div>
          </div>
        </div>

        {/* Heading & Description */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page or resource you are looking for might have been removed,
            had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-all duration-200 shadow-lg shadow-purple-600/25 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/books"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200 active:scale-95"
          >
            <Search className="w-4 h-4 text-purple-400" />
            <span>Browse Books</span>
          </Link>
        </div>

        {/* Quick Back Navigation */}
        <div className="pt-4 border-t border-slate-900">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go back to previous page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
