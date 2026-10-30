"use client";

import React, { useState } from "react";
import { PeerInterviewInsight } from "@/types";
import { 
  Users, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Briefcase, 
  Send,
  Building,
  HelpCircle,
  X
} from "lucide-react";

interface CommunityInsightsProps {
  insights: PeerInterviewInsight[];
  onAddInsight: (insight: PeerInterviewInsight) => void;
}

export const CommunityInsights: React.FC<CommunityInsightsProps> = ({
  insights,
  onAddInsight,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    company: "",
    role: "",
    rounds: "Round 1: DSA (Arrays & Strings)\nRound 2: React Machine Coding\nRound 3: Behavioral & Culture",
    questions: "How does React fiber architecture work?\nTell me about a difficult bug you resolved.",
    advice: "Write clean modular code and don't rush through edge cases.",
    skills: "React, Next.js, TypeScript, Tailwind, Problem Solving",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.company || !formData.role) return;

    const newInsight: PeerInterviewInsight = {
      id: `insight-${Date.now()}`,
      candidateName: formData.candidateName,
      company: formData.company,
      role: formData.role,
      rounds: formData.rounds.split("\n").filter(Boolean).map((r, i) => ({
        roundName: `Round ${i + 1}`,
        focus: r,
      })),
      questionsAsked: formData.questions.split("\n").filter(Boolean),
      preparationAdvice: formData.advice,
      skillsVerified: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      createdAt: "Just now",
    };

    onAddInsight(newInsight);
    setIsModalOpen(false);
    setFormData({
      candidateName: "",
      company: "",
      role: "",
      rounds: "",
      questions: "",
      advice: "",
      skills: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Peer Debrief & Market Skill Intelligence
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Mentor's Community Feature
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Real interview round breakdowns, questions asked, and verified skill footprints from candidates who cracked roles at Razorpay, Swiggy, Postman, and more.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Share Your Interview Experience</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {insights.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Top Banner */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.role}
                  </h3>
                  <div className="text-xs font-semibold text-indigo-600 mt-0.5">
                    {item.company}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {item.createdAt}
                </span>
              </div>

              {/* Contributor Pill */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mb-3 bg-slate-50 px-2.5 py-1 rounded-lg w-fit border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Selected Candidate: <strong>{item.candidateName}</strong></span>
              </div>

              {/* Verified Skills Footprint */}
              <div className="mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Verified Skills Tested in Interview:
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.skillsVerified.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px]"
                    >
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rounds */}
              <div className="space-y-1.5 mb-3 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Rounds Overview:
                </div>
                {item.rounds.map((rnd, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="font-bold text-slate-800">{rnd.roundName}:</span>{" "}
                    <span className="text-slate-600">{rnd.focus}</span>
                  </div>
                ))}
              </div>

              {/* Questions Asked */}
              {item.questionsAsked.length > 0 && (
                <div className="mb-3 text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Actual Questions Asked:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                    {item.questionsAsked.map((q, qIdx) => (
                      <li key={qIdx} className="leading-snug italic">"{q}"</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Preparation Advice */}
            <div className="pt-3 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-800 block text-[11px] mb-0.5">
                Golden Advice:
              </span>
              <p className="text-[11px] text-slate-600 italic leading-relaxed">
                "{item.preparationAdvice}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Share Experience Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Share Your Selection Experience
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    placeholder="e.g. Yash Soni"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Cracked</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Razorpay, CRED"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. SDE-1, Machine Learning Engineer"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Interview Rounds Breakdown (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.rounds}
                  onChange={(e) => setFormData({ ...formData, rounds: e.target.value })}
                  placeholder="Round 1: DSA&#10;Round 2: Machine Coding&#10;Round 3: Behavioral"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Questions They Asked (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.questions}
                  onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                  placeholder="What is memoization in React?&#10;Explain SQL indexing."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Verified Skills Tested (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, TypeScript, SQL, System Design"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Golden Advice for Next Candidate
                </label>
                <textarea
                  rows={2}
                  value={formData.advice}
                  onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                  placeholder="Focus on clean architecture and explain trade-offs clearly..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-100"
                >
                  Publish Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
