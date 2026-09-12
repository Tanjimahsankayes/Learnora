"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Shield,
  GraduationCap,
  Store,
  UserCheck,
  Ban,
  CheckCircle,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api/users";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // ডাটাবেস থেকে ইউজার লোড করার ফাংশন
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_BASE_URL);

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        setUsers(data.users || []);
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error("Failed to load users:", err);
      setError("http://localhost:5000/api/users থেকে ডাটা আনা সম্ভব হয়নি। Backend Server টি চালু আছে কিনা নিশ্চিত করুন।");
    }{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ইউজার রোল পরিবর্তন করার ফাংশন (PATCH Request)
  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingId(userId);
      const res = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        alert(data.message || "রোল পরিবর্তন করা সম্ভব হয়নি!");
      }
    } catch (err) {
      console.error("Role update failed:", err);
      alert("রোল আপডেট করার সময় নেটওয়ার্ক সমস্যা হয়েছে!");
    } finally {
      setUpdatingId(null);
    }
  };

  // ইউজারকে Ban / Unban করার ফাংশন (PATCH Request)
  const handleToggleBan = async (userId, currentBanStatus) => {
    const nextBanStatus = !currentBanStatus;
    try {
      setUpdatingId(userId);
      const res = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBanned: nextBanStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBanned: nextBanStatus } : user
          )
        );
      } else {
        alert(data.message || "স্ট্যাটাস পরিবর্তন করা সম্ভব হয়নি!");
      }
    } catch (err) {
      console.error("Ban update failed:", err);
      alert("ব্যান স্ট্যাটাস আপডেট করার সময় সমস্যা হয়েছে!");
    } finally {
      setUpdatingId(null);
    }
  };

  // সার্চ ও রোল ফিল্টারিং লজিক
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
              <Users className="w-7 h-7 text-purple-400" />
              <span>Manage Users & Roles</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Manage user accounts, assign roles, and control platform access
              efficiently.
            </p>
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white text-xs px-3.5 py-2 rounded-xl transition-all"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin text-purple-400" : ""}`}
            />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-2xl flex items-center gap-3 text-rose-400 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {["all", "student", "teacher", "book-seller", "admin"].map(
              (role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                    roleFilter === role
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {role === "all" ? "All Roles" : role.replace("-", " ")}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              <p className="text-slate-400 text-sm">
                Loading users from server...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase text-slate-400 tracking-wider">
                    <th className="p-4">User Details</th>
                    <th className="p-4">Current Role</th>
                    <th className="p-4">Change Role</th>
                    <th className="p-4">Ban Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        {/* User Details */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-300 uppercase">
                              {user.name ? user.name.slice(0, 2) : "US"}
                            </div>
                            <div>
                              <p className="font-semibold text-white">
                                {user.name || "N/A"}
                              </p>
                              <p className="text-slate-400 text-xs">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role Badge */}
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                              user.role === "admin"
                                ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                                : user.role === "teacher"
                                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                                  : user.role === "book-seller"
                                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                    : "bg-slate-800 border-slate-700 text-slate-300"
                            }`}
                          >
                            {user.role === "admin" && (
                              <Shield className="w-3.5 h-3.5" />
                            )}
                            {user.role === "teacher" && (
                              <GraduationCap className="w-3.5 h-3.5" />
                            )}
                            {user.role === "book-seller" && (
                              <Store className="w-3.5 h-3.5" />
                            )}
                            {user.role === "student" && (
                              <UserCheck className="w-3.5 h-3.5" />
                            )}
                            <span>
                              {user.role
                                ? user.role.replace("-", " ")
                                : "Student"}
                            </span>
                          </span>
                        </td>

                        {/* Select Role */}
                        <td className="p-4">
                          <select
                            value={user.role || "student"}
                            disabled={updatingId === user._id}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500 disabled:opacity-50 cursor-pointer"
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="book-seller">Book Seller</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        {/* Status (Active / Banned) */}
                        <td className="p-4">
                          {user.isBanned ? (
                            <span className="inline-flex items-center gap-1 text-xs text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20 font-medium">
                              <Ban className="w-3.5 h-3.5" /> Banned
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-medium">
                              <CheckCircle className="w-3.5 h-3.5" /> Active
                            </span>
                          )}
                        </td>

                        {/* Ban/Unban Button */}
                        <td className="p-4 text-right">
                          <button
                            onClick={() =>
                              handleToggleBan(user._id, user.isBanned)
                            }
                            disabled={updatingId === user._id}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              user.isBanned
                                ? "bg-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white"
                                : "bg-rose-600/10 border-rose-500/30 text-rose-400 hover:bg-rose-600 hover:text-white"
                            }`}
                          >
                            {updatingId === user._id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto" />
                            ) : user.isBanned ? (
                              "Unban User"
                            ) : (
                              "Ban User"
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-8 text-center text-slate-500 text-xs"
                      >
                        কোনো ইউজার পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;