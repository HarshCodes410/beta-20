"use client";

import React, { useState } from "react";
import { 
  ResumeData, 
  JobListing 
} from "@/types";
import { ResumePreview } from "./ResumePreview";
import { 
  Sparkles, 
  Download, 
  Eye, 
  Edit3, 
  Plus, 
  Trash2, 
  Calendar, 
  Check, 
  Share2, 
  Clock,
  Shield,
  Layers
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ResumeBuilderProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onOpenAiTailor: () => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  resume,
  onUpdateResume,
  onOpenAiTailor,
}) => {
  const [template, setTemplate] = useState<"modern" | "academic" | "minimal">("modern");
  const [activeSubTab, setActiveSubTab] = useState<"edit" | "preview">("edit");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  // Editable state
  const [data, setData] = useState<ResumeData>(resume);

  const handlePersonalInfoChange = (field: string, value: string) => {
    const updated = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    };
    setData(updated);
    onUpdateResume(updated);
  };

  const handleRetentionChange = (days: number) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    const updated = {
      ...data,
      retentionDays: days,
      expiresAt: expires,
    };
    setData(updated);
    onUpdateResume(updated);
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  // Add/Delete Experience
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "Company / Organization Name",
      role: "Software Developer Intern",
      startDate: "Jun 2024",
      endDate: "Aug 2024",
      current: false,
      highlights: ["Implemented feature modules and resolved performance bottlenecks."],
    };
    const updated = { ...data, experiences: [...data.experiences, newExp] };
    setData(updated);
    onUpdateResume(updated);
  };

  const removeExperience = (id: string) => {
    const updated = {
      ...data,
      experiences: data.experiences.filter((e) => e.id !== id),
    };
    setData(updated);
    onUpdateResume(updated);
  };

  // Add/Delete Project
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "New Full Stack Project",
      description: "Brief overview of what you built and why it matters.",
      technologies: ["React", "TypeScript", "Tailwind"],
      link: "https://github.com/...",
      highlights: ["Engineered responsive UI and integrated RESTful endpoints."],
    };
    const updated = { ...data, projects: [...data.projects, newProj] };
    setData(updated);
    onUpdateResume(updated);
  };

  const removeProject = (id: string) => {
    const updated = { ...data, projects: data.projects.filter((p) => p.id !== id) };
    setData(updated);
    onUpdateResume(updated);
  };

  // Add/Delete Achievement
  const addAchievement = () => {
    const updated = {
      ...data,
      achievements: [...data.achievements, "New notable award, hackathon rank, or extracurricular achievement"],
    };
    setData(updated);
    onUpdateResume(updated);
  };

  const removeAchievement = (idx: number) => {
    const updated = {
      ...data,
      achievements: data.achievements.filter((_, i) => i !== idx),
    };
    setData(updated);
    onUpdateResume(updated);
  };

  // Export to PDF
  const handleDownloadPdf = async () => {
    setIsExporting(true);
    const element = document.getElementById("resume-preview-sheet");
    if (!element) {
      window.print();
      setIsExporting(false);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (err) {
      console.warn("Falling back to window print:", err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Resume Studio & Optimizer
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              ATS-Optimized
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Build, edit, and tailor your profile. Inspired by Overleaf & FlowCV.
          </p>
        </div>

        {/* Template Selector & AI Tailor CTA */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Template pills */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setTemplate("modern")}
              className={`px-3 py-1.5 rounded-lg transition ${
                template === "modern" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Modern FlowCV
            </button>
            <button
              onClick={() => setTemplate("academic")}
              className={`px-3 py-1.5 rounded-lg transition ${
                template === "academic" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Overleaf LaTeX
            </button>
          </div>

          {/* AI Tailor Button */}
          <button
            onClick={onOpenAiTailor}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white font-bold text-xs shadow-md shadow-indigo-100 hover:opacity-95 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Tailor with Citation</span>
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? "Exporting..." : "PDF"}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Editor on Left, Live Sheet on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Editor Sections (7 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Section 1: Personal Details */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Personal & Contact Information</span>
              <span className="text-[11px] text-slate-400 font-normal">Auto-saved</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Phone</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin || ""}
                  onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={data.personalInfo.github || ""}
                  onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Professional Summary</label>
                <textarea
                  rows={3}
                  value={data.personalInfo.summary}
                  onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Experience / Contributions */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Work & Open Source Experience</h2>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Role</span>
              </button>
            </div>
            <div className="space-y-4">
              {data.experiences.map((exp, idx) => (
                <div key={exp.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 relative text-xs space-y-2">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500">Role Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updatedExp = [...data.experiences];
                          updatedExp[idx].role = e.target.value;
                          const updated = { ...data, experiences: updatedExp };
                          setData(updated);
                          onUpdateResume(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updatedExp = [...data.experiences];
                          updatedExp[idx].company = e.target.value;
                          const updated = { ...data, experiences: updatedExp };
                          setData(updated);
                          onUpdateResume(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Key Highlights (One bullet per line)
                    </label>
                    <textarea
                      rows={2}
                      value={exp.highlights.join("\n")}
                      onChange={(e) => {
                        const updatedExp = [...data.experiences];
                        updatedExp[idx].highlights = e.target.value.split("\n");
                        const updated = { ...data, experiences: updatedExp };
                        setData(updated);
                        onUpdateResume(updated);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Engineering Projects */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Projects & Repositories</h2>
              <button
                onClick={addProject}
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>
            <div className="space-y-4">
              {data.projects.map((proj, idx) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 relative text-xs space-y-2">
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updatedProj = [...data.projects];
                          updatedProj[idx].title = e.target.value;
                          const updated = { ...data, projects: updatedProj };
                          setData(updated);
                          onUpdateResume(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        value={proj.technologies.join(", ")}
                        onChange={(e) => {
                          const updatedProj = [...data.projects];
                          updatedProj[idx].technologies = e.target.value.split(",").map((s) => s.trim());
                          const updated = { ...data, projects: updatedProj };
                          setData(updated);
                          onUpdateResume(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Impact Highlights</label>
                    <textarea
                      rows={2}
                      value={proj.highlights.join("\n")}
                      onChange={(e) => {
                        const updatedProj = [...data.projects];
                        updatedProj[idx].highlights = e.target.value.split("\n");
                        const updated = { ...data, projects: updatedProj };
                        setData(updated);
                        onUpdateResume(updated);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Honors, Debate & Extracurriculars */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Honors & Transferable Achievements</h2>
                <p className="text-[11px] text-slate-500">
                  Debate wins, event leadership, or hackathon ranks (Our AI will map these to job competencies!)
                </p>
              </div>
              <button
                onClick={addAchievement}
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
            <div className="space-y-2">
              {data.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ach}
                    onChange={(e) => {
                      const updatedAch = [...data.achievements];
                      updatedAch[idx] = e.target.value;
                      const updated = { ...data, achievements: updatedAch };
                      setData(updated);
                      onUpdateResume(updated);
                    }}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-medium"
                  />
                  <button
                    onClick={() => removeAchievement(idx)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: PS1 Data Retention & Expiry Policy */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                PS1 Data Governance & Retention
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              As required by the problem statement, you retain full ownership of your data. Choose how long your resume remains stored before being automatically wiped.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[7, 15, 30, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => handleRetentionChange(days)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    data.retentionDays === days
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-white/10 hover:bg-white/20 text-slate-200"
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                Active until: {new Date(data.expiresAt).toLocaleDateString()} (Auto-purges sensitive PII)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Sheet Preview (6 cols - sticky) */}
        <div className="lg:col-span-6 sticky top-20">
          <div className="bg-slate-200/70 p-3 rounded-2xl border border-slate-300/80 shadow-inner overflow-hidden">
            <div className="flex items-center justify-between mb-2 px-2 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-indigo-600" />
                <span>Live Interactive Sheet ({template})</span>
              </div>
              <span className="text-[11px] text-slate-500">Ready for ATS & PDF export</span>
            </div>

            {/* Render Resume Preview */}
            <div className="overflow-x-auto max-h-[85vh] rounded-xl shadow-lg">
              <ResumePreview resume={data} template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
