"use client";

import React, { useState, useMemo } from "react";
import { 
  JobListing, 
  ResumeData, 
  JobDifficulty, 
  JobType,
  JobApplication
} from "@/types";
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  Send, 
  CheckCircle, 
  AlertTriangle,
  Building,
  MapPin,
  TrendingUp,
  ChevronRight,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";

interface JobSearchProps {
  jobs: JobListing[];
  resume: ResumeData;
  onApplyJob: (job: JobListing) => void;
  appliedJobIds: string[];
}

export const JobSearch: React.FC<JobSearchProps> = ({
  jobs,
  resume,
  onApplyJob,
  appliedJobIds,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedPortal, setSelectedPortal] = useState<string>("all");
  const [selectedRoi, setSelectedRoi] = useState<string>("all");
  const [confirmApplyJob, setConfirmApplyJob] = useState<JobListing | null>(null);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.requiredSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }
      // Difficulty
      if (selectedDifficulty !== "all" && job.difficulty !== selectedDifficulty) {
        return false;
      }
      // Type
      if (selectedType !== "all" && job.jobType !== selectedType) {
        return false;
      }
      // Portal
      if (selectedPortal !== "all" && job.sourcePortal !== selectedPortal) {
        return false;
      }
      // ROI
      if (selectedRoi !== "all" && job.timeRoi !== selectedRoi) {
        return false;
      }
      return true;
    });
  }, [jobs, searchQuery, selectedDifficulty, selectedType, selectedPortal, selectedRoi]);

  const handleConfirmApproval = () => {
    if (!confirmApplyJob) return;
    onApplyJob(confirmApplyJob);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setConfirmApplyJob(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Job Radar & Trust Engine
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {filteredJobs.length} Matches Found
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              PS1 Compliant: Surfaces fake or stale listings, advises on where to put your limited application hours, and requires explicit candidate confirmation before dispatch.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Trust Verification Active</span>
            </div>
            <div className="p-2.5 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Time ROI Filter On</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Query input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or skills (e.g. React, ML)..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Difficulty filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white"
            >
              <option value="all">Level: All Levels</option>
              <option value="entry">Entry Level / Fresher</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>

          {/* Type filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white"
            >
              <option value="all">Type: All Work Types</option>
              <option value="full-time">Full-Time</option>
              <option value="remote">Remote</option>
              <option value="internship">Internship</option>
              <option value="part-time">Part-Time</option>
            </select>
          </div>

          {/* Time ROI filter (Limited Time Requirement) */}
          <div>
            <select
              value={selectedRoi}
              onChange={(e) => setSelectedRoi(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white"
            >
              <option value="all">Time ROI: All Advice</option>
              <option value="high_priority">🔥 Worth Applying (High ROI)</option>
              <option value="medium">⚡ Moderate Match</option>
              <option value="skip">⚠️ Skip (Low ROI on time)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobIds.includes(job.id);
          const hasAnomaly = job.trustFlags.isStale || job.trustFlags.isUnverifiedAgency;

          return (
            <div
              key={job.id}
              className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                hasAnomaly
                  ? "border-amber-200 bg-amber-50/20"
                  : "border-slate-200 hover:border-indigo-300"
              }`}
            >
              <div>
                {/* Top badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-100">
                      {job.sourcePortal}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                      {job.jobType.toUpperCase()}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {job.postedDate}
                    </span>
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 text-white font-bold text-xs shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{job.matchScore}% Match</span>
                  </div>
                </div>

                {/* Job Title & Company */}
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 font-medium">
                  <span className="text-indigo-600 font-bold">{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">
                  {job.salary}
                </div>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Required Skills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.requiredSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* PS1 Requirement: Trust & Transparency Alert */}
                {hasAnomaly ? (
                  <div className="mt-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    <div className="flex items-center gap-1.5 font-bold mb-0.5 text-amber-800">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Trust Radar Alert: Potential Fake or Stale Listing</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-snug">
                      {job.trustFlags.notes}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Trust Score: {job.trustScore}/100 (Verified)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Direct hiring portal</span>
                  </div>
                )}

                {/* PS1 Requirement: Limited Time Allocation Advice */}
                <div className="mt-2 text-[11px] text-slate-600 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">Time ROI:</strong> {job.whySkipOrApply}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={job.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  <span>View on {job.sourcePortal}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {isApplied ? (
                  <button
                    disabled
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Application Tracked</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmApplyJob(job)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Approve & Track Apply</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PS1 Requirement: Explicit Confirmation Modal ("Nothing sent without approval") */}
      {confirmApplyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <Send className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 text-center">
              Confirm Application Approval
            </h3>
            <p className="text-xs text-slate-500 text-center mt-1 mb-4">
              Per PS1 guidelines, our system will never submit an application or send your resume without explicit confirmation.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs mb-4 space-y-1">
              <div>
                <span className="text-slate-500">Position:</span>{" "}
                <strong className="text-slate-900">{confirmApplyJob.title}</strong>
              </div>
              <div>
                <span className="text-slate-500">Company:</span>{" "}
                <strong className="text-indigo-600">{confirmApplyJob.company}</strong>
              </div>
              <div>
                <span className="text-slate-500">Resume Attached:</span>{" "}
                <strong className="text-slate-800">{resume.personalInfo.fullName} (ATS Tailored)</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmApplyJob(null)}
                className="w-1/2 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApproval}
                className="w-1/2 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100"
              >
                Confirm & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
