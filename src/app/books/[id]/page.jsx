"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  User,
  Star,
  ArrowLeft,
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Phone,
  MapPin,
  Barcode,
  PackageCheck,
  Sparkles,
  X,
  Layers,
  Percent,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

const BooksDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/all-books/${id}`,
        );
        const data = await response.json();
        if (data.success) {
          setBook(data.book);
        }
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleStripeCheckout = () => {
    alert("Stripe Payment integration will process this purchase!");
    setIsBuyModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm font-medium">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md text-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Book Not Found</h2>
          <p className="text-slate-400 text-sm">
            The book you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Books</span>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate Effective Price
  const finalPrice = book.discountPrice || book.price;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Books</span>
          </Link>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cover Image & Purchase Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden group">
              {/* Condition Badge */}
              {book.condition && (
                <span className="absolute top-9 right-9 z-10 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold capitalize backdrop-blur-md">
                  {book.condition}
                </span>
              )}

              {/* Cover Image Container */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                <img
                  src={
                    book.coverImage ||
                    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Price & Action Section */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Total Investment
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">
                        {finalPrice ? `$${finalPrice}` : "Free"}
                      </span>
                      {book.discountPrice && book.price && (
                        <span className="text-sm text-slate-500 line-through">
                          ${book.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20 text-xs font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{book.rating ? `${book.rating}.0` : "N/A"}</span>
                  </div>
                </div>

                {/* Stock Warning/Status */}
                {book.stock !== undefined && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <PackageCheck className="w-4 h-4 text-purple-400" />
                    <span>
                      Availability:{" "}
                      <strong
                        className={
                          book.stock > 0
                            ? "text-emerald-400 font-semibold"
                            : "text-rose-400 font-semibold"
                        }
                      >
                        {book.stock > 0
                          ? `${book.stock} in stock`
                          : "Out of stock"}
                      </strong>
                    </span>
                  </div>
                )}

                {/* Primary Buy Button */}
                <button
                  onClick={() => setIsBuyModalOpen(true)}
                  disabled={book.stock <= 0}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy Book Now</span>
                </button>

                {/* Features List */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Authentic physical / digital book access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Secure Payment via Stripe Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details & Meta Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                  {book.category || "General"}
                </span>

                {book.tags &&
                  book.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-slate-300 text-xs"
                    >
                      <Tag className="w-3 h-3 text-purple-400" />
                      <span>{tag}</span>
                    </span>
                  ))}
              </div>

              {/* Title & Author */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {book.title}
                </h1>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <User className="w-4 h-4 text-purple-400" />
                  <span>
                    Authored by{" "}
                    <strong className="text-slate-200 font-semibold">
                      {book.author || "LearnOra Author"}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Specs Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    <span>Format</span>
                  </div>
                  <span className="text-sm font-semibold text-white capitalize">
                    {book.format || "Standard"}
                  </span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Language</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {book.language || "English"}
                  </span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Barcode className="w-3.5 h-3.5 text-purple-400" />
                    <span>ISBN</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {book.isbn ? book.isbn : "N/A"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-semibold text-white">
                  About this Book
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {book.description || "No description provided for this book."}
                </p>
              </div>

              {/* Seller & Pickup Location Section */}
              {(book.pickupLocation || book.sellerPhone) && (
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <h3 className="text-base font-semibold text-white">
                    Seller & Location Info
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {book.pickupLocation && (
                      <div className="flex items-center gap-2.5 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                        <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Pickup: {book.pickupLocation}</span>
                      </div>
                    )}
                    {book.sellerPhone && (
                      <div className="flex items-center gap-2.5 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                        <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Seller Phone: {book.sellerPhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Checkout / Buy Preview */}
        {isBuyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
              <button
                onClick={() => setIsBuyModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Order Summary</h3>
                <p className="text-slate-400 text-xs">
                  Review your item details before proceeding to payment.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4">
                <img
                  src={
                    book.coverImage ||
                    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded-xl border border-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {book.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Author: {book.author || "LearnOra"}
                  </p>
                  <span className="text-sm font-bold text-purple-400 mt-2 block">
                    {finalPrice ? `$${finalPrice}` : "Free"}
                  </span>
                </div>
              </div>

              {/* Stripe Payment Placeholder Notice */}
              <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3.5 text-xs text-purple-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>
                  Stripe Gateway Checkout will be embedded here for secure
                  payment processing.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBuyModalOpen(false)}
                  className="w-1/2 py-3 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 transition-all text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStripeCheckout}
                  className="w-1/2 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/20 transition-all"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksDetailsPage;
