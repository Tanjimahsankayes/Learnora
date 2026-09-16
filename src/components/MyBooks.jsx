"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Edit,
  Trash2,
  Star,
  MapPin,
  Phone,
  Loader2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const MyBooks = ({ sellerEmail }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // FETCH BOOKS
  const fetchBooks = async () => {
    if (!sellerEmail) {
      setLoading(false);
      setError("User email not found");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const url = `${API_URL}/api/books?sellerEmail=${encodeURIComponent(
        sellerEmail,
      )}`;

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch books");
      }

      if (data.success) {
        setBooks(data.books || []);
      } else {
        setBooks([]);
        setError(data.message || "Failed to fetch books");
      }
    } catch (error) {
      console.error("Fetch books error:", error);
      setError(error.message || "Something went wrong while loading books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [sellerEmail]);

  // DELETE BOOK
  const handleDelete = async (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(bookId);

      const url = `${API_URL}/api/books/${bookId}?sellerEmail=${encodeURIComponent(
        sellerEmail,
      )}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete book");
      }

      if (data.success) {
        setBooks((previousBooks) =>
          previousBooks.filter((book) => book._id !== bookId),
        );
      } else {
        alert(data.message || "Failed to delete book");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Something went wrong while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  // EDIT BOOK
  const handleEdit = (bookId) => {
    window.location.href = `/dashboard/edit-book/${bookId}`;
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="flex min-h-[250px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
          <p className="text-sm text-slate-500">Loading books...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="rounded-2xl border border-red-600 bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-600">{error}</p>
        <button
          onClick={fetchBooks}
          className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // EMPTY STATE
  if (books.length === 0) {
    return (
      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-900 p-8 text-center">
        <BookOpen className="h-12 w-12 text-slate-400" />
        <h3 className="mt-3 text-lg font-bold text-slate-900">
          No Books Found
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          You haven't added any books using this account.
        </p>
      </div>
    );
  }

  // BOOK CARDS
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-200">My Books</h2>
        <p className="mt-0.5 text-xs text-slate-300">
          {books.length} book{books.length !== 1 ? "s" : ""} added by{" "}
          <span className="font-medium text-slate-500">{sellerEmail}</span>
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-600 bg-slate-800 shadow-sm transition duration-200 hover:shadow-md"
          >
            {/* Reduced Cover Image Height */}
            <div className="relative h-44 w-full bg-slate-100">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <BookOpen className="h-10 w-10 text-slate-400" />
                </div>
              )}

              {/* Format Badge */}
              {book.format && (
                <span className="absolute left-2.5 top-2.5 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm">
                  {book.format}
                </span>
              )}

              {/* Condition Badge */}
              {book.condition && (
                <span className="absolute right-2.5 top-2.5 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold capitalize text-white backdrop-blur-sm">
                  {book.condition}
                </span>
              )}
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                {/* Category & Rating Row */}
                <div className="flex items-center justify-between gap-2">
                  {book.category ? (
                    <span className="rounded-full bg-indigo-900 px-2.5 py-0.5 text-[11px] font-medium text-indigo-200">
                      {book.category}
                    </span>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-1 text-xs font-medium text-slate-200">
                    <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                    <span>{book.rating || 0}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mt-2 line-clamp-1 text-base font-bold text-slate-200"
                  title={book.title}
                >
                  {book.title}
                </h3>

                {/* Author */}
                <p className="line-clamp-1 text-xs text-slate-500">
                  by {book.author}
                </p>

                {/* Price & Stock Row */}
                <div className="mt-3 flex items-center justify-between border-t border-slate-600 pt-3">
                  <div>
                    <span className="text-[10px] font-medium uppercase text-slate-200">
                      Price
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-base font-bold text-slate-200">
                        ৳{Number(book.price || 0).toLocaleString("en-BD")}
                      </p>
                      {book.discountPrice && (
                        <p className="text-xs font-medium text-emerald-600 line-through">
                          ৳{Number(book.discountPrice).toLocaleString("en-BD")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-medium uppercase text-slate-400">
                      Stock
                    </span>
                    <p className="text-xs font-semibold text-slate-700">
                      {book.stock}
                    </p>
                  </div>
                </div>

                {/* Info (Compact) */}
                {(book.sellerPhone || book.pickupLocation) && (
                  <div className="mt-2.5 space-y-1 text-xs text-slate-500">
                    {book.sellerPhone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 shrink-0 text-slate-400" />
                        <span className="truncate">{book.sellerPhone}</span>
                      </div>
                    )}
                    {book.pickupLocation && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                        <span className="truncate">{book.pickupLocation}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleEdit(book._id)}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-50"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(book._id)}
                  disabled={deletingId === book._id}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {deletingId === book._id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
