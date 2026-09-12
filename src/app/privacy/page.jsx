"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Cookie,
  UserCheck,
  Mail,
  HelpCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";

const PrivacyPolicy = () => {
  // Last updated date
  const lastUpdated = "১২ সেপ্টেম্বর, ২০২৬";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>LearnOra Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            প্রাইভেসি পলিসি
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            LearnOra-তে আপনার তথ্যের গোপনীয়তা ও নিরাপত্তা আমাদের কাছে অত্যন্ত
            গুরুত্বপূর্ণ। আমরা আপনার ব্যক্তিগত তথ্য কীভাবে সংগ্রহ, ব্যবহার এবং
            সুরক্ষিত রাখি তা এই নীতিমালায় ব্যাখ্যা করা হয়েছে।
          </p>
          <p className="text-slate-500 text-xs">
            সর্বশেষ আপডেট:{" "}
            <span className="text-slate-400 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Quick Summary Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">তথ্য সুরক্ষা</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              আপনার পাসওয়ার্ড এবং স্পর্শকাতর তথ্য আমরা এনক্রিপ্টেড উপায়ে
              এনভায়রনমেন্টাল লেভেলে সুরক্ষিত রাখি।
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              তথ্য শেয়ার না করা
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              আমরা বাণিজ্যিক বা বিজ্ঞাপনের উদ্দেশ্যে আপনার ব্যক্তিগত ডেটা কোনো
              তৃতীয় পক্ষের কাছে বিক্রি করি না।
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">ইউজার কন্ট্রোল</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              আপনি যেকোনো সময় আপনার প্রোফাইলের ডেটা আপডেট করতে পারবেন কিংবা
              একাউন্ট মুছে ফেলার অনুরোধ করতে পারবেন।
            </p>
          </div>
        </div>

        {/* Detailed Privacy Clauses */}
        <div className="space-y-6">
          {/* 1. Information We Collect */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <Database className="w-5 h-5 text-purple-400" />
              <span>১. আমরা কী কী তথ্য সংগ্রহ করি</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                LearnOra প্ল্যাটফর্ম ব্যবহার করার সময় আমরা প্রধানত দুটি উপায়ে
                তথ্য সংগ্রহ করে থাকি:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-slate-400">
                <li>
                  <strong className="text-slate-200">
                    অ্যাকাউন্ট সম্পর্কিত তথ্য:
                  </strong>{" "}
                  অ্যাকাউন্ট তৈরির সময় প্রদত্ত আপনার নাম, ইমেইল এড্রেস, প্রোফাইল
                  ছবি এবং রোল (শিক্ষার্থী, শিক্ষক, বিক্রেতা বা এডমিন)।
                </li>
                <li>
                  <strong className="text-slate-200">
                    Google OAuth/Better Auth ডেটা:
                  </strong>{" "}
                  যদি আপনি গুগল বা থার্ড-পার্টি মাধ্যমে লগইন করেন, তবে আমরা
                  আপনার অনুমতিক্রমে মৌলিক সোশ্যাল প্রোফাইল ডেটা সংগ্রহ করি।
                </li>
                <li>
                  <strong className="text-slate-200">
                    লেনদেন ও ক্রয় বিবরণী:
                  </strong>{" "}
                  প্ল্যাটফর্মে কোর্স ক্রয় বা বই অর্ডারের তথ্য। (তবে ব্যাংকিং বা
                  কার্ডের পিন সম্পূর্ণ সুরক্ষিত পেমেন্ট গেটওয়ের অধীনে থাকে)।
                </li>
              </ul>
            </div>
          </div>

          {/* 2. How We Use Your Data */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <FileText className="w-5 h-5 text-purple-400" />
              <span>২. সংগৃহীত তথ্যের ব্যবহার</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                আপনার সংগৃহীত ডেটা কেবল প্ল্যাটফর্মের মান উন্নত করা এবং পরিষেবা
                প্রদানের জন্য ব্যবহার করা হয়:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-slate-400">
                <li>অ্যাকাউন্ট ভেরিফিকেশন এবং অথেন্টিকেশন পরিচালনা করা।</li>
                <li>
                  কেনা কোর্স বা অর্ডাকৃত বইয়ের ডেলিভারি ও প্রগ্রেস ট্র্যাকিং সহজ
                  করা।
                </li>
                <li>
                  সিকিউরিটি ইস্যু সমাধান এবং প্ল্যাটফর্মের টেকনিক্যাল সমস্যা
                  সমাধান করা।
                </li>
                <li>
                  গুরুত্বপূর্ণ অ্যাকাউন্ট নোটিফিকেশন ও সার্ভিস আপডেট পাঠানো।
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Cookies and Tracking */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <Cookie className="w-5 h-5 text-purple-400" />
              <span>৩. কুকিজ (Cookies) ও সেশন ট্র্যাকিং</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                আমরা সেশন ম্যানেজমেন্ট এবং ইউজারের অভিজ্ঞতা নিরবচ্ছিন্ন রাখতে
                কুকিজ ব্যবহার করি। এটি আপনাকে বারবার লগইন করা থেকে বিরত রাখে এবং
                আপনার সেভ করা পছন্দের বিষয়গুলো মনে রাখতে সাহায্য করে। আপনি চাইলে
                আপনার ব্রাউজার সেটিংস থেকে কুকিজ নিষ্ক্রিয় করতে পারেন।
              </p>
            </div>
          </div>

          {/* 4. Data Rights & Security */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <Lock className="w-5 h-5 text-purple-400" />
              <span>৪. আপনার অধিকার ও নিরাপত্তা</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                একজন ব্যবহারকারী হিসেবে আপনার অ্যাকাউন্ট ডেটা সংশোধন, পরিবর্তন
                বা যেকোনো সময় অ্যাকাউন্ট ডিলিট করার অধিকার রয়েছে। এছাড়াও কোনো
                অনাকাঙ্ক্ষিত অ্যাক্সেস রোধে আমরা আধুনিক এনক্রিপশন প্রোটোকল
                অনুসরণ করি।
              </p>
            </div>
          </div>
        </div>

        {/* Contact Footer Box */}
        <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <span>প্রাইভেসি সংক্রান্ত কোনো প্রশ্ন আছে?</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              আমাদের ডাটা প্রটেকশন টিমের সাথে কথা বলতে সরাসরি যোগাযোগ করতে
              পারেন।
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/20 whitespace-nowrap active:scale-95 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>যোগাযোগ করুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
