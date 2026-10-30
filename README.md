# CareerPulse AI — Autonomous Job Search & Application Tracker
### **Team Beta-20 | Hackathon Problem Statement 1 (PS1)**

> An ethical, end-to-end career copilot designed for candidates with limited time. Featuring multi-channel authentication, live resume studio, ATS tailoring with strictly cited source provenance, fake job trust radar, 48-hour interview battleplans, and community skill intelligence.

---

## 🌟 Key Architecture & Stack (Optimized for Live Deployment)

- **Frontend & Fullstack Engine:** Next.js 14+ (App Router, TypeScript, React 18)
- **Styling & Design System:** Tailwind CSS, Lucide React, Modern Humanised UX
- **Resume Rendering & Export:** Client-side vector PDF generation (`jspdf` + `html2canvas`)
- **AI Engine:** Google Gemini 1.5 Flash API + Deterministic PS1 Semantic Citation Engine (0ms fallback latency)
- **Data Persistence & Governance:** Supabase Ready + Client Storage with automated TTL expiry dates

---

## 🎯 How We Solve Every PS1 Hackathon Requirement

| Hackathon Requirement | How CareerPulse AI Solves It |
| :--- | :--- |
| **Thin or Changing Profiles** | First-year students & career-switchers receive transferable skill translations (e.g. Debate -> Cross-functional Communication) rather than empty suggestions. |
| **Trust in Job Listings** | Flags fake, stale (60+ days), or scam listings with transparent reasons; lets the candidate make the final decision rather than hiding silently. |
| **Limited Candidate Time** | Classifies listings by **Time ROI** (`High Priority - Worth Applying`, `Moderate`, or `Skip - Low ROI`) to preserve candidate hours. |
| **Candidate Application Ownership & Citations** | **Strict Zero-Hallucination Rule:** Every suggested bullet point cites the **exact source line** in the candidate's existing resume. |
| **Nothing Sent Without Approval** | System never submits anything autonomously; explicit two-step candidate approval modal required before dispatch. |
| **Honest Results & Statistical Limits** | Explicit dashboard notices explaining what sample size can and cannot conclude. |
| **Data Storage & Privacy** | User-defined data retention policy (7, 15, 30, 90 days) with automated data purging for sensitive PII. |
| **Two Days Before Interview (Extra Points)** | Generates targeted 48-hour interview battleplans, protects resume weaknesses, and surfaces top 10 peer LinkedIn search profiles. |
| **Mentor Feature: Community Debriefs** | Candidates who cracked roles submit actual interview questions, round breakdowns, and verified skills footprint. |

---

## 💡 "What We Deliberately Did Not Build" (Defense Criterion 3)

1. **Unsupervised Auto-Applying Bot:** Auto-spamming recruiters harms candidate reputation and violates ethical hiring. We built an approval-first workflow.
2. **AI Fabrication / Fake Claim Injection:** Fabricating experiences fails technical interviews. Instead, we built **Transferable Skill Reframing** backed by source citations.
3. **Black-box Job Scoring:** We never show an arbitrary percentage without explaining matching skills, missing gaps, and listing trust status.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000

# 4. Production build
npm run build
```

---

## 🌐 1-Click Live Deployment (Vercel)

1. Push code to `https://github.com/HarshCodes410/beta-20`
2. Go to [vercel.com](https://vercel.com) -> New Project -> Import `beta-20`
3. Click **Deploy**! (Build settings auto-detected).
