"use client";

import React from "react";
import {
  Users,
  ShieldCheck,
  Heart,
  MessageSquare,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Lock,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const CommunityGuidelines = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4 text-purple-400" />
            <span>LearnOra Community Policy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            কমিউনিটি গাইডলাইন
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            LearnOra-তে আমরা নিরাপদ, সম্মানজনক এবং সহযোগিতাপূর্ণ একটি শিক্ষার
            পরিবেশ তৈরিতে প্রতিশ্রুতিবদ্ধ। আমাদের প্ল্যাটফর্ম ব্যবহার করার সময়
            সকল শিক্ষক ও শিক্ষার্থীদের এই নির্দেশিকাগুলো মেনে চলতে হবে।
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">পারস্পরিক সম্মান</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              অন্যান্য শিক্ষার্থী এবং শিক্ষকদের মতামত ও দৃষ্টিভঙ্গিকে সম্মান
              করুন। কোনো ধরনের অপমানজনক আচরণ গ্রহণযোগ্য নয়।
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              নিরাপত্তা ও প্রাইভেসি
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              নিজের এবং অন্যদের ব্যক্তিগত তথ্য (ফোন নম্বর, পাসওয়ার্ড, জাতীয়
              পরিচয়পত্র ইত্যাদি) সুরক্ষিত রাখুন।
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">মানসম্মত কনটেন্ট</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              কোর্স আলোচনা এবং বই বিক্রির ক্ষেত্রে সব সময় সঠিক এবং শিক্ষণীয়
              কনটেন্ট শেয়ার করুন।
            </p>
          </div>
        </div>

        {/* Detailed Guidelines Section */}
        <div className="space-y-6">
          {/* Do's (কী করণীয়) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span>কী কী করণীয় (Do&apos;s)</span>
            </h2>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>
                  <strong>সহায়তামূলক আলোচনা:</strong> কমেন্ট বা ফোরামে অন্যান্য
                  শিক্ষার্থীদের শিখতে সাহায্য করুন এবং গঠনমূলক ফিডব্যাক দিন।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>
                  <strong>সঠিক তথ্য প্রদান:</strong> শিক্ষক ও বিক্রেতা হিসেবে
                  আপনার কোর্স এবং বইয়ের বর্ণনা সব সময় সত্য ও নিখুঁত রাখুন।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>
                  <strong>কপিরাইট মেনে চলা:</strong> আপনি নিজে যেসব কনটেন্ট তৈরি
                  করেছেন বা ব্যবহারের আইনগত অধিকার আছে, কেবল সেগুলোই
                  প্ল্যাটফর্মে শেয়ার করুন।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>
                  <strong>রিপোর্ট করা:</strong> কোনো ব্যবহারকারী বা কনটেন্ট
                  কমিউনিটি নিয়ম ভঙ্গ করলে তা সাথে সাথে অ্যাডমিনকে জানান।
                </span>
              </li>
            </ul>
          </div>

          {/* Don'ts (কী করা যাবে না) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2.5">
              <XCircle className="w-6 h-6 text-rose-400" />
              <span>কী কী করা যাবে না (Don&apos;ts)</span>
            </h2>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>
                  <strong>সাইবার বুলিং ও হেট স্পিচ:</strong> বর্ণ, ধর্ম, জাতি বা
                  লিঙ্গভিত্তিক কোনো কটূক্তি কিংবা কাউকে ব্যক্তিগতভাবে আক্রমণ করা
                  সম্পূর্ণ নিষিদ্ধ।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>
                  <strong>স্প্যামিং ও ভুয়া প্রমোট:</strong> ফোরাম বা কমেন্ট
                  বক্সে অনাকাঙ্ক্ষিত বিজ্ঞাপন, প্রোমোশনাল লিঙ্ক বা স্প্যাম করা
                  যাবে না।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>
                  <strong>কপিরাইট লঙ্ঘন ও পাইরেসি:</strong> অনুমোদহীন পেইড
                  কোর্স, পাইরেটেড বই কিংবা যেকোনো কপিরাইটযুক্ত রিসোর্স শেয়ার করা
                  কঠোরভাবে নিষিদ্ধ।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>
                  <strong>একাউন্ট শেয়ারিং:</strong> আপনার LearnOra একাউন্টের
                  অ্যাক্সেস অন্য কারো সাথে শেয়ার করবেন না।
                </span>
              </li>
            </ul>
          </div>

          {/* Enforcement & Consequences */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <AlertOctagon className="w-6 h-6 text-amber-400" />
              <span>গাইডলাইন লঙ্ঘনের ফলাফল</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              যদি কোনো ইউজার LearnOra-এর কমিউনিটি নিয়মাবলী লঙ্ঘন করেন, তবে
              পরিস্থিতির ওপর ভিত্তি করে প্ল্যাটফর্ম অ্যাডমিন নিচের যেকোনো
              পদক্ষেপ গ্রহণ করতে পারেন:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold text-sm">
                  ১. স সতর্কবার্তা
                </span>
                <p className="text-slate-400 text-xs">
                  প্রথমবার সাধারণ ভুলের জন্য লিখিত ওয়ার্নিং প্রদান করা হবে।
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-orange-400 font-bold text-sm">
                  ২. কনটেন্ট রিমুভ
                </span>
                <p className="text-slate-400 text-xs">
                  নিয়মবহির্ভূত পোস্ট, কমেন্ট বা বই প্ল্যাটফর্ম থেকে মুছে ফেলা
                  হবে।
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold text-sm">
                  ৩. একাউন্ট ব্যান
                </span>
                <p className="text-slate-400 text-xs">
                  গুরুতর অপরাধের ক্ষেত্রে একাউন্ট স্থায়ীভাবে ব্যান বা স্থগিত করা
                  হবে।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support Footer Box */}
        <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <span>কোনো প্রশ্ন বা রিপোর্ট করার প্রয়োজন?</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              যদি আপনি কোনো নিয়ম ভঙ্গের ঘটনা দেখতে পান, তবে আমাদের সাপোর্ট টিমের
              সাথে যোগাযোগ করুন।
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/20 whitespace-nowrap active:scale-95"
          >
            যোগাযোগ করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
