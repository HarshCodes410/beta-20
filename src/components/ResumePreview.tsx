"use client";

import React from "react";
import { ResumeData } from "@/types";
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Award, Briefcase, GraduationCap, Code } from "lucide-react";

interface ResumePreviewProps {
  resume: ResumeData;
  template: "modern" | "academic" | "minimal";
  id?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  template = "modern",
  id = "resume-preview-sheet"
}) => {
  const { personalInfo, experiences, projects, education, skills, achievements } = resume;

  if (template === "academic") {
    // Overleaf LaTeX Inspired Style (Formal, Serif, Classic ATS-friendly)
    return (
      <div
        id={id}
        className="w-full bg-white p-8 sm:p-12 shadow-md border border-slate-200 font-serif text-slate-900 leading-relaxed max-w-[820px] mx-auto min-h-[1050px]"
      >
        {/* Academic Header */}
        <div className="text-center border-b pb-3 mb-4 border-slate-300">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700 mt-1 font-sans">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && (
              <span>• <a href={personalInfo.linkedin} className="underline text-indigo-800">LinkedIn</a></span>
            )}
            {personalInfo.github && (
              <span>• <a href={personalInfo.github} className="underline text-indigo-800">GitHub</a></span>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-4 text-xs text-slate-800 text-justify">
            {personalInfo.summary}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-0.5 mb-2 font-sans">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold">
                    <span>{edu.institution}</span>
                    <span className="font-sans font-normal text-[11px] text-slate-600">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-800 italic">
                    <span>{edu.degree} in {edu.field}</span>
                    {edu.grade && <span className="font-sans not-italic text-slate-700 font-semibold">{edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-0.5 mb-2 font-sans">
              Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold">
                    <span>{exp.role} — <span className="italic font-normal">{exp.company}</span></span>
                    <span className="font-sans font-normal text-[11px] text-slate-600">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-slate-800">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-[11.5px] leading-snug">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Projects */}
        {projects.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-0.5 mb-2 font-sans">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold">
                    <span>
                      {proj.title}
                      {proj.technologies.length > 0 && (
                        <span className="font-sans text-[11px] font-normal text-slate-600 ml-1">
                          | {proj.technologies.join(", ")}
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <a href={proj.link} className="font-sans text-[11px] text-indigo-700 underline font-normal">
                        Link
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-700 italic mt-0.5">{proj.description}</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-800">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-[11.5px] leading-snug">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-0.5 mb-2 font-sans">
              Skills
            </h2>
            <div className="text-xs space-y-1">
              {skills.map((sc, i) => (
                <div key={i}>
                  <strong className="font-sans">{sc.category}:</strong>{" "}
                  <span className="text-slate-800">{sc.items.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-800 pb-0.5 mb-2 font-sans">
              Honors & Leadership
            </h2>
            <ul className="list-disc list-inside text-xs space-y-1 text-slate-800">
              {achievements.map((ach, i) => (
                <li key={i} className="text-[11.5px]">{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  // Modern FlowCV / Reactive Resume Style (Contemporary, clean sans-serif)
  return (
    <div
      id={id}
      className="w-full bg-white p-8 sm:p-12 shadow-lg border border-slate-200 font-sans text-slate-800 max-w-[820px] mx-auto min-h-[1050px]"
    >
      {/* Header */}
      <div className="border-b border-indigo-100 pb-5 mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-sm font-semibold text-indigo-600 mt-1">
          {resume.personalInfo.summary ? resume.personalInfo.summary.split(".")[0] : "Full Stack Software Engineer"}
        </p>

        {/* Contact Badges */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 mt-3 font-medium">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-indigo-500" />
              <a href={personalInfo.linkedin} className="text-indigo-600 hover:underline">LinkedIn</a>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-indigo-500" />
              <a href={personalInfo.github} className="text-indigo-600 hover:underline">GitHub</a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs leading-relaxed text-slate-700">
          {personalInfo.summary}
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 rounded bg-indigo-100 text-indigo-700">
              <Briefcase className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Work & Contributions
            </h2>
          </div>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-4 border-l-2 border-indigo-200">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-[11px] font-medium text-slate-500">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-indigo-600 mb-1">{exp.company}</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="leading-snug">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 rounded bg-indigo-100 text-indigo-700">
              <Code className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Key Engineering Projects
            </h2>
          </div>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} className="text-[11px] font-semibold text-indigo-600 hover:underline">
                      Live Project ↗
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {proj.technologies.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-medium text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700">
                  {proj.highlights.map((h, i) => (
                    <li key={i} className="leading-snug">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Matrix */}
      {skills.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 rounded bg-indigo-100 text-indigo-700">
              <Code className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Skills & Tech Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((sc, i) => (
              <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-1">
                  {sc.category}
                </div>
                <div className="flex flex-wrap gap-1">
                  {sc.items.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 text-[11px] font-medium bg-white rounded border border-slate-200 text-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Achievements in 2 Cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-indigo-100 text-indigo-700">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Education
              </h2>
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-900">{edu.institution}</div>
                <div className="text-slate-700">{edu.degree} - {edu.field}</div>
                <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                  <span>{edu.startDate} – {edu.endDate}</span>
                  {edu.grade && <span className="font-semibold text-slate-700">{edu.grade}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {achievements.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-indigo-100 text-indigo-700">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Honors & Extracurricular
              </h2>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                {achievements.map((ach, i) => (
                  <li key={i} className="leading-snug">{ach}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
