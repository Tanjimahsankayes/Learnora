"use client";

import React, { useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import {
  User,
  Mail,
  CheckCircle2,
  Clock,
  Calendar,
  Store,
  BookOpen,
  DollarSign,
  Star,
  PlusCircle,
  Package,
  ShieldAlert,
  Camera,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const BookSellerProfile = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB.");
        return;
      }

      try {
        setUploading(true);

        const formData = new FormData();
        formData.append("image", file);

        // Send image to YOUR backend
        const response = await fetch("http://localhost:5000/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Image upload failed.");
        }

        // ImgBB image URL
        const imageUrl = data.imageUrl;

        console.log("ImgBB Image URL:", imageUrl);

        // Save ImgBB URL to Better Auth
        const result = await authClient.updateUser({
          image: imageUrl,
        });

        if (result?.error) {
          throw new Error(
            result.error.message || "Failed to update profile image.",
          );
        }

        toast.success("Profile image updated successfully.");

        window.location.reload();
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error(error.message || "Failed to upload image.");
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    };

  // 1. Loading State
  if (isPending) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading seller profile...</p>
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
            You need to be logged in to access the seller profile dashboard.
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Banner & Seller Info Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Decorative Gradient Banner */}
          <div className="h-36 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 relative">
            <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <Store className="w-4 h-4 text-purple-400" />
              <span>{user.role || "seller"}</span>
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
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 border-4 border-slate-900 shadow-xl flex items-center justify-center text-3xl font-bold text-white uppercase">
                    {user.name?.slice(0, 2) || "BS"}
                  </div>
                )}

                {/* Upload Button */}
                <label
                  htmlFor="profile-image"
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-500 border-2 border-slate-900 flex items-center justify-center cursor-pointer transition-all shadow-lg"
                  title="Change profile image"
                >
                  {uploading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 text-white" />
                  )}

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
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

                  {/* Email Verification Status */}
                  {user.emailVerified ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Seller
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      <Clock className="w-3.5 h-3.5" /> Unverified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Add Book Action */}
            <Link
              href="/dashboard/add-book"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all text-xs sm:text-sm shadow-lg shadow-purple-600/20 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Book</span>
            </Link>
          </div>
        </div>

        {/* Seller Overview Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Total Books
              </span>
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-[11px] text-slate-500">Books listed in store</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Total Sales
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">$0.00</p>
            <p className="text-[11px] text-slate-500">
              Total revenue generated
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Seller Rating
              </span>
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white">5.0</p>
            <p className="text-[11px] text-slate-500">
              Based on customer reviews
            </p>
          </div>
        </div>

        {/* Detailed Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seller Account Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              <span>Seller Credentials</span>
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">Seller ID</span>
                <span className="font-mono text-slate-300 text-xs bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  {user.id || user._id || "Seller-ID"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">Account Type</span>
                <span className="capitalize font-medium text-purple-300">
                  {user.role || "seller"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">Joined Store</span>
                <span className="text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions / Management Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-400" />
              <span>Manage Store</span>
            </h2>

            <div className="space-y-2.5">
              <Link
                href="/dashboard/book-seller/mybooks"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors text-sm text-slate-300 hover:text-white group"
              >
                <span>My Listed Books</span>
                <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </Link>

              <Link
                href="/dashboard/book-seller/orders"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors text-sm text-slate-300 hover:text-white group"
              >
                <span>Customer Orders</span>
                <Package className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSellerProfile;
