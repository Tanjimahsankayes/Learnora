"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import {
  User,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
} from "lucide-react";

const StudentProfile = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // 1. Loading State
  if (isPending) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading profile data...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!user) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-950 p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-md w-full space-y-3">
          <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-xl font-bold text-white">Access Denied</h3>
          <p className="text-slate-400 text-sm">
            You need to be logged in to view your student profile.
          </p>
        </div>
      </div>
    );
  }

  // Format Join Date safely
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Banner & Main User Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Top Decorative Banner Gradient */}
          <div className="h-32 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 relative">
            <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>{user.role || "student"}</span>
            </div>
          </div>

          {/* User Info Section */}
          <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-14">
            {/* Avatar */}
            <div className="relative">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-xl bg-slate-950"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 border-4 border-slate-900 shadow-xl flex items-center justify-center text-3xl font-bold text-white uppercase">
                  {user.name?.slice(0, 2) || "ST"}
                </div>
              )}
            </div>

            {/* Title & Email */}
            <div className="text-center sm:text-left space-y-1 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {user.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-purple-400" />
                  {user.email}
                </span>

                {/* Email Verification Badge */}
                {user.emailVerified ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5" /> Unverified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              <span>Account Information</span>
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">Student ID</span>
                <span className="font-mono text-slate-300 text-xs bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  {user.id || user._id || "6aa07d614a362f636819abbb"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">Account Role</span>
                <span className="capitalize font-medium text-purple-300">
                  {user.role || "student"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">Member Since</span>
                <span className="text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Learning Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>Learning Summary</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-2xl font-bold text-white block">0</span>
                <span className="text-xs text-slate-400">Enrolled Courses</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-2xl font-bold text-white block">0</span>
                <span className="text-xs text-slate-400">Completed Books</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
