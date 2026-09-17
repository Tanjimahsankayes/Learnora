"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import {
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardUser,
  FaStore,
  FaUserShield,
  FaGraduationCap,
  FaBook,
  FaCartShopping,
  FaChartLine,
  FaVideo,
  FaUsers,
  FaGear,
  FaRightFromBracket,
  FaBars,
  FaXmark,
  FaBell,
  FaHouse,
  FaBookmark,
  FaUserTag,
  FaUserSecret,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { CircleDollarSign } from "lucide-react";
import { IoCreateSharp } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role; // Default fallback role
  // const role = session?.user?.role || "book-seller";
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ৪টি রোলের জন্য পৃথক নেভিগেশন লিংক
  const menuConfig = {
    student: [
      {
        name: "My Profile",
        href: "/dashboard/student",
        icon: FaUserGraduate,
      },
      {
        name: "My Enrolled Courses",
        href: "/dashboard/student/courses",
        icon: FaGraduationCap,
      },
      {
        name: "My Ordered Books",
        href: "/dashboard/student/books",
        icon: FaBook,
      },
      {
        name: "Quiz & Performance",
        href: "/dashboard/student/analytics",
        icon: FaChartLine,
      },
      { name: "Settings", href: "/dashboard/settings", icon: FaGear },
    ],
    teacher: [
      {
        name: "Profile",
        href: "/dashboard/teacher",
        icon: FaUserSecret,
      },
      {
        name: "Create New Course",
        href: "/dashboard/teacher/create-course",
        icon: IoCreateSharp,
      },
      {
        name: "Course Management",
        href: "/dashboard/teacher/courses",
        icon: FaGraduationCap,
      },
      { name: "Live Sessions", href: "/dashboard/teacher/live", icon: FaVideo },
      { name: "Quizzes", href: "/dashboard/teacher/quiz", icon: MdOutlineQuiz },
      {
        name: "Student Progress",
        href: "/dashboard/teacher/progress",
        icon: FaUsers,
      },
      { name: "Settings", href: "/dashboard/settings", icon: FaGear },
    ],
    "book_seller": [
      {
        name: "My Profile",
        href: "/dashboard/book-seller",
        icon: FaUserTag,
      },
      {
        name: "Add New Book",
        href: "/dashboard/book-seller/books",
        icon: IoIosAdd,
      },
      {
        name: "Book Store Inventory",
        href: "/dashboard/book-seller/mybooks",
        icon: FaBook,
      },
      {
        name: "Order Management",
        href: "/dashboard/book-seller/orders",
        icon: FaCartShopping,
      },
      {
        name: "Sales Analytics",
        href: "/dashboard/book-seller/analytics",
        icon: FaChartLine,
      },
      { name: "Settings", href: "/dashboard/settings", icon: FaGear },
    ],
    admin: [
      {
        name: "Profile",
        href: "/dashboard/admin",
        icon: FaUserShield,
      },
      {
        name: "Overview & Stats",
        href: "/dashboard/admin/overview",
        icon: FaChartLine,
      },
      { name: "Manage Users", href: "/dashboard/admin/users", icon: FaUsers },
      {
        name: "Course Approvals",
        href: "/dashboard/admin/courses",
        icon: FaGraduationCap,
      },
      {
        name: "Book Store Approvals",
        href: "/dashboard/admin/books",
        icon: FaBook,
      },
      { name: "Revenue", href: "/dashboard/settings", icon: CircleDollarSign },
      { name: "Settings", href: "/dashboard/settings", icon: FaGear },
    ],
  };

  // রোল অনুযায়ী ব্যাজ এবং আইকন কনফিগারেশন
  const roleBadges = {
    student: {
      title: "Student Dashboard",
      icon: FaUserGraduate,
      badge: "Student",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    teacher: {
      title: "Instructor Hub",
      icon: FaChalkboardUser,
      badge: "Teacher",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    "book_seller": {
      title: "Seller Portal",
      icon: FaStore,
      badge: "Book Seller",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    admin: {
      title: "Admin Control",
      icon: FaUserShield,
      badge: "Admin",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  };

  const currentRoleInfo = roleBadges[role] || roleBadges.student;
  const navItems = menuConfig[role] || menuConfig.student;
  const RoleIcon = currentRoleInfo.icon;

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold">Loading Learnora Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background Decorative Gradient Blurs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white">
            <FaBookOpen className="w-4 h-4" />
          </div>
          <span className="font-black text-lg text-white">Learnora</span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl border border-slate-700"
        >
          {isSidebarOpen ? (
            <FaXmark className="w-5 h-5" />
          ) : (
            <FaBars className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-900/60 border-r border-slate-800/80 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo Brand Header */}
          <Link href="/" className="hidden lg:flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                <FaBookOpen className="w-5 h-5 text-white" />
                <RiSparkling2Line className="w-2 h-2 text-amber-300 absolute top-1 right-1 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tight text-white font-sans">
                Learn<span className="text-blue-500">ora</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase -mt-1">
                Dashboard
              </span>
            </div>
          </Link>

          {/* User Role Card */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${currentRoleInfo.color}`}
            >
              <RoleIcon className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider mb-0.5 ${currentRoleInfo.color}`}
              >
                {currentRoleInfo.badge}
              </span>
              <h4 className="text-xs font-bold text-white truncate">
                {session?.user?.name || "Learnora User"}
              </h4>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 pt-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 pb-1">
              Main Menu
            </p>
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-500/50"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            <FaHouse className="w-4 h-4 text-slate-400" />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all border border-transparent hover:border-rose-500/20"
          >
            <FaRightFromBracket className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <header className="hidden lg:flex items-center justify-between h-20 px-8 bg-slate-900/30 border-b border-slate-800/80 backdrop-blur-md">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              {currentRoleInfo.title}
            </h1>
            <p className="text-xs text-slate-400">
              স্বাগতম, {session?.user?.name || "User"}! আপনার ড্যাশবোর্ডে এক
              নজরে সব আপডেট দেখুন।
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all relative">
              <FaBell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-2.5 right-2.5 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-2.5 right-2.5"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-800"></div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-slate-700 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {session?.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
