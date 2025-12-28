"use client";

import { useState } from "react";
import { CaseInput, CaseType, CourtLevel, JudgmentType, CertifiedCopyDates } from "@/types";

interface InputFormProps {
  onSubmit: (input: CaseInput) => void;
  isLoading: boolean;
}

const CASE_TYPES: { value: CaseType; label: string; description: string; icon: string }[] = [
  { value: "civil", label: "Civil Case", description: "Money suits, property disputes, contracts, family matters", icon: "⚖️" },
  { value: "criminal", label: "Criminal Case", description: "Criminal trials, bail matters, appeals against conviction", icon: "🔒" },
  { value: "writ", label: "Writ Petition", description: "Constitutional remedies under Article 226/32", icon: "📜" },
];

const COURT_LEVELS: Record<CaseType, { value: CourtLevel; label: string; icon: string }[]> = {
  civil: [
    { value: "district_court", label: "District Court", icon: "🏛️" },
    { value: "high_court", label: "High Court", icon: "🏛️" },
    { value: "supreme_court", label: "Supreme Court", icon: "🏛️" },
  ],
  criminal: [
    { value: "sessions_court", label: "Sessions Court", icon: "🏛️" },
    { value: "high_court", label: "High Court", icon: "🏛️" },
    { value: "supreme_court", label: "Supreme Court", icon: "🏛️" },
  ],
  writ: [
    { value: "high_court", label: "High Court", icon: "🏛️" },
    { value: "supreme_court", label: "Supreme Court", icon: "🏛️" },
  ],
};

const JUDGMENT_TYPES: { value: JudgmentType; label: string; description: string; icon: string }[] = [
  { value: "final", label: "Final Judgment / Decree", description: "Concludes the matter completely", icon: "✅" },
  { value: "interim", label: "Interim Order", description: "Temporary or interlocutory order", icon: "⏸️" },
];

const STEP_LABELS = [
  { title: "Case Type", short: "Type" },
  { title: "Court", short: "Court" },
  { title: "Order Type", short: "Order" },
  { title: "Dates", short: "Dates" },
  { title: "Review", short: "Review" },
];

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [step, setStep] = useState(1);
  const [caseType, setCaseType] = useState<CaseType | "">("");
  const [courtLevel, setCourtLevel] = useState<CourtLevel | "">("");
  const [judgmentType, setJudgmentType] = useState<JudgmentType | "">("");
  const [judgmentDate, setJudgmentDate] = useState("");
  const [showCertifiedCopy, setShowCertifiedCopy] = useState(false);
  const [certifiedCopy, setCertifiedCopy] = useState<CertifiedCopyDates>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !caseType) {
      newErrors.caseType = "Please select a case type";
    }
    if (currentStep === 2 && !courtLevel) {
      newErrors.courtLevel = "Please select the court";
    }
    if (currentStep === 3 && !judgmentType) {
      newErrors.judgmentType = "Please select judgment type";
    }
    if (currentStep === 4 && !judgmentDate) {
      newErrors.judgmentDate = "Please enter the judgment date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 5) {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!caseType || !courtLevel || !judgmentType || !judgmentDate) {
      return;
    }

    const input: CaseInput = {
      caseType,
      courtLevel,
      judgmentType,
      judgmentDate,
      certifiedCopy: showCertifiedCopy && (certifiedCopy.appliedDate || certifiedCopy.receivedDate)
        ? certifiedCopy
        : undefined,
    };

    onSubmit(input);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="card p-6 md:p-8">
      {/* Step Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {STEP_LABELS.map((label, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < step;
            const isActive = stepNum === step;

            return (
              <div key={stepNum} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div className={`h-0.5 flex-1 transition-colors duration-300 ${stepNum <= step ? 'bg-indigo-500' : 'bg-gray-200'}`} />
                  )}
                  <div className={`step-indicator ${isCompleted ? 'completed' : isActive ? 'active' : 'pending'}`}>
                    {isCompleted ? '✓' : stepNum}
                  </div>
                  {index < STEP_LABELS.length - 1 && (
                    <div className={`h-0.5 flex-1 transition-colors duration-300 ${stepNum < step ? 'bg-indigo-500' : 'bg-gray-200'}`} />
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium hidden md:block ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {label.title}
                </span>
                <span className={`mt-2 text-xs font-medium md:hidden ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {label.short}
                </span>
              </div>
            );
          })}
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${((step - 1) / 4) * 100}%` }} />
        </div>
      </div>

      {/* Step 1: Case Type */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of case is this?</h2>
            <p className="text-gray-500">Select the nature of your legal matter</p>
          </div>
          <div className="space-y-4">
            {CASE_TYPES.map((type, index) => (
              <button
                key={type.value}
                onClick={() => { setCaseType(type.value); setCourtLevel(""); setErrors({}); }}
                className={`selection-card ${caseType === type.value ? 'selected' : ''} stagger-${index + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{type.icon}</span>
                  <div className="flex-1 pr-8">
                    <div className="font-semibold text-gray-800 text-lg">{type.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {errors.caseType && <div className="alert alert-danger mt-4"><span>⚠️</span><span>{errors.caseType}</span></div>}
        </div>
      )}

      {/* Step 2: Court Level */}
      {step === 2 && caseType && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Which court passed the judgment?</h2>
            <p className="text-gray-500">Select the court that delivered the order</p>
          </div>
          <div className="space-y-4">
            {COURT_LEVELS[caseType].map((court, index) => (
              <button
                key={court.value}
                onClick={() => { setCourtLevel(court.value); setErrors({}); }}
                className={`selection-card ${courtLevel === court.value ? 'selected' : ''} stagger-${index + 1}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{court.icon}</span>
                  <div className="font-semibold text-gray-800 text-lg">{court.label}</div>
                </div>
              </button>
            ))}
          </div>
          {errors.courtLevel && <div className="alert alert-danger mt-4"><span>⚠️</span><span>{errors.courtLevel}</span></div>}
        </div>
      )}

      {/* Step 3: Judgment Type */}
      {step === 3 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of order is this?</h2>
            <p className="text-gray-500">Is it a final judgment or an interim order?</p>
          </div>
          <div className="space-y-4">
            {JUDGMENT_TYPES.map((type, index) => (
              <button
                key={type.value}
                onClick={() => { setJudgmentType(type.value); setErrors({}); }}
                className={`selection-card ${judgmentType === type.value ? 'selected' : ''} stagger-${index + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{type.icon}</span>
                  <div className="flex-1 pr-8">
                    <div className="font-semibold text-gray-800 text-lg">{type.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {errors.judgmentType && <div className="alert alert-danger mt-4"><span>⚠️</span><span>{errors.judgmentType}</span></div>}
        </div>
      )}

      {/* Step 4: Dates */}
      {step === 4 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">When was the judgment delivered?</h2>
            <p className="text-gray-500">Enter the date of the order/judgment</p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <label className="input-label">
                <span className="flex items-center gap-2">📅 Judgment Date <span className="text-red-500">*</span></span>
              </label>
              <input type="date" value={judgmentDate} max={today} onChange={(e) => { setJudgmentDate(e.target.value); setErrors({}); }} className="input" />
              {errors.judgmentDate && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠️</span> {errors.judgmentDate}</p>}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <button type="button" onClick={() => setShowCertifiedCopy(!showCertifiedCopy)} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                <span className={`transform transition-transform ${showCertifiedCopy ? 'rotate-90' : ''}`}>▶</span>
                <span>Add certified copy dates</span>
                <span className="badge badge-success text-xs">Optional</span>
              </button>
              {showCertifiedCopy && (
                <div className="mt-4 p-5 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in-scale">
                  <div className="alert alert-info mb-4">
                    <span>💡</span>
                    <span className="text-sm">Time taken to obtain certified copy may be excluded from limitation period (Section 12(2), Limitation Act)</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="input-label">Date Applied for Copy</label>
                      <input type="date" value={certifiedCopy.appliedDate || ""} max={today} min={judgmentDate} onChange={(e) => setCertifiedCopy({ ...certifiedCopy, appliedDate: e.target.value })} className="input" />
                    </div>
                    <div>
                      <label className="input-label">Date Copy Was Ready</label>
                      <input type="date" value={certifiedCopy.readyDate || ""} max={today} min={certifiedCopy.appliedDate || judgmentDate} onChange={(e) => setCertifiedCopy({ ...certifiedCopy, readyDate: e.target.value })} className="input" />
                    </div>
                    <div>
                      <label className="input-label">Date Copy Received</label>
                      <input type="date" value={certifiedCopy.receivedDate || ""} max={today} min={certifiedCopy.appliedDate || judgmentDate} onChange={(e) => setCertifiedCopy({ ...certifiedCopy, receivedDate: e.target.value })} className="input" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Review & Submit */}
      {step === 5 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
            <p className="text-gray-500">Please verify the details before calculating</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-gray-50 rounded-xl p-6 border border-indigo-100">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-500 flex items-center gap-2"><span>⚖️</span> Case Type</span>
                  <span className="font-semibold text-gray-800">{CASE_TYPES.find((t) => t.value === caseType)?.label}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-500 flex items-center gap-2"><span>🏛️</span> Court</span>
                  <span className="font-semibold text-gray-800">{caseType && COURT_LEVELS[caseType].find((c) => c.value === courtLevel)?.label}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-500 flex items-center gap-2"><span>📋</span> Order Type</span>
                  <span className="font-semibold text-gray-800">{JUDGMENT_TYPES.find((t) => t.value === judgmentType)?.label}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500 flex items-center gap-2"><span>📅</span> Judgment Date</span>
                  <span className="font-semibold text-gray-800">{judgmentDate && new Date(judgmentDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                {showCertifiedCopy && certifiedCopy.appliedDate && (
                  <div className="pt-4 mt-2 border-t-2 border-dashed border-gray-300">
                    <p className="text-sm font-medium text-gray-600 mb-3">Certified Copy Details:</p>
                    {certifiedCopy.appliedDate && <div className="flex justify-between text-sm py-1"><span className="text-gray-500">Applied:</span><span className="font-medium">{new Date(certifiedCopy.appliedDate).toLocaleDateString("en-IN")}</span></div>}
                    {certifiedCopy.receivedDate && <div className="flex justify-between text-sm py-1"><span className="text-gray-500">Received:</span><span className="font-medium">{new Date(certifiedCopy.receivedDate).toLocaleDateString("en-IN")}</span></div>}
                  </div>
                )}
              </div>
            </div>
            <div className="alert alert-warning mt-6">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-semibold">Important Disclaimer</p>
                <p className="text-sm mt-1">This tool provides indicative timelines only. Actual limitation may vary based on specific circumstances, court rules, and judicial discretion. This is not legal advice.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center">
        {step > 1 ? <button onClick={handleBack} className="btn btn-ghost"><span>←</span><span>Back</span></button> : <div />}
        {step < 5 ? (
          <button onClick={handleNext} className="btn btn-primary"><span>Continue</span><span>→</span></button>
        ) : (
          <button onClick={handleSubmit} disabled={isLoading} className="btn btn-success disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? <><span className="animate-spin">⏳</span><span>Calculating...</span></> : <><span>Calculate Limitation</span><span>→</span></>}
          </button>
        )}
      </div>
    </div>
  );
}
