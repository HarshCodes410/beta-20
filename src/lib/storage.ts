import { UserProfile, ResumeData, JobListing, JobApplication, PeerInterviewInsight } from "@/types";
import { initialJobs } from "@/data/mockJobs";
import { initialPeerInsights } from "@/data/mockPeerInsights";

const KEYS = {
  USER_PROFILE: "beta20_user_profile",
  RESUME: "beta20_resume_data",
  JOBS: "beta20_job_listings",
  APPLICATIONS: "beta20_applications",
  PEER_INSIGHTS: "beta20_peer_insights",
  API_KEY: "beta20_gemini_key",
};

export const defaultResume: ResumeData = {
  personalInfo: {
    fullName: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 98765 43210",
    location: "Bhopal / Bengaluru, India",
    linkedin: "https://linkedin.com/in/arjun-mehta-dev",
    github: "https://github.com/arjunmehta",
    portfolio: "https://arjunmehta.dev",
    summary: "Aspiring Full Stack Engineer with strong foundation in React, Next.js, and modern TypeScript. Passionate about building accessible, performant web tools and AI-integrated workflows.",
  },
  experiences: [
    {
      id: "exp-1",
      company: "TechNexus Open Source",
      role: "Frontend Contributor",
      startDate: "Jan 2024",
      endDate: "Present",
      current: true,
      highlights: [
        "Migrated legacy component library to Next.js 14 and Tailwind CSS, improving lighthouse score from 72 to 96.",
        "Engineered accessible modal dialogs and dynamic search filters with debounced API queries.",
        "Collaborated with 14 international developers on GitHub using strict pull request review standards."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "DocuMind - AI Knowledge Assistant",
      description: "Full-stack application allowing users to upload research PDFs and query them using conversational AI.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Supabase"],
      link: "https://github.com/arjunmehta/documind",
      highlights: [
        "Implemented vector document chunking and low-latency streaming responses.",
        "Handled responsive PDF rendering with client-side zoom and search highlighting.",
        "Secured user data with Row Level Security and automated 30-day session expiry."
      ]
    },
    {
      id: "proj-2",
      title: "CampusEvent Hub",
      description: "Real-time registration and check-in portal for 1,200+ college fest attendees.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "QR Scanner"],
      link: "https://github.com/arjunmehta/campus-events",
      highlights: [
        "Integrated dual OTP verification (Email + SMS) to eliminate duplicate event registrations.",
        "Reduced on-spot badge collection queue wait time by 60% with instant QR verification."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "Maulana Azad National Institute of Technology (MANIT Bhopal)",
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      startDate: "2023",
      endDate: "2027",
      grade: "8.8 / 10 CGPA"
    }
  ],
  skills: [
    {
      category: "Frontend & UI",
      items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3"]
    },
    {
      category: "Backend & Cloud",
      items: ["Node.js", "RESTful APIs", "SQL", "PostgreSQL", "Supabase", "Git & GitHub"]
    },
    {
      category: "Professional Competencies",
      items: ["Technical Documentation", "Problem Solving", "Debate & Communication", "Team Collaboration"]
    }
  ],
  achievements: [
    "Winner - Inter-College Technical Debate on 'AI Ethics & Future of Work' (2024)",
    "Finalist - National Smart Campus Hackathon among 350+ competing teams",
    "Active member of Technical Society, mentored 40+ juniors in Git and Web fundamentals"
  ],
  retentionDays: 30,
  createdAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

export const defaultUser: UserProfile = {
  name: "Arjun Mehta",
  email: "arjun.mehta@gmail.com",
  phone: "+91 98765 43210",
  address: "MANIT Campus, Bhopal, MP",
  targetRole: "Full Stack Engineer / React Developer",
  emailVerified: true,
  smsVerified: true,
};

export const Storage = {
  getUserProfile: (): UserProfile => {
    if (typeof window === "undefined") return defaultUser;
    const data = localStorage.getItem(KEYS.USER_PROFILE);
    if (!data) return defaultUser;
    try {
      return JSON.parse(data);
    } catch {
      return defaultUser;
    }
  },

  setUserProfile: (profile: UserProfile): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    }
  },

  getResume: (): ResumeData => {
    if (typeof window === "undefined") return defaultResume;
    const data = localStorage.getItem(KEYS.RESUME);
    if (!data) return defaultResume;
    try {
      const parsed: ResumeData = JSON.parse(data);
      // PS1 Data Retention & Expiry Check:
      if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() < Date.now()) {
        console.warn("User defined data retention expired. Resetting sensitive fields.");
        return {
          ...defaultResume,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
      }
      return parsed;
    } catch {
      return defaultResume;
    }
  },

  setResume: (resume: ResumeData): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.RESUME, JSON.stringify(resume));
    }
  },

  getJobs: (): JobListing[] => {
    if (typeof window === "undefined") return initialJobs;
    const data = localStorage.getItem(KEYS.JOBS);
    if (!data) return initialJobs;
    try {
      return JSON.parse(data);
    } catch {
      return initialJobs;
    }
  },

  setJobs: (jobs: JobListing[]): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
    }
  },

  getApplications: (): JobApplication[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(KEYS.APPLICATIONS);
    if (!data) {
      // Seed with 1 initial sample application
      const seeded: JobApplication[] = [
        {
          id: "app-1",
          jobId: "job-1",
          title: "Junior Full Stack Developer",
          company: "Razorpay",
          status: "interview_shortlisted",
          appliedDate: "3 days ago",
          lastUpdated: "Today, 10:30 AM",
          recruiterEmail: "careers-engineering@razorpay.com",
          interviewDate: "Day after tomorrow (2 Days remaining)",
          linkedInPeers: [
            {
              name: "Saurabh Singhal",
              currentRole: "SDE-1 at Razorpay",
              profileUrl: "https://www.linkedin.com/search/results/people/?keywords=SDE+Razorpay",
              mutualContext: "Joined Razorpay as fresher 10 months ago; working on payments gateway UI."
            },
            {
              name: "Ananya Dixit",
              currentRole: "Frontend Engineer at Razorpay",
              profileUrl: "https://www.linkedin.com/search/results/people/?keywords=Frontend+Razorpay",
              mutualContext: "Mentors incoming interns; active contributor to React India."
            }
          ],
          interviewPrep: {
            keyFocusAreas: [
              "Deep dive into React 18 reconciliation & Next.js Server Components",
              "Idempotent API retry mechanisms during payment dropouts",
              "How to explain your DocuMind PDF chunking architecture simply"
            ],
            likelyQuestions: [
              "Razorpay processes millions of transactions daily: how would you optimize UI bundle size to load in <1.2s on 3G connections?",
              "You mentioned participating in technical debates. How do you resolve a disagreement with a senior engineer on API design?",
              "Write a TypeScript debounce function from scratch and explain memory cleanup."
            ],
            weaknessToAddress: "Your resume shows great frontend work, but Razorpay will probe your SQL and distributed transactions understanding. Brush up on ACID properties!",
            strategicAdvice: "Show enthusiasm for fin-tech reliability. Be honest about what you know and don't know rather than bluffing."
          }
        }
      ];
      return seeded;
    }
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  setApplications: (apps: JobApplication[]): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
    }
  },

  getPeerInsights: (): PeerInterviewInsight[] => {
    if (typeof window === "undefined") return initialPeerInsights;
    const data = localStorage.getItem(KEYS.PEER_INSIGHTS);
    if (!data) return initialPeerInsights;
    try {
      return JSON.parse(data);
    } catch {
      return initialPeerInsights;
    }
  },

  setPeerInsights: (insights: PeerInterviewInsight[]): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.PEER_INSIGHTS, JSON.stringify(insights));
    }
  },

  getApiKey: (): string => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(KEYS.API_KEY) || "";
  },

  setApiKey: (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS.API_KEY, key);
    }
  }
};
