"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaPaperPlane,
  FaSparkles,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaClock,
  FaCircleCheck,
  FaUser,
  FaMessage,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Message submit handler logic here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      subtitle: "ইমেইল করুন",
      details: "support@learnora.com",
      subDetails: "info@learnora.com",
      accent: "from-blue-600/20 to-indigo-600/20",
      iconColor: "text-blue-400",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      subtitle: "ফোন করুন",
      details: "+880 1700-000000",
      subDetails: "+880 1800-000000",
      accent: "from-indigo-600/20 to-violet-600/20",
      iconColor: "text-indigo-400",
    },
    {
      icon: FaLocationDot,
      title: "Location",
      subtitle: "আমাদের ঠিকানা",
      details: "Dhaka, Bangladesh",
      subDetails: "Level 5, Education Tower, Dhanmondi",
      accent: "from-violet-600/20 to-purple-600/20",
      iconColor: "text-violet-400",
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://facebook.com",
      label: "Facebook",
      color: "hover:text-blue-500 hover:border-blue-500/50",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "hover:text-sky-400 hover:border-sky-400/50",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com",
      label: "Instagram",
      color: "hover:text-pink-500 hover:border-pink-500/50",
    },
    {
      icon: FaLinkedinIn,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-blue-400 hover:border-blue-400/50",
    },
    {
      icon: FaYoutube,
      href: "https://youtube.com",
      label: "YouTube",
      color: "hover:text-red-500 hover:border-red-500/50",
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen relative overflow-hidden">
      {/* Background Decorative Gradient Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
            <RiSparkling2Line className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>Contact & Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            যোগাযোগ করুন{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Learnora-এর সাথে
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            কোর্স, বই অর্ডার বা যেকোনো প্রয়োজনে আমাদের মেসেজ দিন। আমাদের
            কাস্টমার সাপোর্ট টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
          </p>
        </div>

        {/* INFO CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-300 space-y-4 backdrop-blur-sm group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${info.accent} border border-slate-700/50 flex items-center justify-center text-xl ${info.iconColor} group-hover:scale-110 transition-transform`}
                >
                  <Icon />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{info.title}</h3>
                  <span className="text-xs font-semibold text-blue-400">
                    {info.subtitle}
                  </span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-slate-300 pt-1">
                  <p className="font-semibold">{info.details}</p>
                  <p className="text-slate-400 text-xs">{info.subDetails}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FORM AND SOCIAL SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: CONTACT FORM */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-10 bg-slate-900/50 border border-slate-800 shadow-2xl backdrop-blur-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                মেসেজ পাঠান (Send a Message)
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                নিচের ফর্মটি পূরণ করে আপনার প্রশ্ন বা মতামত জানান।
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-in fade-in duration-200">
                <FaCircleCheck className="w-6 h-6 shrink-0" />
                <div>
                  <p className="font-bold text-sm">
                    মেসেজ সফলভাবে পাঠানো হয়েছে!
                  </p>
                  <p className="text-xs text-emerald-300/80">
                    ধন্যবাদ, আমরা খুব শীঘ্রই আপনার সাথে ইমেইলে যোগাযোগ করব।
                  </p>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Your Name (আপনার নাম)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanjim Ahsan"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    />
                    <FaUser className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Email Address (ইমেইল)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    />
                    <FaEnvelope className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Subject (বিষয়)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Course Query / Book Order Problem"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Message (মেসেজ)
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    required
                    placeholder="আপনার মেসেজটি এখানে লিখুন..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all resize-none"
                  ></textarea>
                  <FaMessage className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-4" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Send Message</span>
                <FaPaperPlane className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* RIGHT: HOURS, MAP PLACEHOLDER & SOCIALS */}
          <div className="lg:col-span-5 space-y-8">
            {/* Support Hours Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-4">
              <div className="flex items-center gap-3 text-blue-400">
                <FaClock className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Support Hours</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                আমাদের সাপোর্ট টিম সপ্তাহের ৭ দিনই আপনার সহায়তায় প্রস্তুত।
              </p>
              <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Saturday - Thursday:</span>
                  <span className="font-semibold text-white">
                    9:00 AM - 10:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Friday:</span>
                  <span className="font-semibold text-blue-400">
                    2:00 PM - 10:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-4">
              <h3 className="text-lg font-bold text-white">
                Follow Us (সোশ্যাল মিডিয়া)
              </h3>
              <p className="text-xs text-slate-400">
                আমাদের সোশ্যাল মিডিয়া পেজগুলোতে যুক্ত হয়ে প্রতিনিয়ত আপডেট ও ফ্রি
                ক্লাস নোটস পান।
              </p>
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={`w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 ${item.color} transition-all duration-200`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
