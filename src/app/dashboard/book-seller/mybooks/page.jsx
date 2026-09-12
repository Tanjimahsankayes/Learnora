"use client";

import React from "react";
import MyBooks from "@/components/MyBooks";
import { useSession } from "@/lib/auth-client";
import { LockKeyhole } from "lucide-react";

const MyBooksPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        Loading user...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50">
            <LockKeyhole className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>

          {/* Title */}
          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            Login Required
          </h2>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            Please log in to your account to view and manage the books you have
            added.
          </p>

          {/* Button */}
          <button
            onClick={() => {
              window.location.href = "/auth/signin";
            }}
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
          >
            Login to Continue
          </button>

          {/* Small text */}
          <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
            Don't have an account? Create one and start selling books.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6">
      <MyBooks sellerEmail={session.user.email} />
    </main>
  );
};

export default MyBooksPage;
