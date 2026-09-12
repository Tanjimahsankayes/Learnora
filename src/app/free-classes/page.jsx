"use client";

import React, { useState } from "react";
import {
  PlayCircle,
  Clock,
  BookOpen,
  User,
  Sparkles,
  X,
  Search,
  CheckCircle2,
} from "lucide-react";

// Demo Free Classes Data with YouTube Video IDs
const FREE_CLASSES = [
  {
    id: "1",
    title: "Introduction to Programming & Computer Science Basics",
    instructor: "FreeCodeCamp",
    duration: "1h 59m",
    category: "Programming",
    level: "Beginner",
    youtubeId: "zOjov-2OZ0E",
    youtubeUrl: "http://www.youtube.com/watch?v=zOjov-2OZ0E",
    description:
      "কম্পিউটার সায়েন্স ও প্রোগ্রামিংয়ের একদম মৌলিক বিষয়গুলো শিখুন সহজ ভাষায়। কোডিং শুরুর আদর্শ গাইড।",
  },
  {
    id: "2",
    title: "How to Start Coding: Beginner's Roadmap",
    instructor: "Intellipaat",
    duration: "33 mins",
    category: "Web Development",
    level: "Beginner",
    youtubeId: "HIj8wU_rGIU",
    youtubeUrl: "http://www.youtube.com/watch?v=HIj8wU_rGIU",
    description:
      "কোডিং শেখার সঠিক রোডম্যাপ এবং প্রথম প্রোগ্রামিং ল্যাঙ্গুয়েজ হিসেবে কী বাছা উচিত তার সম্পূর্ণ গাইডলাইন।",
  },
  {
    id: "3",
    title: "HTML & Web Design Basics Fundamentals",
    instructor: "The Syntax Squad",
    duration: "45 mins",
    category: "Web Development",
    level: "All Levels",
    youtubeId: "u5vWFfZ6Csc",
    youtubeUrl: "http://www.youtube.com/watch?v=u5vWFfZ6Csc",
    description:
      "ওয়েব ডেভেলপমেন্টের প্রথম ধাপ HTML শিখুন সহজে। স্ট্রাকচার তৈরির সেরা প্র্যাকটিস।",
  },
];

const CATEGORIES = ["All", "Programming", "Web Development"];

const FreeClasses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);

  // Filter classes based on category and search
  const filteredClasses = FREE_CLASSES.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>100% Free Demo Classes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LearnOra Free Class Library
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            আমাদের প্রিমিয়াম কোর্সে এনরোল করার আগে ফ্রি ডেমো ক্লাসগুলো দেখে
            আপনার শেখার যাত্রা শুরু করুন।
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search free classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
              >
                {/* Video Thumbnail Overlay Container */}
                <div
                  className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo(item)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-purple-600/50">
                      <PlayCircle className="w-7 h-7 fill-white/20" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-slate-950/80 backdrop-blur-md border border-slate-800 text-purple-400 text-[10px] font-semibold px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3 text-purple-400" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-white text-base line-clamp-2 leading-snug group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800/60">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-purple-400" />
                        {item.instructor}
                      </span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Free Access
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveVideo(item)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <PlayCircle className="w-4 h-4 text-purple-400 group-hover/btn:text-white" />
                      <span>Watch Demo Class</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
              <BookOpen className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p>No free classes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* YouTube Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                  {activeVideo.category} Demo
                </span>
                <h2 className="text-lg font-bold text-white line-clamp-1">
                  {activeVideo.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Iframe Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Footer Description */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                Instructor:{" "}
                <strong className="text-slate-200">
                  {activeVideo.instructor}
                </strong>
              </span>
              <a
                href={activeVideo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:underline"
              >
                Open directly on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeClasses;
