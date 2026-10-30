"use client";

import React, { useState } from "react";
import { X, Mail, Phone, MapPin, User, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";
import { UserProfile } from "@/types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSave: (updated: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserProfile>(currentUser);
  const [step, setStep] = useState<"details" | "verify">("details");
  
  // Simulated OTP codes
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState<string>("849201");
  const [generatedSmsOtp, setGeneratedSmsOtp] = useState<string>("512934");
  
  const [emailOtpInput, setEmailOtpInput] = useState<string>("");
  const [smsOtpInput, setSmsOtpInput] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg("Please fill in your name, Gmail, and phone number.");
      return;
    }
    // Generate fresh random OTPs
    const eOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const sOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedEmailOtp(eOtp);
    setGeneratedSmsOtp(sOtp);
    setErrorMsg("");
    setStep("verify");
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      if (emailOtpInput.trim() !== generatedEmailOtp) {
        setErrorMsg("Invalid Email OTP. Please check the code.");
        setIsVerifying(false);
        return;
      }
      if (smsOtpInput.trim() !== generatedSmsOtp) {
        setErrorMsg("Invalid SMS OTP. Please check the code.");
        setIsVerifying(false);
        return;
      }

      const updated = {
        ...formData,
        emailVerified: true,
        smsVerified: true,
      };
      onSave(updated);
      setIsVerifying(false);
      onClose();
    }, 600);
  };

  const autofillDemoCodes = () => {
    setEmailOtpInput(generatedEmailOtp);
    setSmsOtpInput(generatedSmsOtp);
    setErrorMsg("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-300" />
              <h2 className="text-lg font-bold">Candidate Authentication</h2>
            </div>
            <p className="text-xs text-indigo-200 mt-0.5">
              Dual-Channel Verification: Gmail + SMS OTP
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {step === "details" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Arjun Mehta"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Gmail Address (Will receive OTP)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Contact Phone (SMS OTP)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Current City / Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Bhopal, MP"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Primary Target Domain / Role
                </label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  placeholder="e.g. Full Stack Developer, AI/ML, Chartered Accountant"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition"
              >
                <span>Dispatch OTPs to Gmail & SMS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Demo Hint Banner so Hackathon Judges never get stuck */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>⚡ Live Hackathon Demo Simulator:</span>
                  <button
                    onClick={autofillDemoCodes}
                    className="underline text-indigo-700 hover:text-indigo-900"
                  >
                    1-Click Autofill
                  </button>
                </div>
                <p>
                  Dispatched codes: Email OTP is <strong className="font-mono bg-white px-1 py-0.5 rounded border border-amber-300">{generatedEmailOtp}</strong> | 
                  SMS OTP is <strong className="font-mono bg-white px-1 py-0.5 rounded border border-amber-300">{generatedSmsOtp}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Enter 6-Digit Email OTP (Sent to {formData.email})
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={emailOtpInput}
                  onChange={(e) => setEmailOtpInput(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full px-4 py-2.5 text-center tracking-widest font-mono text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Enter 6-Digit SMS OTP (Sent to {formData.phone})
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={smsOtpInput}
                  onChange={(e) => setSmsOtpInput(e.target.value)}
                  placeholder="e.g. 512934"
                  className="w-full px-4 py-2.5 text-center tracking-widest font-mono text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="w-1/3 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="w-2/3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-100 transition disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Confirm Account</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
