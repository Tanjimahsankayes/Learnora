"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardUser,
  FaStore,
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";


export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // User Roles Definition
  const roles = [
    {
      id: "student",
      title: "Student",
      subtitle: "শিক্ষার্থী",
      icon: FaUserGraduate,
      description: "কোর্স ও বই কিনুন, ক্লাসে যোগ দিন",
    },
    {
      id: "book_seller",
      title: "Book Seller",
      subtitle: "বই বিক্রেতা",
      icon: FaStore,
      description: "বই স্টোর ও অর্ডার হ্যান্ডেল করুন",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match!");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: selectedRole,
      });

      if (authError) {
        throw new Error(authError.message || "Failed to create account");
      }

      toast.success("Learnora account created successfully!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Gradient Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-xl w-full relative z-10 space-y-8">
        {/* LOGO & HEADER */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                <FaBookOpen className="w-6 h-6 text-white" />
                <RiSparkling2Line className="w-2.5 h-2.5 text-amber-300 absolute top-1.5 right-1.5 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  Learn<span className="text-blue-500">ora</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase -mt-0.5">
                Digital Edu Marketplace
              </span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-2">
            Create Your Account
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            নতুন একাউন্ট খুলতে আপনার রোল সিলেক্ট করে ফর্মটি পূরণ করুন
          </p>
        </div>

        {/* REGISTRATION FORM CARD */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-slate-800/90 shadow-2xl backdrop-blur-md space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ROLE SELECTION GRID */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Your Role (রোল নির্বাচন করুন)
              </label>

              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      type="button"
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`relative p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? "bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          <Icon />
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
                            <FaCheck />
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold">
                            {role.title}
                          </span>
                          <span className="text-[10px] text-blue-400 font-semibold">
                            ({role.subtitle})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 leading-tight mt-0.5">
                          {role.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* INPUT FIELDS */}
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Full Name (পূর্ণ নাম)
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

              {/* Email Address */}
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

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Password (পাসওয়ার্ড)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    />
                    <FaLock className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-3.5 h-3.5" />
                      ) : (
                        <FaEye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    />
                    <FaLock className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* TERMS & CONDITIONS CHECKBOX */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                checked={formData.agreeTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeTerms: e.target.checked })
                }
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950"
              />
              <label htmlFor="terms" className="text-xs text-slate-400">
                আমি Learnora-এর{" "}
                <Link href="/terms" className="text-blue-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                এবং{" "}
                <Link href="/privacy" className="text-blue-400 hover:underline">
                  Privacy Policy
                </Link>{" "}
                মেনে নিচ্ছি।
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>
                Create Account as{" "}
                {roles.find((r) => r.id === selectedRole)?.title}
              </span>
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            আগে থেকেই একাউন্ট তৈরি করা আছে?{" "}
            <Link
              href="/auth/signin"
              className="text-blue-400 font-bold hover:underline"
            >
              Log In করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
