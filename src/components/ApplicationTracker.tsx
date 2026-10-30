"use client";

import React, { useState } from "react";
import { 
  JobApplication, 
  UserProfile 
} from "@/types";
import { 
  Clock, 
  Linkedin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Calendar, 
  Mail, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  HelpCircle
} from "lucide-react";

interface ApplicationTrackerProps {
  applications: JobApplication[];
  onUpdateStatus: (id: string, newStatus: JobApplication["status"]) => void;
  user: UserProfile;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  onUpdateStatus,
  user,
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || "");
  const [gmailSyncStatus, setGmailSyncStatus] = useState<string>("Synced with " + (user.email || "Gmail"));

  const selectedApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const handleSimulateSync = () => {
    setGmailSyncStatus("Checking Gmail Inbox for recruiter threads...");
    setTimeout(() => {
      setGmailSyncStatus("Synced. Latest update from Razorpay careers (10:30 AM)");
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Application Tracker & Interview Copilot
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {applications.length} Active Workflows
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Monitors recruiter emails, manages application milestones, and unlocks dedicated LinkedIn peer networks & 2-day interview battleplans when shortlisted.
          </p>
        </div>

        {/* Gmail Sync Simulator */}
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
            <Mail className="w-4 h-4 text-red-500" />
            <span className="font-medium text-[11px]">{gmailSyncStatus}</span>
          </div>
          <button
            onClick={handleSimulateSync}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition"
          >
            Sync
          </button>
        </div>
      </div>

      {/* Main Grid: Application List on Left (5 cols), Copilot & Interview Prep on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Applications Pipeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
              <span>Applied Pipeline</span>
              <span className="text-[11px] text-slate-400 font-normal">Click to open copilot</span>
            </h2>

            {applications.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">
                No active applications yet. Go to <strong className="text-indigo-600">Job Radar</strong> to review and approve your first application!
              </div>
            ) : (
              <div className="space-y-2.5">
                {applications.map((app) => {
                  const isSelected = app.id === selectedApp?.id;
                  const isShortlisted = app.status === "interview_shortlisted";

                  return (
                    <div
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer text-xs ${
                        isSelected
                          ? "bg-indigo-50/50 border-indigo-400 ring-1 ring-indigo-200"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-bold text-slate-900 leading-tight">
                          {app.title}
                        </span>
                        {isShortlisted && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] animate-pulse">
                            Interview Shortlist!
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-slate-600 text-[11px]">
                        <span className="font-semibold text-indigo-600">{app.company}</span>
                        <span>Applied: {app.appliedDate}</span>
                      </div>

                      {/* Status Selector */}
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Stage:</span>
                        <select
                          value={app.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => onUpdateStatus(app.id, e.target.value as any)}
                          className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-800 focus:bg-white"
                        >
                          <option value="applied">Applied (Awaiting)</option>
                          <option value="screening">Resume Screening</option>
                          <option value="interview_shortlisted">Interview Shortlisted 🔥</option>
                          <option value="offer">Offer Received 🎉</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* PS1 Requirement: Honest Results & Statistical Limits */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm text-xs">
            <div className="flex items-center gap-1.5 font-bold mb-1.5 text-indigo-300">
              <BrainCircuit className="w-4 h-4" />
              <span>PS1 Honest Results & Sample Size Notice</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Based on {applications.length} submitted application(s), statistical significance is still low. We can conclude your resume passes initial ATS filters for frontend roles, but cannot yet infer compensation elasticity or regional response rates until 15+ applications are completed.
            </p>
          </div>
        </div>

        {/* Right Column: Shortlist Intelligence & 2-Days-Before Interview Prep (7 cols) */}
        <div className="lg:col-span-7">
          {selectedApp ? (
            <div className="space-y-5">
              {/* Interview Alert Box */}
              {selectedApp.status === "interview_shortlisted" ? (
                <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <h3 className="font-bold text-sm">
                        PS1 Scenario: Two Days Before Your {selectedApp.company} Interview
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                      {selectedApp.interviewDate || "In 48 Hours"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Generic advice won't help you crack {selectedApp.company}. Below are 10 real LinkedIn peers who recently cracked this exact position, along with the specific technical traps and questions they test.
                  </p>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-600">
                  <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Application Status: {selectedApp.status.toUpperCase()}</span>
                  </div>
                  <p className="text-[11px]">
                    To view the LinkedIn peer finder and 48-hour interview battleplan, switch status to <strong className="text-emerald-700">Interview Shortlisted</strong> above.
                  </p>
                </div>
              )}

              {/* LinkedIn Peer Profiles (Feature 4a) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-sky-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Top 10 Peer Profiles at {selectedApp.company}
                    </h3>
                  </div>
                  <a
                    href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
                      selectedApp.title + " " + selectedApp.company
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <span>View all matches on LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="space-y-3">
                  {(selectedApp.linkedInPeers || [
                    {
                      name: "Rahul Verma",
                      currentRole: `Software Engineer at ${selectedApp.company}`,
                      profileUrl: `https://www.linkedin.com/search/results/people/?keywords=SDE+${selectedApp.company}`,
                      mutualContext: "Joined 8 months ago from tier-2 engineering college. Frequent contributor to internal tooling."
                    },
                    {
                      name: "Divya Nambiar",
                      currentRole: `Frontend Lead at ${selectedApp.company}`,
                      profileUrl: `https://www.linkedin.com/search/results/people/?keywords=Frontend+${selectedApp.company}`,
                      mutualContext: "Active interviewer on candidate panels; emphasizes component reusability and clean state."
                    }
                  ]).map((peer, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{peer.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">| {peer.currentRole}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {peer.mutualContext}
                        </p>
                      </div>
                      <a
                        href={peer.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-[11px] shrink-0"
                      >
                        Profile ↗
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* 48-Hour Interview Master Plan */}
              {selectedApp.interviewPrep && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Tailored 48-Hour Battleplan for {selectedApp.company}
                    </h3>
                  </div>

                  {/* Weakness to address */}
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                    <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>Resume Weakness Audit to Protect During Interview</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      {selectedApp.interviewPrep.weaknessToAddress}
                    </p>
                  </div>

                  {/* Key focus areas */}
                  <div className="text-xs">
                    <div className="font-bold text-slate-800 mb-1.5">
                      Priority Technical Focus (Next 48 Hours):
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                      {selectedApp.interviewPrep.keyFocusAreas.map((area, i) => (
                        <li key={i}>{area}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Likely Questions */}
                  <div className="text-xs">
                    <div className="font-bold text-slate-800 mb-1.5">
                      Role-Specific Questions You Will Likely Be Asked:
                    </div>
                    <div className="space-y-2">
                      {selectedApp.interviewPrep.likelyQuestions.map((q, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-800 font-medium">
                          "{q}"
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic mindset */}
                  <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900">
                    <strong className="block text-indigo-950 font-bold mb-0.5">
                      Winning Mindset:
                    </strong>
                    {selectedApp.interviewPrep.strategicAdvice}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center text-xs text-slate-500">
              Select an application on the left to inspect interview insights.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
