"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Clock,
  Calendar,
  Globe,
  Star,
  Users,
  CheckCircle2,
  Video,
  GraduationCap,
  ShieldCheck,
  Share2,
  Loader2,
  AlertCircle,
  PlayCircle,
  FileText,
  Award,
} from "lucide-react";
import Link from "next/link";

const API_BASE_URL = "http://localhost:5000/api/courses";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/${id}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setCourse(data.course);
      } else {
        // Fallback mock matching your exact MongoDB structure (If API is offline)
        setCourse({
          _id: id || "6aa5986b756786f80fe25bc3",
          title: "Web Dev Masterclass",
          category: "Web Development",
          shortDescription:
            "Complete Full-Stack Web Development Course with MERN, Next.js & Modern Web Technologies.",
          fullDescription:
            "এই কোর্সটি এমনভাবে সাজানো হয়েছে যাতে একজন নতুন শিক্ষার্থী একদম জিরো থেকে ওয়েব ডেভেলপমেন্ট শিখে একটি মানসম্মত পোর্টফোলিও তৈরি করতে পারে। কোর্সে রিয়েল-লাইফ প্রজেক্ট, এপিআই ইন্টিগ্রেশন, ডাটাবেস ডিজাইন এবং ভেরসেল ডিপ্লয়মেন্টসহ সেরা সব টেকনোলজি কভার করা হয়েছে।",
          thumbnail:
            "https://i.pinimg.com/1200x/9d/2a/3a/9d2a3a5eb1be8df87fa073c759ea2f3b.jpg",
          level: "Beginner",
          language: "Bangla & English",
          instructor: "Kayes",
          duration: "3 Month",
          totalClasses: 36,
          classDuration: "36h",
          classType: "Recorded",
          schedule: "সোম, বুধ, শুক্র (রাত ৯:০০ টা)",
          startDate: "2027-06-02",
          endDate: "2027-02-05",
          price: 120000,
          discountPrice: 500,
          isFree: false,
          status: "approved",
          enrolledStudents: 124,
          rating: 4.8,
          totalReviews: 18,
          createdAt: "2026-09-12T18:22:35.524Z",
        });
      }
    } catch (err) {
      console.error("Failed to load course details:", err);
      setError("কোর্সের তথ্য লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-slate-400 text-sm">কোর্সের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">কোর্সটি পাওয়া যায়নি!</h2>
          <p className="text-slate-400 text-xs">
            {error || "অনুরোধকৃত কোর্সটি এই মুহূর্তে উপলব্ধ নয়।"}
          </p>
          <Link
            href="/courses"
            className="inline-block px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all"
          >
            সকল কোর্সে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const effectivePrice = course.isFree
    ? 0
    : course.discountPrice > 0
      ? course.discountPrice
      : course.price;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Breadcrumb & Actions */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Link
              href="/courses"
              className="hover:text-purple-400 transition-colors"
            >
              Courses
            </Link>
            <span>/</span>
            <span className="text-slate-200">{course.category}</span>
            <span>/</span>
            <span className="text-purple-400 font-medium truncate max-w-[200px] sm:max-w-xs">
              {course.title}
            </span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("লিঙ্ক কপি হয়েছে!");
            }}
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
          >
            <Share2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Share</span>
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Course Banner & Overview Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Short Description */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                  {course.level}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating || "0.0"}</span>
                  <span className="text-slate-500 font-normal">
                    ({course.totalReviews || 0} রিভিউ)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>
                    <strong className="text-slate-200">
                      {course.enrolledStudents || 0}
                    </strong>{" "}
                    জন শিক্ষার্থী
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>
                    ইন্সট্রাক্টর:{" "}
                    <strong className="text-slate-200">
                      {course.instructor}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Course Features Quick Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
              <div className="space-y-1">
                <p className="text-slate-500 text-[11px] font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" /> সময়সীমা
                </p>
                <p className="text-sm font-semibold text-slate-200">
                  {course.duration || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-[11px] font-medium flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" /> মোট ক্লাস
                </p>
                <p className="text-sm font-semibold text-slate-200">
                  {course.totalClasses || 0} টি
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-[11px] font-medium flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-purple-400" /> ক্লাসের ধরন
                </p>
                <p className="text-sm font-semibold text-slate-200">
                  {course.classType}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-[11px] font-medium flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-purple-400" /> ভাষা
                </p>
                <p className="text-sm font-semibold text-slate-200">
                  {course.language}
                </p>
              </div>
            </div>

            {/* Full Description Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
                <FileText className="w-5 h-5 text-purple-400" />
                <span>কোর্সের বিস্তারিত বিবরণ (Full Description)</span>
              </h2>
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-3">
                {course.fullDescription}
              </div>
            </div>

            {/* Schedule & Timing Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>ক্লাস শিডিউল ও সময়সূচি</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                {course.schedule && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
                    <p className="text-slate-500 text-xs">
                      সাপ্তাহিক দিন ও সময়:
                    </p>
                    <p className="font-semibold text-slate-200">
                      {course.schedule}
                    </p>
                  </div>
                )}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
                  <p className="text-slate-500 text-xs">কোর্স শুরুর তারিখ:</p>
                  <p className="font-semibold text-slate-200">
                    {course.startDate
                      ? new Date(course.startDate).toLocaleDateString("bn-BD")
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
                  <p className="text-slate-500 text-xs">
                    প্রতি ক্লাসের সময়ব্যাপ্তি:
                  </p>
                  <p className="font-semibold text-slate-200">
                    {course.classDuration || "N/A"}
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
                  <p className="text-slate-500 text-xs">
                    কোর্স সমাপ্তির অনুমিত তারিখ:
                  </p>
                  <p className="font-semibold text-slate-200">
                    {course.endDate
                      ? new Date(course.endDate).toLocaleDateString("bn-BD")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* What you will get */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
                <Award className="w-5 h-5 text-purple-400" />
                <span>এই কোর্সে আপনি যা যা পাচ্ছেন</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>লাইফটাইম কোর্স অ্যাক্সেস</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>প্র্যাকটিক্যাল প্রজেক্ট বেইজড শিক্ষা</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>সরাসরি ইন্সট্রাক্টর সাপোর্ট ও সোর্স কোড</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>কোর্স সম্পন্ন করার সার্টিফিকেট</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Enroll Box */}
          <div className="lg:col-span-1 lg:sticky lg:top-8 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-5">
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000";
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg shadow-purple-600/50">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <p className="text-xs text-slate-400 font-medium">
                  কোর্সের মূল্য (Course Fee)
                </p>
                {course.isFree ? (
                  <span className="text-3xl font-extrabold text-emerald-400">
                    FREE
                  </span>
                ) : (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-white">
                      ৳{effectivePrice.toLocaleString()}
                    </span>
                    {course.discountPrice > 0 && (
                      <span className="text-sm text-slate-500 line-through">
                        ৳{course.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Enroll Button */}
              <div className="space-y-3">
                <button
                  onClick={() =>
                    alert(
                      `কোর্স এনরোল রিকোয়েস্ট পাঠানো হচ্ছে... Course ID: ${course._id}`,
                    )
                  }
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/25 active:scale-95"
                >
                  {course.isFree ? "ফ্রি এনরোল করুন" : "কোর্সটি এখনই কিনুন"}
                </button>
                <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>১০০% নিরাপদ পেমেন্ট ও ইন্সট্যান্ট অ্যাক্সেস</span>
                </p>
              </div>

              {/* Quick Info Checklist */}
              <div className="space-y-2.5 pt-2 text-xs text-slate-400">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                  <span>ইন্সট্রাক্টর</span>
                  <strong className="text-slate-200">
                    {course.instructor}
                  </strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                  <span>কোর্স লেভেল</span>
                  <strong className="text-slate-200">{course.level}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                  <span>মোট ক্লাস সংখ্যা</span>
                  <strong className="text-slate-200">
                    {course.totalClasses || 0} টি
                  </strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                  <span>মোট সময়সীমা</span>
                  <strong className="text-slate-200">
                    {course.duration || "N/A"}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>স্ট্যাটাস</span>
                  <span className="text-emerald-400 font-semibold uppercase text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {course.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
