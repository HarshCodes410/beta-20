import { PeerInterviewInsight } from "@/types";

export const initialPeerInsights: PeerInterviewInsight[] = [
  {
    id: "insight-1",
    candidateName: "Aakash Verma",
    company: "Razorpay",
    role: "Junior Full Stack Engineer",
    rounds: [
      {
        roundName: "Round 1: DSA & JavaScript Core",
        focus: "Closures, Event Loop, Promises, and 2 medium LeetCode questions (Arrays & Binary Search)."
      },
      {
        roundName: "Round 2: Machine Coding (90 mins)",
        focus: "Build a mini checkout modal with state management, debounce search, and error boundary in React."
      },
      {
        roundName: "Round 3: Techno-Behavioral / Cultural",
        focus: "Handling edge cases in payments, how you resolved a team conflict during college hackathon."
      }
    ],
    questionsAsked: [
      "How do Next.js App Router server components differ from client components?",
      "Design an idempotent payment retry mechanism.",
      "Tell me about a time you had to deliver a feature under an aggressive deadline."
    ],
    preparationAdvice: "Don't just memorize LeetCode! They care deeply about clean React state handling and how you write readable code during the machine coding round.",
    skillsVerified: ["React 18", "Next.js", "TypeScript", "Tailwind CSS", "REST API Idempotency"],
    createdAt: "2 weeks ago"
  },
  {
    id: "insight-2",
    candidateName: "Priya Sharma",
    company: "Swiggy",
    role: "AI / ML Engineer",
    rounds: [
      {
        roundName: "Round 1: Python & Math Foundations",
        focus: "Linear algebra, matrix operations, gradient descent mathematics, and NumPy coding."
      },
      {
        roundName: "Round 2: ML System Architecture",
        focus: "How to handle cold start problem in restaurant recommendation and real-time inference latency."
      },
      {
        roundName: "Round 3: Director Interview",
        focus: "Evaluation metrics (NDCG vs Precision@K) and practical production trade-offs."
      }
    ],
    questionsAsked: [
      "Why use embeddings instead of simple TF-IDF for search retrieval?",
      "How do you monitor LLM hallucination and drift in production?",
      "Walk me through your end-to-end ML pipeline project on GitHub."
    ],
    preparationAdvice: "Be ready to defend every single line on your resume. If you wrote PyTorch, know how autograd works under the hood!",
    skillsVerified: ["Python", "PyTorch", "FastAPI", "Vector Embeddings", "RAG Systems"],
    createdAt: "1 month ago"
  },
  {
    id: "insight-3",
    candidateName: "Rohan Kulkarni",
    company: "Postman",
    role: "Frontend Engineer",
    rounds: [
      {
        roundName: "Round 1: Web Performance & DOM",
        focus: "Critical rendering path, web workers, virtual list rendering with 100k rows."
      },
      {
        roundName: "Round 2: System Design (Frontend)",
        focus: "Architecting an API client workbench with tab persistence and offline caching."
      }
    ],
    questionsAsked: [
      "Explain how browser layout recalculation is triggered and how to avoid reflow thrashing.",
      "How would you optimize bundle size when using heavy external libraries?"
    ],
    preparationAdvice: "Focus heavily on browser fundamentals and TypeScript generics. They value engineering depth over framework-only tricks.",
    skillsVerified: ["TypeScript", "Web Performance", "State Architecture", "CSS Layouts"],
    createdAt: "3 weeks ago"
  }
];
