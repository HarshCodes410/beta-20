"use client";

import React from "react";
import { 
  FileText, 
  Briefcase, 
  Clock, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Key,
  Flame
} from "lucide-react";
import { UserProfile } from "@/types";

interface NavbarProps {
  activeTab: "resume" | "jobs" | "applications" | "community";
  setActiveTab: (tab: "resume" | "jobs" | "applications" | "community") => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onOpenPrivacy: () => void;
  onOpenApiKey: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onOpenPrivacy,
  onOpenApiKey,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Hackathon Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-md shadow-indigo-100">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  Career<span className="text-indigo-600">Pulse</span>
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Team Beta-20
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                PS1: Autonomous Job Search & Application Tracker
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab("resume")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "resume"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">Resume Studio</span>
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "jobs"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden md:inline">Job Radar</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "applications"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden md:inline">Tracker & Copilot</span>
            </button>

            <button
              onClick={() => setActiveTab("community")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "community"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Peer Debriefs</span>
            </button>
          </nav>

          {/* User & Verification Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenPrivacy}
              title="PS1 Data Retention Policy"
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </button>

            <button
              onClick={onOpenApiKey}
              title="Gemini AI Key"
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <Key className="w-4 h-4 text-amber-600" />
            </button>

            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white flex items-center justify-center text-xs font-bold uppercase">
                {user.name.charAt(0) || "U"}
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {user.name.split(" ")[0]}
                  </span>
                  {user.emailVerified && user.smsVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                  )}
                </div>
                <span className="text-[10px] text-slate-500 leading-none">Verified</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
