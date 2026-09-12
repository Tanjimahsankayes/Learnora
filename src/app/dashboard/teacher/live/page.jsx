"use client";

import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Monitor,
  PhoneOff,
  MessageSquare,
  Users,
  Send,
  Hand,
  Disc,
  MoreVertical,
  ShieldAlert,
  Sparkles,
  Maximize,
  Volume2,
} from "lucide-react";

const LiveClass = () => {
  // Call & Media States
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'participants'

  // User Role State (Teacher or Student)
  const [userRole, setUserRole] = useState("teacher"); // 'teacher' or 'student'

  // Chat States
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Tanjim (Teacher)",
      text: "Welcome to today's live class on React!",
      time: "10:00 AM",
      isTeacher: true,
    },
    {
      id: 2,
      sender: "Rahim",
      text: "Sir, screen clear dekha jacche.",
      time: "10:01 AM",
      isTeacher: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Hand Raise State (For Students)
  const [handRaised, setHandRaised] = useState(false);

  // Participants Mock Data
  const participants = [
    {
      id: 1,
      name: "Tanjim Ahsan Kayes",
      role: "Teacher",
      isMuted: false,
      isVideoOff: false,
    },
    {
      id: 2,
      name: "Rahim Ahmed",
      role: "Student",
      isMuted: true,
      isVideoOff: false,
    },
    {
      id: 3,
      name: "Karim Chowdhury",
      role: "Student",
      isMuted: true,
      isVideoOff: true,
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      role: "Student",
      isMuted: true,
      isVideoOff: false,
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: userRole === "teacher" ? "Tanjim (Teacher)" : "Me (Student)",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isTeacher: userRole === "teacher",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Top Navbar Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span>Web Development Masterclass — Live Session</span>
          </h1>
          <span className="hidden sm:inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-2.5 py-0.5 rounded-md font-medium">
            Room: #DEV-2026
          </span>
        </div>

        {/* Role Switcher & Live Counter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-400">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>{participants.length} Active</span>
          </div>

          {/* Role Toggle Button (Testing purpose) */}
          <button
            onClick={() =>
              setUserRole(userRole === "teacher" ? "student" : "teacher")
            }
            className="text-xs bg-slate-800 border border-slate-700 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-300 transition-all"
          >
            Role:{" "}
            <strong className="text-purple-400 capitalize">{userRole}</strong>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Video Streams Grid */}
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
          {/* Main Presenter Screen (Teacher's Screen) */}
          <div className="relative flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center group shadow-2xl">
            {isVideoOff ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-purple-600/20 border-2 border-purple-500/40 flex items-center justify-center text-2xl font-bold text-purple-400">
                  TK
                </div>
                <p className="text-sm text-slate-400">
                  Teacher's Camera is Off
                </p>
              </div>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200"
                alt="Main Video Stream"
                className="w-full h-full object-cover"
              />
            )}

            {/* Main Stream Overlay Tags */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-slate-950/80 border border-slate-800 text-slate-200 text-xs px-3 py-1 rounded-lg backdrop-blur-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Tanjim Ahsan Kayes (Teacher)</span>
              </span>
              {isRecording && (
                <span className="bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 animate-pulse">
                  <Disc className="w-3.5 h-3.5" /> REC
                </span>
              )}
            </div>

            {/* Audio Indicator */}
            <div className="absolute bottom-4 left-4 bg-slate-950/80 border border-slate-800 p-2 rounded-lg backdrop-blur-md">
              <Volume2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Student Webcams Grid (Bottom Strip) */}
          <div className="h-32 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {participants.slice(1).map((p) => (
              <div
                key={p.id}
                className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center"
              >
                {p.isVideoOff ? (
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                    {p.name.charAt(0)}
                  </div>
                ) : (
                  <img
                    src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300`}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-2 left-2 bg-slate-950/80 text-[10px] text-slate-300 px-2 py-0.5 rounded backdrop-blur-md truncate max-w-[80%]">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Sidebar Chat & Participants */}
        <div className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
          {/* Sidebar Tab Header */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === "chat"
                  ? "border-purple-500 text-purple-400 bg-slate-800/40"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Live Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("participants")}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === "participants"
                  ? "border-purple-500 text-purple-400 bg-slate-800/40"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Participants ({participants.length})</span>
            </button>
          </div>

          {/* TAB 1: Chat Box */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className={`font-semibold ${msg.isTeacher ? "text-purple-400" : "text-slate-300"}`}
                      >
                        {msg.sender}
                      </span>
                      <span className="text-slate-500">{msg.time}</span>
                    </div>
                    <div className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-xl text-xs text-slate-200 leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="প্রশ্ন বা মন্তব্য লিখুন..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
                <button
                  type="submit"
                  className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Participants List */}
          {activeTab === "participants" && (
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center text-xs">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-200">{p.name}</p>
                      <p className="text-[10px] text-slate-500">{p.role}</p>
                    </div>
                  </div>

                  {/* Teacher Action Controls over Students */}
                  {userRole === "teacher" && p.role !== "Teacher" ? (
                    <button className="text-[10px] bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2 py-1 rounded hover:bg-rose-500 hover:text-white">
                      Mute
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <footer className="h-20 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-between shrink-0">
        {/* Left Stats */}
        <div className="hidden sm:flex items-center gap-3">
          {userRole === "teacher" && (
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isRecording
                  ? "bg-rose-500/10 border-rose-500/40 text-rose-400"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Disc className="w-4 h-4" />
              <span>{isRecording ? "Stop Record" : "Start Record"}</span>
            </button>
          )}
        </div>

        {/* Center Main Controls */}
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          {/* Mute/Unmute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-2xl border transition-all ${
              isMuted
                ? "bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-600/25"
                : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          {/* Video On/Off */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3.5 rounded-2xl border transition-all ${
              isVideoOff
                ? "bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-600/25"
                : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800"
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="w-5 h-5" />
            ) : (
              <VideoIcon className="w-5 h-5" />
            )}
          </button>

          {/* Screen Share (Teacher Only) */}
          {userRole === "teacher" && (
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-3.5 rounded-2xl border transition-all ${
                isScreenSharing
                  ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/25"
                  : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>
          )}

          {/* Hand Raise (Student Only) */}
          {userRole === "student" && (
            <button
              onClick={() => setHandRaised(!handRaised)}
              className={`p-3.5 rounded-2xl border transition-all ${
                handRaised
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                  : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Hand className="w-5 h-5" />
            </button>
          )}

          {/* End Call Button */}
          <button
            onClick={() => alert("কাস থেকে বের হয়ে গেছেন!")}
            className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition-all"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-2">
          <button className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LiveClass;
