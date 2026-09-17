"use client";

import React from "react";
import MyBooks from "@/components/MyBooks";
import { useSession } from "@/lib/auth-client";
import { LockKeyhole, BookOpen, Loader2 } from "lucide-react";

const MyBooksPage = () => {
  const { data: session, isPending } = useSession();

  // 1. Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="text-sm text-slate-500">Loading user...</span>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!session?.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <LockKeyhole className="h-8 w-8 text-indigo-600" />
          </div>

          {/* Title */}
          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Login Required
          </h2>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Please log in to your account to view and manage the books you have
            added.
          </p>

          {/* Button */}
          <button
            onClick={() => {
              window.location.href = "/auth/signin";
            }}
            className="mt-7 w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
          >
            Login to Continue
          </button>

          {/* Small text */}
          <p className="mt-4 text-xs text-slate-400">
            Don't have an account? Create one and start selling books.
          </p>
        </div>
      </div>
    );
  }

  // 3. Authenticated Page State
  return (
    <main className="mx-auto max-w-7xl p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between rounded-3xl border border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
            <BookOpen className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-200 sm:text-2xl">
              My Books
            </h1>
            <p className="text-xs text-slate-500 sm:text-sm">
              Manage all the books you have listed.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rounded-3xl border border-slate-900 p-6 shadow-sm">
        <MyBooks sellerEmail={session.user.email} />
      </div>
    </main>
  );
};

export default MyBooksPage;
