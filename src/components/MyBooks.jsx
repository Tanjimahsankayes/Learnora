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

  // ===============================
  // FETCH BOOKS
  // ===============================

  const fetchBooks = async () => {
    if (!sellerEmail) {
      console.log("No seller email found");

      setLoading(false);
      setError("User email not found");

      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Fetching books for:", sellerEmail);

      const url = `${API_URL}/api/books?sellerEmail=${encodeURIComponent(
        sellerEmail,
      )}`;

      console.log("API URL:", url);

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });

      console.log("Response status:", response.status);

      const data = await response.json();

      console.log("Books API response:", data);

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

  // ===============================
  // LOAD BOOKS
  // ===============================

  useEffect(() => {
    fetchBooks();
  }, [sellerEmail]);

  // ===============================
  // DELETE BOOK
  // ===============================

  const handleDelete = async (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) {
      return;
    }

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

  // ===============================
  // EDIT BOOK
  // ===============================

  const handleEdit = (bookId) => {
    window.location.href = `/dashboard/edit-book/${bookId}`;
  };

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading books...
          </p>
        </div>
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
        <p className="font-semibold text-red-600 dark:text-red-400">{error}</p>

        <button
          onClick={fetchBooks}
          className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ===============================
  // EMPTY
  // ===============================

  if (books.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
        <BookOpen className="h-14 w-14 text-slate-400" />

        <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
          No Books Found
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You haven't added any books using this account.
        </p>
      </div>
    );
  }

  // ===============================
  // BOOK CARDS
  // ===============================

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Books
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {books.length} book
          {books.length !== 1 ? "s" : ""} added by{" "}
          <span className="font-medium">{sellerEmail}</span>
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <div
            key={book._id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
          >
            {/* Cover Image */}

            <div className="relative h-64 bg-slate-100 dark:bg-slate-800">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <BookOpen className="h-16 w-16 text-slate-400" />
                </div>
              )}

              {/* Format */}

              {book.format && (
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow dark:bg-slate-900/90 dark:text-slate-200">
                  {book.format}
                </span>
              )}

              {/* Condition */}

              {book.condition && (
                <span className="absolute right-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold capitalize text-white">
                  {book.condition}
                </span>
              )}
            </div>

            {/* Content */}

            <div className="p-5">
              {/* Title */}

              <h3 className="line-clamp-1 text-xl font-bold text-slate-900 dark:text-white">
                {book.title}
              </h3>

              {/* Author */}

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                by {book.author}
              </p>

              {/* Category / Language */}

              <div className="mt-4 flex flex-wrap gap-2">
                {book.category && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                    {book.category}
                  </span>
                )}

                {book.language && (
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-600 dark:bg-teal-950 dark:text-teal-300">
                    {book.language}
                  </span>
                )}
              </div>

              {/* Rating */}

              <div className="mt-4 flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />

                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {book.rating || 0}
                </span>
              </div>

              {/* Description */}

              {book.description && (
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {book.description}
                </p>
              )}

              {/* Price */}

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Price
                  </p>

                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    ৳{Number(book.price || 0).toLocaleString("en-BD")}
                  </p>
                </div>

                {book.discountPrice && (
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Discount
                    </p>

                    <p className="font-semibold text-emerald-600">
                      ৳{Number(book.discountPrice).toLocaleString("en-BD")}
                    </p>
                  </div>
                )}
              </div>

              {/* Stock */}

              <div className="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Available Stock
                  </span>

                  <span className="font-bold text-slate-900 dark:text-white">
                    {book.stock}
                  </span>
                </div>
              </div>

              {/* Seller Info */}

              <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                {book.sellerPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />

                    <span>{book.sellerPhone}</span>
                  </div>
                )}

                {book.pickupLocation && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />

                    <span className="line-clamp-1">{book.pickupLocation}</span>
                  </div>
                )}
              </div>

              {/* Buttons */}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleEdit(book._id)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(book._id)}
                  disabled={deletingId === book._id}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === book._id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
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
