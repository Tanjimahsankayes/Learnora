"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Globe,
  Star,
  Users,
  Eye,
  Tag,
  GraduationCap,
  Loader2,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";

const API_BASE_URL = "http://localhost:5000/api/courses";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch Courses from API
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL);
      const data = await res.json();

      if (res.ok && data.success) {
        setCourses(data.courses || []);
      } else {
        // Fallback Mock Data matching your Mongo Structure (If API is off)
        setCourses([
          {
            _id: "6aa5986b756786f80fe25bc3",
            title: "Web Dev",
            category: "Web Development",
            shortDescription:
              "Complete Full-Stack Web Development Course with MERN & Next.js.",
            fullDescription: "asdfsdf",
            thumbnail:
              "https://i.pinimg.com/1200x/9d/2a/3a/9d2a3a5eb1be8df87fa073c759ea2f3b.jpg",
            level: "Beginner",
            language: "Bangla & English",
            instructor: "Kayes",
            duration: "3 Month",
            totalClasses: 36,
            classDuration: "36h",
            classType: "Recorded",
            startDate: "2027-06-02",
            endDate: "2027-02-05",
            price: 120000,
            discountPrice: 500,
            isFree: false,
            status: "approved",
            enrolledStudents: 124,
            rating: 4.8,
            totalReviews: 18,
            createdAt: "2026-09-12T18:22:35.524Z",
          },
          {
            _id: "6aa5986b756786f80fe25bc4",
            title: "Advanced React & Next.js Masterclass",
            category: "Web Development",
            shortDescription:
              "Learn Next.js 14 App Router, Server Actions & Tailwind CSS.",
            thumbnail:
              "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
            level: "Advanced",
            language: "Bangla",
            instructor: "Tanjim",
            duration: "2 Month",
            totalClasses: 24,
            classDuration: "24h",
            classType: "Live",
            price: 5000,
            discountPrice: 2500,
            isFree: false,
            status: "approved",
            enrolledStudents: 85,
            rating: 5.0,
            totalReviews: 12,
            createdAt: "2026-09-10T18:22:35.524Z",
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Extract Unique Categories for Filter Dropdown
  const categories = [
    "All",
    ...new Set(courses.map((c) => c.category).filter(Boolean)),
  ];

  // Filtering & Sorting Logic
  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === "price-low")
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      if (sortBy === "price-high")
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt); // newest
    });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Explore All Programs
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              সকল কোর্সসমূহ (All Courses)
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              আপনার দক্ষতা বাড়াতে পছন্দের কোর্সটি নির্বাচন করুন।
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400">
            মোট কোর্স:{" "}
            <span className="text-purple-400 font-bold">
              {filteredCourses.length}
            </span>{" "}
            টি
          </div>
        </div>

        {/* Filter & Search Bar Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="কোর্স বা ইন্সট্রাক্টর খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 cursor-pointer appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="relative">
              <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 cursor-pointer appearance-none"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Sort By Dropdown */}
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 cursor-pointer appearance-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Cards Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            <p className="text-slate-400 text-sm">কোর্সসমূহ লোড হচ্ছে...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const effectivePrice = course.isFree
                ? 0
                : course.discountPrice > 0
                  ? course.discountPrice
                  : course.price;

              return (
                <div
                  key={course._id}
                  className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  {/* Card Top / Image Banner */}
                  <div className="space-y-4">
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="bg-purple-600/90 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                          {course.category}
                        </span>
                        <span className="bg-slate-900/90 text-slate-300 text-[10px] font-medium px-2 py-1 rounded-full border border-slate-700 backdrop-blur-md">
                          {course.classType}
                        </span>
                      </div>

                      {/* Level Badge */}
                      <div className="absolute bottom-3 left-3 text-xs font-semibold text-purple-300 bg-slate-900/80 border border-purple-500/30 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                        {course.level}
                      </div>
                    </div>

                    {/* Card Body Details */}
                    <div className="px-5 space-y-3">
                      {/* Instructor & Rating */}
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>
                          By{" "}
                          <strong className="text-slate-200">
                            {course.instructor}
                          </strong>
                        </span>
                        <div className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{course.rating || "0.0"}</span>
                          <span className="text-slate-500 text-[11px]">
                            ({course.totalReviews || 0})
                          </span>
                        </div>
                      </div>

                      {/* Course Title */}
                      <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-purple-400 transition-colors">
                        {course.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {course.shortDescription}
                      </p>

                      {/* Key Features Badges */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-xs text-slate-300">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          <span>{course.duration || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                          <span>{course.totalClasses || 0} Classes</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Globe className="w-3.5 h-3.5 text-purple-400" />
                          <span className="truncate">{course.language}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Users className="w-3.5 h-3.5 text-purple-400" />
                          <span>{course.enrolledStudents || 0} Enrolled</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Details Button */}
                  <div className="p-5 mt-4 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/40">
                    <div>
                      {course.isFree ? (
                        <span className="text-emerald-400 font-bold text-lg">
                          FREE
                        </span>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-white">
                            ৳{effectivePrice.toLocaleString()}
                          </span>
                          {course.discountPrice > 0 && (
                            <span className="text-xs text-slate-500 line-through">
                              ৳{course.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/courses/${course._id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600/10 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white text-xs font-semibold transition-all shadow-md active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl py-16 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm">কোনো কোর্স পাওয়া যায়নি!</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedLevel("All");
              }}
              className="text-xs text-purple-400 underline hover:text-purple-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
