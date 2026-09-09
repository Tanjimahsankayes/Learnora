"use client";

import Link from "next/link";
import {
  FaBookOpen,
  FaSparkles,
  FaGraduationCap,
  FaUsers,
  FaBullseye,
  FaHeart,
  FaCircleCheck,
  FaCreditCard,
  FaClockRotateLeft,
  FaBrain,
  FaTruckFast,
  FaArrowRight,
  FaShieldHalved,
  FaLightbulb,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";

export default function AboutPage() {
  const platformFeatures = [
    {
      icon: FaGraduationCap,
      title: "Skilled & Verified Teachers",
      description:
        "দেশসেরা ও অভিজ্ঞ শিক্ষকদের দ্বারা প্রণীত মানসম্মত কোর্স ও সরাসরি লাইভ ক্লাসের সুবিধা।",
    },
    {
      icon: FaBookOpen,
      title: "Digital & Physical Books",
      description:
        "অনলাইনে ই-বুক পড়ার সুবিধা এবং ঘরে বসে সরাসরি পছন্দের একাডেমিক বই অর্ডার করার সুযোগ।",
    },
    {
      icon: FaBrain,
      title: "Interactive Quizzes & Tests",
      description:
        "প্রতিটি অধ্যায় শেষে কুইজ ও প্র্যাকটিস টেস্টের মাধ্যমে নিজের প্রস্তুতি যাচাই করার চমৎকার সুযোগ।",
    },
    {
      icon: FaCreditCard,
      title: "Secure Stripe Payment",
      description:
        "বিশ্বমানের Stripe পেমেন্ট গেটওয়ের মাধ্যমে সম্পূর্ণ নিরাপদ ও সহজ পেমেন্ট প্রসেসিং।",
    },
    {
      icon: FaClockRotateLeft,
      title: "Free Classes & Preview",
      description:
        "যেকোনো কোর্সে এনরোল করার আগেই ফ্রি ক্লাস দেখে শিক্ষকের পড়ানোর ধরণ যাচাই করার সুযোগ।",
    },
    {
      icon: FaTruckFast,
      title: "Fast Book Delivery",
      description:
        "অর্ডার করা বই দ্রুততম সময়ে শিক্ষার্থীদের দোরগোড়ায় পৌঁছে দেওয়ার নির্ভরযোগ্য ট্র্যাকিং সিস্টেম।",
    },
  ];

  const targetAudience = [
    {
      title: "High School Students",
      desc: "এসএসসি ও নবম-দশম শ্রেণীর শিক্ষার্থীবৃন্দ যারা সাশ্রয়ী খরচে সেরা প্রস্তুতি নিতে চায়।",
    },
    {
      title: "Skill Seekers",
      desc: "যেসব শিক্ষার্থী একাডেমিক পড়ার পাশাপাশি নতুন ডিজিটাল স্কিল বা জ্ঞান অর্জন করতে আগ্রহী।",
    },
    {
      title: "Passionate Educators",
      desc: "অভিজ্ঞ শিক্ষকগণ যারা তাদের জ্ঞান ডিজিটাল প্ল্যাটফর্মে ছড়িয়ে দিয়ে আয় করতে চান।",
    },
    {
      title: "Book Sellers & Publishers",
      desc: "বই বিক্রেতা ও প্রকাশনী যারা সরাসরি শিক্ষার্থীদের কাছে তাদের বই পৌঁছাতে চান।",
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen relative overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md mb-6">
            <RiSparkling2Line className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>About Learnora</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Reinventing Learning for High School Students Through{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Affordable Education
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            Learnora হলো একটি আধুনিক ডিজিটাল লার্নিং ও এডুকেশনাল মার্কেটপ্লেস,
            যার মূল লক্ষ্য হলো হাইস্কুল শিক্ষার্থীদের জন্য সেরা শিক্ষকদের কোর্স,
            বই এবং শিক্ষণীয় রিসোর্স সাশ্রয়ী খরচে এক প্ল্যাটফর্মে পৌঁছে দেওয়া।
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                100%
              </h3>
              <p className="text-xs text-slate-400 mt-1">Quality Guaranteed</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-400">
                Affordable
              </h3>
              <p className="text-xs text-slate-400 mt-1">Low Cost Learning</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                24/7
              </h3>
              <p className="text-xs text-slate-400 mt-1">Online Access</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-2xl sm:text-3xl font-bold text-emerald-400">
                Secure
              </h3>
              <p className="text-xs text-slate-400 mt-1">Stripe Checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY LEARNORA WAS CREATED (কেন তৈরি করা হয়েছে) */}
      <section className="py-16 lg:py-24 border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FaLightbulb className="w-3 h-3 text-amber-300" />
                <span>Our Mission & Origin</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                কেন তৈরি করা হয়েছে{" "}
                <span className="text-blue-500">Learnora</span>?
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                আমাদের দেশের বহু মেধাবী শিক্ষার্থী শুধুমাত্র সঠিক দিকনির্দেশনা
                এবং অতিরিক্ত খরচের কারণে মানসম্মত শিক্ষা লাভ থেকে বঞ্চিত হয়।
                প্রাইভেট টিউটরিং বা কোচিং সেন্টারের ব্যয়ভার বহন করা অনেক
                পরিবারের জন্যই বেশ কষ্টসাধ্য।
              </p>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                এই সমস্যার সমাধানের লক্ষ্যেই **Learnora**-এর জন্ম। আমরা এমন একটি
                ডিজিটাল বাস্তুসংস্থান (Ecosystem) তৈরি করেছি যেখানে কম খরচে
                দেশসেরা দক্ষ শিক্ষকদের গাইডলাইন, ফ্রি ক্লাস, লাইভ কুইজ এবং
                প্রয়োজনীয় বই এক জায়গায় পাওয়া যায়।
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <FaCircleCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">
                    শিক্ষাকে সবার জন্য সহজলভ্য ও সাশ্রয়ী করা।
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCircleCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">
                    শিক্ষক ও শিক্ষার্থীদের মধ্যে সরাসরি ডিজিটাল মেলবন্ধন।
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCircleCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">
                    বই কেনা ও ডিজিটাল পড়ার মাধ্যমকে সহজতর করা।
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Card / Illustration Box */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-blue-900/30 via-slate-900 to-slate-950 border border-blue-500/20 shadow-2xl backdrop-blur-md space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl">
                  <FaBullseye />
                </div>
                <h3 className="text-xl font-bold text-white">
                  আমাদের মূল ভিশন (Our Vision)
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  আমরা বিশ্বাস করি শিক্ষা কোনো ব্যবসা নয়, বরং অধিকার। প্রথাগত
                  শিক্ষাব্যবস্থার গণ্ডি পেরিয়ে ডিজিটাল প্রযুক্তির সাহায্যে
                  প্রতিটি শিক্ষার্থীর হাতের মুঠোয় মানসম্মত শিক্ষা পৌঁছে দেওয়ার
                  লক্ষ্যেই আমরা অবিরাম কাজ করে যাচ্ছি।
                </p>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <FaShieldHalved />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      100% Reliable & Transparent
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Trusted learning environment for teenagers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR? (কার জন্য এটি তৈরি) */}
      <section className="py-16 lg:py-24 border-b border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-3">
              <FaUsers className="w-3 h-3" />
              <span>Target Audience</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              কার জন্য এই <span className="text-blue-500">Learnora</span>?
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              আমাদের প্ল্যাটফর্মটি মূলত শিক্ষার্থী, শিক্ষক এবং বই বিক্রেতাদের
              সুবিধা বিবেচনা করে ডিজাইন করা হয়েছে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES & ADVANTAGES (কী সুবিধা) */}
      <section className="py-16 lg:py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <RiSparkling2Line className="w-3 h-3" />
              <span>Core Features</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Learnora-এর বিশেষ{" "}
              <span className="text-blue-500">সুবিধাসমূহ</span>
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              যা আমাদের অন্যান্য গতানুগতিক লার্নিং প্ল্যাটফর্ম থেকে আলাদা ও
              অনন্য করে তোলে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-300 space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-violet-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl group-hover:rotate-6 transition-transform">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION (CTA) */}
      <section className="py-16 lg:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/30 shadow-2xl backdrop-blur-md space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              আজই শুরু হোক আপনার নতুন শিক্ষাসফর!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              কম খরচে মানসম্মত কোর্স, ফ্রি ক্লাস এবং একাডেমিক বইয়ের এক বিশাল
              ভাণ্ডার অপেক্ষা করছে আপনার জন্য।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/courses"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Explore Courses</span>
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/free-classes"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-2xl border border-slate-700 transition-all duration-200"
              >
                Watch Free Classes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
