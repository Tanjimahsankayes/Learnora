"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBookOpen,
  FaCartShopping,
  FaMagnifyingGlass,
  FaBars,
  FaXmark,
  FaBell,
  FaUser,
  FaRightFromBracket,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Better Auth session থেকে login status
  const isLoggedIn = !!user;


  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const pathname = usePathname();

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search & profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dashboardPath = {
    student: "/dashboard/student",
    teacher: "/dashboard/teacher",
    admin: "/dashboard/admin",
    "book-seller": "/dashboard/book-seller",
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Books", href: "/books" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    ...(isLoggedIn && dashboardPath[user?.role]
      ? [
          {
            name: "Dashboard",
            href: dashboardPath[user.role],
          },
        ]
      : []),
  ];

  console.log("User:", user);
  console.log("Role:", user?.role);
  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      await signOut();

      setIsProfileDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800/80 py-3"
          : "bg-slate-950 py-4 border-b border-slate-800/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 relative">
          {/* LOGO SECTION */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Animated Glowing Icon Container */}
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 group-hover:scale-105 transition duration-300"></div>

                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:rotate-3">
                  <FaBookOpen className="w-5 h-5 text-white" />

                  <RiSparkling2Line className="w-2.5 h-2.5 text-amber-300 absolute top-1.5 right-1.5 animate-pulse" />
                </div>
              </div>

              {/* Logo Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black tracking-tight text-white font-sans">
                    Learn<span className="text-blue-500">ora</span>
                  </span>

                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                </div>

                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase -mt-0.5 group-hover:text-blue-400 transition-colors">
                  Digital Edu Marketplace
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center text-center justify-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                        : "text-slate-300 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* EXPANDABLE SEARCH BAR */}
            <div ref={searchRef} className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="relative w-64 sm:w-50 md:w-56">
                    <input
                      type="text"
                      placeholder="Search courses, books, teachers..."
                      autoFocus
                      className="w-full pl-10 pr-10 py-2 text-sm bg-slate-900 border border-blue-500/40 rounded-full text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-sm"
                    />

                    <FaMagnifyingGlass className="w-3.5 h-3.5 text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                    >
                      <FaXmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 text-slate-300 hover:text-blue-400 hover:bg-slate-900 rounded-full transition-all duration-200 border border-transparent hover:border-slate-800"
                  aria-label="Open Search"
                >
                  <FaMagnifyingGlass className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* ================= CONDITIONALLY RENDERED ICONS ================= */}
            {isLoggedIn && (
              <>
                {/* Cart Icon */}
                <Link
                  href="/cart"
                  className="relative p-2.5 text-slate-300 hover:text-blue-400 hover:bg-slate-900 rounded-full transition-all duration-200 border border-transparent hover:border-slate-800"
                  aria-label="Cart"
                >
                  <FaCartShopping className="w-4 h-4" />

                  <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-slate-950">
                    2
                  </span>
                </Link>

                {/* Notifications Icon */}
                <button
                  className="relative p-2.5 text-slate-300 hover:text-blue-400 hover:bg-slate-900 rounded-full transition-all duration-200 border border-transparent hover:border-slate-800 hidden sm:block"
                  aria-label="Notifications"
                >
                  <FaBell className="w-4 h-4" />

                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-950"></span>
                </button>

                {/* Divider */}
                <div className="h-6 w-[1px] bg-slate-800 mx-1 hidden sm:block"></div>
              </>
            )}

            {/* AUTHENTICATION BUTTONS / PROFILE DROPDOWN */}
            {isLoggedIn ? (
              /* Logged In User Avatar Dropdown */
              <div ref={profileRef} className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-900 transition-colors border border-slate-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    ST
                  </div>
                </button>

                {/* Profile Menu Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <Link
                      href={dashboardPath[user?.role] || "/dashboard/student"}
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      <FaUser className="w-3.5 h-3.5 text-blue-400" />
                      My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 text-left"
                    >
                      <FaRightFromBracket className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest User Auth Buttons */
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Log in
                </Link>

                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <FaXmark className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-slate-950 border-b border-slate-800 shadow-2xl p-4 transition-all animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                  pathname === link.href
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Auth Actions */}
          <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800"
                >
                  Log in
                </Link>

                <Link
                  href="/auth/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-colors"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 text-center font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-colors border border-rose-500/20"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
