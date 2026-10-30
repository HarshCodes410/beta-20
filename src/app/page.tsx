"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { JobSearch } from "@/components/JobSearch";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { CommunityInsights } from "@/components/CommunityInsights";
import { AuthModal } from "@/components/AuthModal";
import { AiTailorModal } from "@/components/AiTailorModal";
import { DataPrivacyModal } from "@/components/DataPrivacyModal";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { 
  UserProfile, 
  ResumeData, 
  JobListing, 
  JobApplication, 
  PeerInterviewInsight 
} from "@/types";
import { Storage, defaultResume, defaultUser } from "@/lib/storage";

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"resume" | "jobs" | "applications" | "community">("resume");

  // State
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [peerInsights, setPeerInsights] = useState<PeerInterviewInsight[]>([]);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAiTailorOpen, setIsAiTailorOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setUser(Storage.getUserProfile());
    setResume(Storage.getResume());
    setJobs(Storage.getJobs());
    setApplications(Storage.getApplications());
    setPeerInsights(Storage.getPeerInsights());
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-500">Initializing CareerPulse AI...</span>
        </div>
      </div>
    );
  }

  // Handlers
  const handleUpdateResume = (updated: ResumeData) => {
    setResume(updated);
    Storage.setResume(updated);
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setUser(updated);
    Storage.setUserProfile(updated);
  };

  const handleApplyJob = (job: JobListing) => {
    // Check if already applied
    if (applications.some((a) => a.jobId === job.id)) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      title: job.title,
      company: job.company,
      status: "applied",
      appliedDate: "Just now",
      lastUpdated: "Just now",
      recruiterEmail: `careers@${job.company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      linkedInPeers: [
        {
          name: "Saurabh Singhal",
          currentRole: `Engineer at ${job.company}`,
          profileUrl: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
            job.title + " " + job.company
          )}`,
          mutualContext: `Active in hiring pipeline for ${job.title}.`
        }
      ],
      interviewPrep: {
        keyFocusAreas: [
          `Review core ${job.requiredSkills.slice(0, 3).join(", ")} architectures`,
          "Brush up on system performance, error boundaries, and state consistency",
          "Prepare 2 concrete examples of team collaboration and conflict resolution"
        ],
        likelyQuestions: [
          `Why do you want to join ${job.company} specifically over other companies?`,
          `Explain how you would handle production downtime in an enterprise setting.`,
          `Walk me through the most technically challenging bug in your resume projects.`
        ],
        weaknessToAddress: `Make sure you can talk deeply about each project listed on your resume without generic answers.`,
        strategicAdvice: `Be genuine, highlight your communication skills from technical debates, and show curiosity about ${job.company}'s scale.`
      }
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    Storage.setApplications(updatedApps);
  };

  const handleUpdateApplicationStatus = (id: string, newStatus: JobApplication["status"]) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus, lastUpdated: "Just now" } : app
    );
    setApplications(updated);
    Storage.setApplications(updated);
  };

  const handleAddPeerInsight = (newInsight: PeerInterviewInsight) => {
    const updated = [newInsight, ...peerInsights];
    setPeerInsights(updated);
    Storage.setPeerInsights(updated);
  };

  const handleClearData = () => {
    localStorage.clear();
    setUser(defaultUser);
    setResume(defaultResume);
    setApplications([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
      />

      {/* Main Screen according to Active Tab */}
      <main className="flex-1">
        {activeTab === "resume" && (
          <ResumeBuilder
            resume={resume}
            onUpdateResume={handleUpdateResume}
            onOpenAiTailor={() => setIsAiTailorOpen(true)}
          />
        )}

        {activeTab === "jobs" && (
          <JobSearch
            jobs={jobs}
            resume={resume}
            onApplyJob={handleApplyJob}
            appliedJobIds={applications.map((a) => a.jobId)}
          />
        )}

        {activeTab === "applications" && (
          <ApplicationTracker
            applications={applications}
            onUpdateStatus={handleUpdateApplicationStatus}
            user={user}
          />
        )}

        {activeTab === "community" && (
          <CommunityInsights
            insights={peerInsights}
            onAddInsight={handleAddPeerInsight}
          />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        onSave={handleUpdateUser}
      />

      <AiTailorModal
        isOpen={isAiTailorOpen}
        onClose={() => setIsAiTailorOpen(false)}
        resume={resume}
        jobs={jobs}
        onApplySuggestions={handleUpdateResume}
      />

      <DataPrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        resume={resume}
        onClearData={handleClearData}
      />

      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span>CareerPulse AI</span>
            <span>•</span>
            <span className="text-indigo-600 font-bold">Team Beta-20</span>
            <span>•</span>
            <span>Hackathon PS1 Solution</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Autonomous Job Search & Application Tracker • Ethical ATS Citation Architecture
          </div>
        </div>
      </footer>
    </div>
  );
}
