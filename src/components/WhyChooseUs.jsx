"use client";

import Link from "next/link";
import {
  FaUserGraduate,
  FaSitemap,
  FaBrain,
  FaChartLine,
  FaBookOpen,
  FaShieldHalved,
  FaSparkles,
  FaArrowRight,
  FaCircleCheck,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";

export default function WhyChooseUs() {
  const features = [
    {
      icon: FaUserGraduate,
      title: "Expert Teachers",
      subtitle: "দক্ষ ও অভিজ্ঞ শিক্ষকবৃন্দ",
      description:
        "দেশসেরা ও অভিজ্ঞ শিক্ষকদের দিকনির্দেশনায় তৈরি সহজবোধ্য ক্লাস ও গাইডলাইন।",
      badge: "Top Mentors",
      accent: "from-blue-600/20 to-indigo-600/20",
      iconColor: "text-blue-400",
      borderColor: "hover:border-blue-500/40",
    },
    {
      icon: FaSitemap,
      title: "Structured Courses",
      subtitle: "সুবিন্যস্ত ও গোছানো কোর্স",
      description:
        "হাইস্কুল কারিকুলাম অনুযায়ী অধ্যায়ভিত্তিক সাজানো টিউটোরিয়াল ও লাইভ সেশন।",
      badge: "Curriculum Aligned",
      accent: "from-indigo-600/20 to-violet-600/20",
      iconColor: "text-indigo-400",
      borderColor: "hover:border-indigo-500/40",
    },
    {
      icon: FaBrain,
      title: "Practice Quizzes",
      subtitle: "ইন্টারেক্টিভ কুইজ ও টেস্ট",
      description:
        "প্রতিটি অধ্যায় শেষে কুইজ ও প্র্যাকটিস সেটের মাধ্যমে প্রস্তুতি যাচাই করার সুযোগ।",
      badge: "Interactive",
      accent: "from-violet-600/20 to-purple-600/20",
      iconColor: "text-violet-400",
      borderColor: "hover:border-violet-500/40",
    },
    {
      icon: FaChartLine,
      title: "Progress Tracking",
      subtitle: "রিয়েল-টাইম অগ্রগতি পর্যবেক্ষণ",
      description:
        "আপনার পড়ালেখার অগ্রগতি, কুইজ স্কোর ও পারফরম্যান্স অ্যানালিটিক্স ড্যাশবোর্ড।",
      badge: "Analytics",
      accent: "from-sky-600/20 to-blue-600/20",
      iconColor: "text-sky-400",
      borderColor: "hover:border-sky-500/40",
    },
    {
      icon: FaBookOpen,
      title: "Educational Books",
      subtitle: "ডিজিটাল ও প্রিন্টেড বই",
      description:
        "অনলাইনে ই-বুক পড়ার সুবিধা এবং ঘরে বসেই প্রয়োজনীয় একাডেমিক বই ডেলিভারির সুবিধা।",
      badge: "Store & E-Book",
      accent: "from-amber-600/20 to-orange-600/20",
      iconColor: "text-amber-400",
      borderColor: "hover:border-amber-500/40",
    },
    {
      icon: FaShieldHalved,
      title: "Secure Payment",
      subtitle: "নিরাপদ ও সহজ পেমেন্ট",
      description:
        "Stripe পেমেন্ট গেটওয়ের মাধ্যমে সম্পূর্ণ নিরাপদ লেনদেন এবং তাৎক্ষণিক কোর্স অ্যাক্সেস।",
      badge: "Stripe Checkout",
      accent: "from-emerald-600/20 to-teal-600/20",
      iconColor: "text-emerald-400",
      borderColor: "hover:border-emerald-500/40",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-950 text-slate-200 border-b border-slate-800/80 relative overflow-hidden">
      {/* Background Decorative Gradient Blurs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
            <RiSparkling2Line className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>Why Choose Learnora</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            কেন বেছে নেবেন{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Learnora Platform
            </span>
            ?
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            আমরা শিক্ষার্থীদের জন্য এমন একটি পরিবেশ তৈরি করেছি যেখানে পড়ালেখা
            হবে সহজ, আনন্দদায়ক এবং পকেট-বান্ধব।
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`relative rounded-3xl p-6 sm:p-8 bg-slate-900/50 border border-slate-800/90 ${item.borderColor} hover:bg-slate-900/80 transition-all duration-300 backdrop-blur-sm group flex flex-col justify-between space-y-6`}
              >
                {/* Top Row: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.accent} border border-slate-700/50 flex items-center justify-center text-2xl ${item.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <Icon />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-semibold text-blue-400/90 mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Highlight Line */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                  <FaCircleCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>100% Student Friendly Environment</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM BANNER / ACTION */}
        <div className="mt-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-slate-900 border border-blue-500/20 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              আজই আপনার পড়াশোনার যাত্রা শুরু করুন!
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              ফ্রি ক্লাসে যুক্ত হয়ে যাচাই করুন আমাদের মান।
            </p>
          </div>

          <Link
            href="/free-classes"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center gap-2 shrink-0 group"
          >
            <span>Watch Free Class</span>
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
