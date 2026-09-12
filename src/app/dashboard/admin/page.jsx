"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import {
  Shield,
  ShieldAlert,
  Mail,
  CheckCircle2,
  Clock,
  Calendar,
  Users,
  Store,
  BookOpen,
  DollarSign,
  Settings,
  UserCheck,
  BarChart3,
  Activity,
} from "lucide-react";
import Link from "next/link";

const AdminProfile = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // 1. Loading State
  if (isPending) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated / Security State
  if (!user) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-950 p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-md w-full space-y-3">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-xl font-bold text-white">
            Admin Access Restricted
          </h3>
          <p className="text-slate-400 text-sm">
            You must be authenticated with administrative privileges to access
            this page.
          </p>
        </div>
      </div>
    );
  }

  // Safe Date Formatting
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Banner & Admin Info Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Top Decorative Gradient Banner */}
          <div className="h-36 bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-950 relative">
            <div className="absolute top-4 right-4 bg-purple-500/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>System Administrator</span>
            </div>
          </div>

          {/* User Details Overlay */}
          <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 -mt-14">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* Avatar */}
              <div className="relative">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-xl bg-slate-950"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 border-4 border-slate-900 shadow-xl flex items-center justify-center text-3xl font-bold text-white uppercase">
                    {user.name?.slice(0, 2) || "AD"}
                  </div>
                )}
              </div>

              {/* Title & Email */}
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {user.name}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-400 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-purple-400" />
                    {user.email}
                  </span>

                  {/* Verification Status */}
                  {user.emailVerified ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      <Clock className="w-3.5 h-3.5" /> Unverified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Admin Settings Button */}
            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition-all text-xs sm:text-sm shadow-md active:scale-95"
            >
              <Settings className="w-4 h-4 text-purple-400" />
              <span>System Settings</span>
            </Link>
          </div>
        </div>

        {/* System Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Total Users
              </span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-[11px] text-slate-500">
              Registered Platform Users
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Total Sellers
              </span>
              <Store className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-[11px] text-slate-500">Active Book Sellers</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Books Catalog
              </span>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-[11px] text-slate-500">Books Available Online</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Platform Revenue
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">$0.00</p>
            <p className="text-[11px] text-slate-500">
              Gross Sales Transaction
            </p>
          </div>
        </div>

        {/* System Administration & Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Credentials */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Admin Profile Details</span>
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">Admin ID</span>
                <span className="font-mono text-slate-300 text-xs bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  {user.id || user._id || "Admin-ID"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">System Role</span>
                <span className="capitalize font-medium text-purple-300">
                  {user.role || "admin"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">Admin Since</span>
                <span className="text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Management Shortcuts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <span>System Controls</span>
            </h2>

            <div className="space-y-2.5">
              <Link
                href="/admin/manage-users"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors text-sm text-slate-300 hover:text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span>Manage Users & Roles</span>
                </div>
                <span className="text-xs text-slate-500 group-hover:text-purple-400">
                  View
                </span>
              </Link>

              <Link
                href="/admin/manage-books"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors text-sm text-slate-300 hover:text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Books Approval & Management</span>
                </div>
                <span className="text-xs text-slate-500 group-hover:text-purple-400">
                  View
                </span>
              </Link>

              <Link
                href="/admin/analytics"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors text-sm text-slate-300 hover:text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <span>Analytics & Financial Reports</span>
                </div>
                <span className="text-xs text-slate-500 group-hover:text-purple-400">
                  View
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
