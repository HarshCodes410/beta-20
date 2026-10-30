"use client";

import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  FileCheck2, 
  BookOpen, 
  RefreshCw,
  Quote
} from "lucide-react";
import { ResumeData, JobListing } from "@/types";
import { AiEngine, TailorAnalysisResult } from "@/lib/aiEngine";
import { Storage } from "@/lib/storage";

interface AiTailorModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  jobs: JobListing[];
  onApplySuggestions: (updatedResume: ResumeData) => void;
}

export const AiTailorModal: React.FC<AiTailorModalProps> = ({
  isOpen,
  onClose,
  resume,
  jobs,
  onApplySuggestions,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || "");
  const [customRole, setCustomRole] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<TailorAnalysisResult | null>(null);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleRunTailor = async () => {
    setIsAnalyzing(true);
    const selected = jobs.find((j) => j.id === selectedJobId) || {
      id: "custom",
      title: customRole || "Software Engineer",
      company: "Target Company",
      location: "India",
      salary: "Competitive",
      jobType: "full-time",
      difficulty: "entry",
      sourcePortal: "LinkedIn",
      sourceUrl: "",
      postedDate: "Recent",
      description: customDescription || "Full stack engineering with focus on React and clean systems.",
      requiredSkills: ["React", "TypeScript", "Node.js", "Communication"],
      matchScore: 85,
      trustScore: 90,
      trustFlags: { isStale: false, isUnverifiedAgency: false, hasSalaryAnomaly: false, notes: "" },
      timeRoi: "high_priority",
      whySkipOrApply: "Custom role evaluation"
    };

    const apiKey = Storage.getApiKey();
    const analysis = await AiEngine.analyzeAndTailor(resume, selected as JobListing, apiKey);
    setResult(analysis);
    setAcceptedIds(analysis.suggestions.map((s) => s.id));
    setIsAnalyzing(false);
  };

  const toggleAccept = (id: string) => {
    if (acceptedIds.includes(id)) {
      setAcceptedIds(acceptedIds.filter((item) => item !== id));
    } else {
      setAcceptedIds([...acceptedIds, id]);
    }
  };

  const handleApplyToResume = () => {
    if (!result) return;
    // Apply the accepted suggestions to the resume
    let updated = { ...resume };
    result.suggestions.forEach((sug) => {
      if (acceptedIds.includes(sug.id)) {
        if (sug.sourceSection === "achievements") {
          updated.achievements = updated.achievements.map((a) =>
            a === sug.sourceLine ? sug.suggestedText : a
          );
        } else if (sug.sourceSection === "projects" && updated.projects.length > 0) {
          updated.projects[0].highlights = updated.projects[0].highlights.map((h) =>
            h === sug.sourceLine ? sug.suggestedText : h
          );
        } else if (sug.sourceSection === "experiences" && updated.experiences.length > 0) {
          updated.experiences[0].highlights = updated.experiences[0].highlights.map((h) =>
            h === sug.sourceLine ? sug.suggestedText : h
          );
        }
      }
    });

    onApplySuggestions(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">PS1 AI Tailor & Source Citation Engine</h2>
              <p className="text-[11px] text-indigo-200">
                Ethical enhancement: Every suggestion strictly cites your own resume source line.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Job Target Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Select Target Role from Radar
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
                setResult(null);
              }}
              className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} @ {j.company} ({j.sourcePortal})
                </option>
              ))}
            </select>
          </div>

          {/* AI Tailoring Action Button */}
          {!result && (
            <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Analyze Overlap & Generate Cited Highlights
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                Our engine compares your achievements, projects, and skills with the job description. It reframes transferable strengths (like debating or open source) into formal competencies with 0 hallucinations.
              </p>
              <button
                onClick={handleRunTailor}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Keywords & Citations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Run AI Tailoring & Citation Check</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Result view */}
          {result && (
            <div className="space-y-4">
              {/* Match Score & Honest Assessment Banner */}
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-indigo-200 flex flex-col items-center justify-center text-center shrink-0">
                  <span className="text-lg font-black text-indigo-700 leading-tight">
                    {result.matchScore}%
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Match</span>
                </div>
                <div className="text-xs">
                  <div className="font-bold text-indigo-950 mb-0.5">
                    Target: {result.jobTitle} at {result.targetCompany}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-2">
                    {result.honestAssessment}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        ✓ {kw}
                      </span>
                    ))}
                    {result.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                        Missing: {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions with Direct Line Citation */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                  <span>Cited Enhancements ({result.suggestions.length})</span>
                  <span className="text-[11px] text-slate-400 font-normal">Select which to accept</span>
                </h4>

                <div className="space-y-3">
                  {result.suggestions.map((sug) => {
                    const isAccepted = acceptedIds.includes(sug.id);
                    return (
                      <div
                        key={sug.id}
                        onClick={() => toggleAccept(sug.id)}
                        className={`p-4 rounded-xl border transition cursor-pointer text-xs ${
                          isAccepted
                            ? "bg-white border-indigo-300 shadow-sm ring-1 ring-indigo-200"
                            : "bg-slate-50 border-slate-200 opacity-60"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                            {sug.transferableSkill}
                          </span>
                          <input
                            type="checkbox"
                            checked={isAccepted}
                            onChange={() => toggleAccept(sug.id)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>

                        {/* Exact Source Citation (PS1 Compliance) */}
                        <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-950 text-[11px] mb-2 flex items-start gap-2">
                          <Quote className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Original Resume Citation ({sug.sourceSection}):</span>
                            <div className="italic text-slate-700 mt-0.5 font-serif">"{sug.sourceLine}"</div>
                          </div>
                        </div>

                        {/* Suggested Reframing */}
                        <div className="text-slate-800 font-semibold mb-1 leading-snug">
                          {sug.suggestedText}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Why: {sug.whyThisHelps}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {result && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {acceptedIds.length} enhancement(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyToResume}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition"
              >
                <Check className="w-4 h-4" />
                <span>Apply to Resume</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
