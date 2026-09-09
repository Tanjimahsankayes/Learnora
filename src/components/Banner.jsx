"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBookOpen,
  FaSparkles,
  FaPlay,
  FaArrowRight,
  FaGraduationCap,
  FaUserGroup,
  FaStar,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // স্লাইডারের ডেটা (ইমেজ ও ক্যাপশন)
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      title: "Interactive Live Classes",
      tag: "Live Interactive",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
      title: "Comprehensive Study Books",
      tag: "Best Sellers",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      title: "Expert High School Mentors",
      tag: "Top Educators",
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-800/80">
      {/* Background Glowing Gradients (Navbar & Footer theme) */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
              <RiSparkling2Line className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>Learnora Education Marketplace</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Empower Your Future with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                Smart Digital Learning
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Access top-rated high school courses, curriculum-aligned academic
              books, and free interactive live sessions from Bangladesh’s
              leading educators all in one place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              {/* Button 1: Explore Courses */}
              <Link
                href="/courses"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center gap-2 group"
              >
                <FaGraduationCap className="w-4 h-4" />
                <span>Explore Courses</span>
                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Button 2: Browse Books */}
              <Link
                href="/books"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center gap-2"
              >
                <FaBookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Browse Books</span>
              </Link>

              {/* Button 3: Watch Free Class */}
              <Link
                href="/free-classes"
                className="px-6 py-3.5 bg-slate-900/50 hover:bg-slate-900 text-blue-400 hover:text-blue-300 font-semibold text-sm rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <FaPlay className="w-2.5 h-2.5 translate-x-0.5" />
                </div>
                <span>Watch Free Class</span>
              </Link>
            </div>

            {/* Trust Metrics / Social Proof */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-slate-400 text-xs font-medium">
              <div className="flex items-center gap-2">
                <FaUserGroup className="w-4 h-4 text-blue-400" />
                <span>
                  <strong className="text-white">10,000+</strong> Active
                  Students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="w-4 h-4 text-amber-400" />
                <span>
                  <strong className="text-white">4.9/5</strong> Rating (2.5k
                  reviews)
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SLIDER COLUMN */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Gradient Border Container */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-b from-blue-500/30 via-slate-800 to-slate-900 border border-slate-800 shadow-2xl backdrop-blur-md">
                {/* Image Slider Wrapper */}
                <div className="relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden bg-slate-900">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
                      }`}
                    >
                      {/* Dark overlay for contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10"></div>

                      {/* Image */}
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />

                      {/* Floating Slide Information */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                          {slide.tag}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Indicator Dots */}
                <div className="flex items-center justify-center gap-2 pt-3 pb-1">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-blue-500"
                          : "w-2 bg-slate-700 hover:bg-slate-600"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Floating Decorative Badge */}
              <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md z-30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                  <FaBookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">500+ Books</p>
                  <p className="text-[10px] text-slate-400">
                    Available in store
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
