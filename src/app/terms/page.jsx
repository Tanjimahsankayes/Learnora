"use client";

import React from "react";
import {
  FileText,
  ShieldAlert,
  CreditCard,
  UserCheck,
  BookOpen,
  Scale,
  CheckCircle2,
  HelpCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";

const TermsAndServices = () => {
  const lastUpdated = "১২ সেপ্টেম্বর, ২০২৬";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-purple-400" />
            <span>LearnOra Legal Policy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            টার্মস অ্যান্ড সার্ভিসেস
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            LearnOra ওয়েবসাইট এবং সেবাসমূহ ব্যবহার করার আগে অনুগ্রহ করে এই
            শর্তাবলী মনোযোগ সহকারে পড়ুন। আমাদের প্ল্যাটফর্ম ব্যবহারের মাধ্যমে
            আপনি এই নিয়মগুলো মেনে নিতে সম্মত হচ্ছেন।
          </p>
          <p className="text-slate-500 text-xs">
            সর্বশেষ আপডেট:{" "}
            <span className="text-slate-400 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              অ্যাকাউন্ট দায়িত্ব
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              আপনার পাসওয়ার্ড এবং অ্যাকাউন্টের মাধ্যমে সম্পাদিত সকল কার্যকলাপের
              দায়িত্ব আপনাকেই বহন করতে হবে।
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">কপিরাইট সংরক্ষণ</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              แพล্যাটফর্মের সমস্ত ভিডিও, বই ও কনটেন্ট কপিরাইট দ্বারা সুরক্ষিত।
              এগুলো বাণিজ্যিকভাবে পুনর্বিক্রি নিষিদ্ধ।
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">স্বচ্ছ লেনদেন</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              কোর্স ও বইয়ের পেমেন্ট প্রক্রিয়াকরণ নিরাপদ গেটওয়ের মাধ্যমে সম্পন্ন
              হয়।
            </p>
          </div>
        </div>

        {/* Detailed Terms Terms Clauses */}
        <div className="space-y-6">
          {/* 1. Acceptance of Terms */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
              <span>১. শর্তাবলীর সম্মতি</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                LearnOra-তে রেজিস্ট্রেশন বা সেবা ব্যবহারের মাধ্যমে আপনি নিশ্চিত
                করছেন যে আপনার বয়স কমপক্ষে ১৩ বছর এবং আপনি এই ব্যবহারের শর্তাবলী
                মেনে চলতে আইনগতভাবে সক্ষম।
              </p>
            </div>
          </div>

          {/* 2. User Roles and Conduct */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <UserCheck className="w-5 h-5 text-purple-400" />
              <span>২. ব্যবহারকারীর দায়িত্ব ও আচরণ</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <ul className="space-y-2 pl-4 list-disc text-slate-400">
                <li>
                  <strong className="text-slate-200">
                    অ্যাকাউন্ট নিরাপত্তা:
                  </strong>{" "}
                  অ্যাকাউন্ট তৈরির সময় সঠিক তথ্য প্রদান করতে হবে। একাধিক
                  ব্যক্তির সাথে একটি অ্যাকাউন্ট শেয়ার করা নিষিদ্ধ।
                </li>
                <li>
                  <strong className="text-slate-200">
                    বিক্রেতা ও শিক্ষক নীতি:
                  </strong>{" "}
                  টিউটর বা বই বিক্রেতা হিসেবে সঠিক ও বৈধ কনটেন্ট প্রদান করতে
                  হবে। বিভ্রান্তিকর তথ্য প্রদান করা যাবে না।
                </li>
                <li>
                  <strong className="text-slate-200">নিষিদ্ধ আচরণ:</strong> কোনো
                  প্রকার হ্যাকিং, পাইরেসি বা সাইটের ক্ষতিসাধন করার চেষ্টা করলে
                  অ্যাকাউন্ট ব্যান করা হবে।
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Payments, Refunds, and Content Access */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-purple-400" />
              <span>৩. পেমেন্ট, রিফান্ড ও লাইফটাইম অ্যাক্সেস</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <ul className="space-y-2 pl-4 list-disc text-slate-400">
                <li>
                  <strong className="text-slate-200">কোর্স ক্রয়:</strong> কোর্স
                  সম্পূর্ণ কেনার পর ইউজার নির্দেশিত সময়ের জন্য কোর্সের রিসোর্স
                  দেখার সুযোগ পাবেন।
                </li>
                <li>
                  <strong className="text-slate-200">রিফান্ড পলিসি:</strong>{" "}
                  ডিজিটাল কনটেন্ট বা কেনা বইয়ের ক্ষেত্রে নির্দিষ্ট রিফান্ড নীতি
                  প্রযোজ্য। বিস্তারিত তথ্যের জন্য সাপোর্টে যোগাযোগ করুন।
                </li>
              </ul>
            </div>
          </div>

          {/* 4. Intellectual Property Rights */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>৪. মেধাসত্ত্ব ও কপিরাইট</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                LearnOra প্ল্যাটফর্মে থাকা সমস্ত টেক্সট, গ্রাফিক্স, লোগো, ভিডিও
                কোর্স এবং বই প্ল্যাটফর্ম ও সংশ্লিষ্ট কনটেন্ট ক্রিয়েটরদের
                স্বত্বাধিকারভুক্ত। অনুমতি ব্যতীত বাণিজ্যিক উদ্দেশ্যে কপি বা
                পুনরুৎপাদন কঠোরভাবে নিষিদ্ধ।
              </p>
            </div>
          </div>

          {/* 5. Termination */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-5 h-5 text-purple-400" />
              <span>৫. অ্যাকাউন্ট স্থগিতকরণ</span>
            </h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                কোনো ব্যবহারকারী শর্তাবলী বা কমিউনিটি গাইডলাইন লঙ্ঘন করলে,
                LearnOra কোনো পূর্ব নোটিশ ছাড়াই সেই অ্যাকাউন্ট স্থগিত বা
                স্থায়ীভাবে ডিলিট করার অধিকার রাখে।
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support Footer Box */}
        <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <span>কোনো আইনি বা সেবা সংক্রান্ত প্রশ্ন রয়েছে?</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              শর্তাবলী বা অন্যান্য তথ্যের জন্য আমাদের লিগ্যাল সাপোর্ট টিমের
              ইমেইলে নক দিন।
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

export default TermsAndServices;
