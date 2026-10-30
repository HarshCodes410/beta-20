export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  targetRole: string;
  emailVerified: boolean;
  smsVerified: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    summary: string;
  };
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  achievements: string[];
  retentionDays: number; // User-defined data storage policy
  createdAt: string;
  expiresAt: string;
}

export type JobDifficulty = 'entry' | 'mid' | 'senior';
export type JobType = 'full-time' | 'part-time' | 'internship' | 'remote';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: JobType;
  difficulty: JobDifficulty;
  sourcePortal: 'Naukri' | 'Dice' | 'Hired' | 'ZipRecruiter' | 'Foundit' | 'LinkedIn';
  sourceUrl: string;
  postedDate: string;
  description: string;
  requiredSkills: string[];
  matchScore: number; // 0 - 100
  trustScore: number; // 0 - 100
  trustFlags: {
    isStale: boolean;
    isUnverifiedAgency: boolean;
    hasSalaryAnomaly: boolean;
    notes: string;
  };
  timeRoi: 'high_priority' | 'medium' | 'skip'; // Limited time optimization
  whySkipOrApply: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  title: string;
  company: string;
  status: 'applied' | 'screening' | 'interview_shortlisted' | 'offer' | 'rejected';
  appliedDate: string;
  lastUpdated: string;
  recruiterEmail?: string;
  interviewDate?: string;
  linkedInPeers?: {
    name: string;
    currentRole: string;
    profileUrl: string;
    mutualContext: string;
  }[];
  interviewPrep?: {
    keyFocusAreas: string[];
    likelyQuestions: string[];
    weaknessToAddress: string;
    strategicAdvice: string;
  };
}

export interface PeerInterviewInsight {
  id: string;
  candidateName: string;
  role: string;
  company: string;
  rounds: {
    roundName: string;
    focus: string;
  }[];
  questionsAsked: string[];
  preparationAdvice: string;
  skillsVerified: string[];
  createdAt: string;
}
