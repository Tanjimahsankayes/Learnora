"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaCircleQuestion,
  FaChevronDown,
  FaSparkles,
  FaGraduationCap,
  FaTruckFast,
  FaShieldHalved,
  FaBrain,
  FaArrowRight,
  FaEnvelope,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";

export default function FAQPage() {
  // সক্রিয় প্রশ্ন ট্র্যাক করার জন্য স্টেট
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "Courses & Access",
      icon: FaGraduationCap,
      question: "Course কীভাবে কিনব? (How to buy a course?)",
      answer:
        "খুবই সহজ! প্রথমে Learnora-এ একাউন্ট তৈরি করুন। এরপর আপনার পছন্দের কোর্সের পেজে গিয়ে 'Enroll Now' বাটনে ক্লিক করুন। বিশ্বমানের আন্তর্জাতিক Stripe পেমেন্ট গেটওয়ের মাধ্যমে আপনার ক্রেডিট/ডেবিট কার্ড দিয়ে কয়েক সেকেন্ডেই পেমেন্ট সম্পন্ন করতে পারবেন। পেমেন্ট সম্পন্ন হলেই ড্যাশবোর্ডে কোর্সটি চালু হয়ে যাবে।",
    },
    {
      category: "Courses & Access",
      icon: FaGraduationCap,
      question:
        "Video কতদিন access করা যাবে? (How long will I have video access?)",
      answer:
        "একবার কোনো কোর্সে এনরোল করলে আপনি সেই কোর্সের ভিডিও এবং স্টাডি মেটেরিয়ালস **লাইফটাইম (Lifetime Access)** ব্যবহার করতে পারবেন। আপনি যেকোনো সময়, যেকোনো ডিভাইস থেকে যতবার খুশি ভিডিওগুলো দেখতে পারবেন।",
    },
    {
      category: "Book Store & Delivery",
      icon: FaTruckFast,
      question:
        "Book delivery কতদিনের মধ্যে পাব? (How long does book delivery take?)",
      answer:
        "অর্ডার করার পর ঢাকা সিটির ভেতরে **২ থেকে ৩ কার্যদিবসের** মধ্যে এবং ঢাকার বাইরে যেকোনো জেলায় **৩ থেকে ৫ কার্যদিবসের** মধ্যে হোম ডেলিভারি পেয়ে যাবেন। অর্ডার কনফার্মেশনের পর আপনাকে ট্র্যাকিং আইডি দেওয়া হবে যাতে সহজেই রাইডারের লাইভ আপডেট জানতে পারেন।",
    },
    {
      category: "Payment & Refund",
      icon: FaShieldHalved,
      question: "Refund policy কী? (What is the refund policy?)",
      answer:
        "আমরা গ্রাহক সন্তুষ্টিকে সর্বোচ্চ প্রাধান্য দিই। কোর্স কেনার **৭ দিনের মধ্যে** যদি আপনার কোনো কারণে কোর্সটি উপযুক্ত মনে না হয়, তবে আমাদের সাপোর্ট সেন্টারে যোগাযোগ করে শতভাগ রিফান্ড রিকোয়েস্ট করতে পারবেন। (শর্ত থাকে যে মোট ভিডিওর ১০%-এর বেশি দেখা হওয়া যাবে না)।",
    },
    {
      category: "Exams & Evaluation",
      icon: FaBrain,
      question: "Quiz কীভাবে কাজ করে? (How do quizzes work?)",
      answer:
        "প্রতিটি অধ্যায়ের টিউটোরিয়াল শেষে একটি করে অনলাইন কুইজ সেকশন থাকবে। অটোমেটেড কুইজ ইন্টারফেসে আপনি এমসিকিউ (MCQ) প্রশ্নের উত্তর দিতে পারবেন এবং সাবমিট করার সাথে সাথেই সঠিক উত্তর ও আপনার অর্জিত স্কোর দেখতে পাবেন। আপনার সামগ্রিক কুইজ স্কোর 'Progress Tracking' ড্যাশবোর্ডে সংরক্ষিত থাকবে।",
    },
    {
      category: "General Support",
      icon: FaCircleQuestion,
      question: "অভিভাবকরা কি শিক্ষার্থীর অগ্রগতি পর্যবেক্ষণ করতে পারবেন?",
      answer:
        "হ্যাঁ, নিশ্চয়ই! প্রতিটি শিক্ষার্থীর ড্যাশবোর্ডে একটি নির্দিষ্ট 'Parental Overview' ট্র্যাকিং লিংক থাকে। এর মাধ্যমে অভিভাবকরা শিক্ষার্থীর উপস্থিতি, সম্পন্ন করা ক্লাস সংখ্যা এবং কুইজ পরীক্ষার রেজাল্ট কার্ড এক নজরে দেখতে পারবেন।",
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen relative overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
            <RiSparkling2Line className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>Help Center & FAQ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            সাধারণ কিছু{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              প্রশ্ন ও উত্তর
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            শিক্ষার্থী ও অভিভাবকদের বহুল জিজ্ঞাসিত প্রশ্নগুলোর উত্তর এক জায়গায়
            সহজে খুঁজে নিন।
          </p>
        </div>

        {/* ACCORDION FAQ LIST */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-slate-900/90 border-blue-500/40 shadow-xl shadow-blue-500/5"
                    : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                {/* Question Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 transition-colors ${
                        isOpen
                          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                          : "bg-slate-800 text-slate-400 border border-slate-700/50"
                      }`}
                    >
                      <Icon />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-blue-600 text-white" : ""
                    }`}
                  >
                    <FaChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4 animate-in fade-in duration-200">
                    <p className="pl-0 sm:pl-[54px]">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* STILL HAVE QUESTIONS BANNER */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-slate-900 border border-blue-500/20 text-center space-y-4 backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl mx-auto">
            <FaEnvelope />
          </div>

          <h3 className="text-xl font-bold text-white">
            আরও কোনো প্রশ্ন বা সাহায্যের প্রয়োজন?
          </h3>

          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            আমাদের সাপোর্ট টিম সব সময় আপনাকে সাহায্য করতে প্রস্তুত। আমাদের সাথে
            সরাসরি যোগাযোগ করুন।
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Contact Support</span>
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
