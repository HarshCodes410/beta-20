import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerPulse AI | Autonomous Job & Career Copilot (Team Beta-20)",
  description: "Autonomous job search, ATS resume optimizer with citation engine, trust verification, and post-shortlist interview copilot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
