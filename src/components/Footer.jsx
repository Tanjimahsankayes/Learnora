"use client";

import Link from "next/link";
import {
  FaBookOpen,
  FaPaperPlane,
  FaPhone,
  FaLocationDot,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaArrowRight,
  FaShieldHalved,
  FaHeart,
  FaEnvelope,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Browse Courses", href: "/courses" },
    { name: "Bookstore", href: "/books" },
    { name: "Free Classes", href: "/free-classes" },
    { name: "Contact Us", href: "/contact" },
  ];

  const partnerLinks = [
    { name: "Become a Teacher", href: "/teacher/register" },
    { name: "Become a Book Seller", href: "/seller/register" },
    { name: "Affiliate Program", href: "/affiliate" },
    { name: "Community Guidelines", href: "/community" },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Support Center", href: "/support" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP SECTION: Newsletter */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
                <RiSparkling2Line className="w-3 h-3" /> Stay Updated
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Subscribe to Learnora Newsletter
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Get exclusive course discounts, free High School learning
                resources, and book updates directly to your inbox.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px] sm:min-w-[420px]"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3.5 text-sm bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  required
                />
                <FaEnvelope className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Subscribe</span>
                <FaPaperPlane className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE SECTION: Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                  <FaBookOpen className="w-5 h-5 text-white" />
                  <RiSparkling2Line className="w-2.5 h-2.5 text-amber-300 absolute top-1.5 right-1.5" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black tracking-tight text-white">
                    Learn<span className="text-blue-500">ora</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase -mt-0.5">
                  Digital Edu Marketplace
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed pr-4 max-w-md">
              Learnora is a modern digital learning marketplace tailored for
              high school students. Discover top courses, interactive live
              classes, and educational books from expert teachers.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-3">
                <FaLocationDot className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>support@learnora.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-400 flex items-center justify-center text-slate-400 transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <FaArrowRight className="w-2.5 h-2.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Join Us Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Join Us
            </h4>
            <ul className="space-y-2.5 text-sm">
              {partnerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <FaArrowRight className="w-2.5 h-2.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Legal & Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <FaArrowRight className="w-2.5 h-2.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>
              &copy; {currentYear} Learnora Inc. All rights reserved. Built with
            </span>
            <FaHeart className="w-3 h-3 text-rose-500 inline mx-0.5" />
            <span>for students.</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <FaShieldHalved className="w-3.5 h-3.5 text-emerald-500" />
              <span>Stripe Secured Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
