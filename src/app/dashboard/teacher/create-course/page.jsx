"use client";

import React, { useState } from "react";
import {
  BookOpen,
  DollarSign,
  Image as ImageIcon,
  Clock,
  Calendar,
  Layers,
  Globe,
  UserCheck,
  Video,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api/courses";

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    thumbnail: "",
    level: "Beginner",
    language: "Bangla",

    // Course Details
    instructor: "",
    duration: "",
    totalClasses: "",
    classDuration: "",
    classType: "Live",
    schedule: "",
    startDate: "",
    endDate: "",

    // Pricing
    price: "",
    discountPrice: "",
    isFree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({
          type: "success",
          text: "কোর্সটি সফলভাবে তৈরি করা হয়েছে!",
        });
        // Reset Form
        setFormData({
          title: "",
          category: "",
          shortDescription: "",
          fullDescription: "",
          thumbnail: "",
          level: "Beginner",
          language: "Bangla",
          instructor: "",
          duration: "",
          totalClasses: "",
          classDuration: "",
          classType: "Live",
          schedule: "",
          startDate: "",
          endDate: "",
          price: "",
          discountPrice: "",
          isFree: false,
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "কোর্স তৈরি ব্যর্থ হয়েছে।",
        });
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setMessage({ type: "error", text: "সার্ভারে কানেক্ট করা সম্ভব হয়নি।" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <span>Create New Course</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            নতুন একটি কোর্স পাবলিশ করার জন্য নিচের তথ্যগুলো পূরণ করুন।
          </p>
        </div>

        {/* Success / Error Message */}
        {message && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: Basic Information */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>১. সাধারণ তথ্য (Basic Info)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Web Development with Next.js"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Web Development, Graphics"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Thumbnail URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Thumbnail Image URL *</span>
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  required
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Course Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>

              {/* Language */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Language</span>
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 cursor-pointer"
                >
                  <option value="Bangla">Bangla</option>
                  <option value="English">English</option>
                  <option value="Bangla & English">Bangla & English</option>
                </select>
              </div>

              {/* Short Description */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  required
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="কোর্সের একটি সংক্ষিপ্ত বিবরণ দিন..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Full Description */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  rows="4"
                  required
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="কোর্সের বিস্তারিত বিবরণ লিখুন..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                ></textarea>
              </div>
            </div>
          </div>

          {/* SECTION 2: Course Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>২. কোর্সের ডিটেইলস (Course Details)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Instructor */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Instructor Name *</span>
                </label>
                <input
                  type="text"
                  name="instructor"
                  required
                  value={formData.instructor}
                  onChange={handleChange}
                  placeholder="e.g. Tanjim Kayes"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Total Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Total Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 Months / 40 Hours"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Total Classes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Total Classes
                </label>
                <input
                  type="number"
                  name="totalClasses"
                  value={formData.totalClasses}
                  onChange={handleChange}
                  placeholder="e.g. 36"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Class Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Class Duration
                </label>
                <input
                  type="text"
                  name="classDuration"
                  value={formData.classDuration}
                  onChange={handleChange}
                  placeholder="e.g. 1.5 Hours"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Class Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-slate-400" />
                  <span>Class Type</span>
                </label>
                <select
                  name="classType"
                  value={formData.classType}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 cursor-pointer"
                >
                  <option value="Live">Live Class</option>
                  <option value="Recorded">Recorded Videos</option>
                  <option value="Hybrid">Hybrid (Live + Recorded)</option>
                </select>
              </div>

              {/* Schedule */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Schedule
                </label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  placeholder="e.g. Mon, Wed, Fri at 9:00 PM"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Start Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Start Date</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* End Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>End Date</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Pricing */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <span>৩. মূল্য নির্ধারণ (Pricing)</span>
            </h2>

            <div className="space-y-5">
              {/* Free Course Toggle */}
              <label className="flex items-center gap-3 cursor-pointer bg-slate-950 p-3.5 rounded-xl border border-slate-800 w-fit">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={formData.isFree}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700"
                />
                <span className="text-sm font-semibold text-slate-200">
                  এটি একটি সম্পূর্ণ ফ্রি কোর্স (Free Course)
                </span>
              </label>

              {/* Price & Discount Fields (Hide if Is Free) */}
              {!formData.isFree && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Course Price (BDT) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required={!formData.isFree}
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 3000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Discount Price (BDT){" "}
                      <span className="text-slate-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      placeholder="e.g. 1999"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>কোর্স তৈরি করা হচ্ছে...</span>
                </>
              ) : (
                <span>Publish Course</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
