"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  BookOpen,
  User,
  Star,
  ArrowRight,
  BookCheck,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter & Sort States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Dropdown Toggle States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  // Fetch Books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/all-books");
        const data = await response.json();
        if (data.success) {
          setBooks(data.books || []);
          setFilteredBooks(data.books || []);
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Close Dropdowns on Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Search, Category Filter, and Sorting
  useEffect(() => {
    let result = [...books];

    // 1. Search Filter (Title or Author)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (book) =>
          book.title?.toLowerCase().includes(term) ||
          book.author?.toLowerCase().includes(term),
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    // 3. Sorting Logic
    result.sort((a, b) => {
      const priceA = a.discountPrice ?? a.price ?? 0;
      const priceB = b.discountPrice ?? b.price ?? 0;

      if (sortBy === "price-low") {
        return priceA - priceB;
      }
      if (sortBy === "price-high") {
        return priceB - priceA;
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      // Default: "newest"
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, sortBy, books]);

  // Extract Unique Categories Dynamic List
  const categories = [
    "All",
    ...new Set(books.map((b) => b.category).filter(Boolean)),
  ];

  const sortOptions = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Top Rated", value: "rating" },
  ];

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            <span>LearnOra Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              All Books
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Enhance your learning journey with our curated collection of
            textbooks, guides, and reference materials.
          </p>
        </div>

        {/* Search & Filter Controls Container */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 relative z-20">
          {/* Search Input (50% Width on Desktop) */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by book title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter & Sort Controls (50% Width on Desktop) */}
          <div className="flex items-center gap-3 w-full md:w-1/2 justify-end">
            {/* Category Filter Dropdown */}
            <div className="relative flex-1 sm:flex-none" ref={filterRef}>
              <button
                onClick={() => {
                  setIsFilterOpen((prev) => !prev);
                  setIsSortOpen(false);
                }}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all border flex items-center justify-between gap-2 ${
                  isFilterOpen || selectedCategory !== "All"
                    ? "bg-purple-600/10 border-purple-500/50 text-purple-300"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-purple-400" />
                  <span>
                    Category
                    {selectedCategory !== "All" && ` (${selectedCategory})`}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Filter Dropdown Menu */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-30 space-y-3 backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Select Category
                    </span>
                    {selectedCategory !== "All" && (
                      <button
                        onClick={() => setSelectedCategory("All")}
                        className="text-[11px] text-purple-400 hover:underline"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsFilterOpen(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                          selectedCategory === cat
                            ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-600/20"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-none" ref={sortRef}>
              <button
                onClick={() => {
                  setIsSortOpen((prev) => !prev);
                  setIsFilterOpen(false);
                }}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all border flex items-center justify-between gap-2 ${
                  isSortOpen || sortBy !== "newest"
                    ? "bg-purple-600/10 border-purple-500/50 text-purple-300"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-purple-400" />
                  <span>
                    {sortOptions.find((opt) => opt.value === sortBy)?.label ||
                      "Sort By"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sort Dropdown Menu */}
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-30 backdrop-blur-md">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-xs sm:text-sm text-left flex items-center justify-between transition-colors ${
                        sortBy === option.value
                          ? "bg-purple-600/20 text-purple-300 font-semibold"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.value && (
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Books Grid Area */}
        {loading ? (
          // Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-800 rounded-xl w-full" />
                <div className="h-5 bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-800 rounded w-1/2" />
                <div className="h-10 bg-slate-800 rounded-xl w-full pt-2" />
              </div>
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          // Empty State
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto text-purple-400 border border-purple-500/20">
              <BookCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-white">No Books Found</h3>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              We couldn't find any books matching your search criteria. Try
              searching with different keywords or reset your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          // Book Cards Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              const displayPrice = book.discountPrice || book.price;

              return (
                <div
                  key={book._id}
                  className="group bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Book Cover Container */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 group-hover:border-purple-500/30 transition-colors">
                      <img
                        src={
                          book.coverImage ||
                          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80"
                        }
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Category Badge */}
                      {book.category && (
                        <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-md text-xs font-medium">
                          {book.category}
                        </span>
                      )}

                      {/* Rating Badge (If Available) */}
                      {book.rating && (
                        <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded-md text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{book.rating}</span>
                        </span>
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <User className="w-3.5 h-3.5 text-purple-400" />
                        <span className="line-clamp-1">
                          {book.author || "Unknown Author"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer / Action */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Price
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold text-white">
                          {displayPrice ? `$${displayPrice}` : "Free"}
                        </span>
                        {book.discountPrice && book.price && (
                          <span className="text-xs text-slate-500 line-through">
                            ${book.price}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/books/${book._id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/10 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all text-xs font-medium"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
