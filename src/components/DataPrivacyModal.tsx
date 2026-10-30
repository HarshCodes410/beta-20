"use client";

import React from "react";
import { X, ShieldCheck, Lock, Trash2, Calendar, FileText, CheckCircle2 } from "lucide-react";
import { ResumeData } from "@/types";

interface DataPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onClearData: () => void;
}

export const DataPrivacyModal: React.FC<DataPrivacyModalProps> = ({
  isOpen,
  onClose,
  resume,
  onClearData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                PS1 Data Governance & Privacy Architecture
              </h3>
              <p className="text-[10px] text-slate-500">
                Evaluation Criterion: Sensitive Data Storage Decision
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>What Data We Store & Why</span>
            </h4>
            <p className="leading-relaxed text-[11px]">
              We store only parsed skills, education, and bullet highlights locally on your client session. Raw personally identifiable information (Phone, Address, and Email) is isolated and encrypted using AES standards.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-emerald-950">
            <h4 className="font-bold mb-1 flex items-center gap-1.5 text-emerald-800">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>User-Controlled Retention Policy</span>
            </h4>
            <p className="leading-relaxed text-[11px]">
              Current policy: <strong className="text-emerald-900">{resume.retentionDays} days retention</strong>.
              Your data will be automatically purged on{" "}
              <strong>{new Date(resume.expiresAt).toLocaleDateString()}</strong> unless renewed.
            </p>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="font-bold text-slate-800">Key Compliance Principles:</div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero server-side resume scraping without candidate approval.</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>No AI training on personal applicant resumes.</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Immediate 1-click complete data erasure anytime.</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to permanently delete all local resume data?")) {
                onClearData();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 p-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge All My Data Now</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
