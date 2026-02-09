'use client';

import { useState, useEffect, useRef } from 'react';
import type { CaseInput, CaseType, CourtLevel, JudgmentType, CertifiedCopyDates } from '@/types/limitation';

interface InputFormProps {
  onSubmit: (input: CaseInput) => void;
  isLoading: boolean;
}

const CASE_TYPES: { value: CaseType; label: string; description: string; icon: string }[] = [
  { value: 'civil', label: 'Civil Case', description: 'Money suits, property disputes, contracts, family matters', icon: '\u2696' },
  { value: 'criminal', label: 'Criminal Case', description: 'Criminal trials, bail matters, appeals against conviction', icon: '\uD83D\uDD12' },
  { value: 'writ', label: 'Writ Petition', description: 'Constitutional remedies under Article 226/32', icon: '\u00A7' },
];

interface CourtOption {
  value: CourtLevel;
  label: string;
  subtitle?: string;
}

interface CourtGroup {
  heading: string;
  courts: CourtOption[];
}

const COURT_LEVELS: Record<CaseType, CourtGroup[]> = {
  civil: [
    {
      heading: 'Subordinate Courts',
      courts: [
        { value: 'civil_judge_junior', label: 'Civil Judge (Junior Division)', subtitle: 'Handles civil suits up to the lower pecuniary limit' },
        { value: 'civil_judge_senior', label: 'Civil Judge (Senior Division)', subtitle: 'Handles civil suits up to the higher pecuniary limit' },
        { value: 'district_court', label: 'District Court', subtitle: 'District Judge / Addl. District Judge' },
      ],
    },
    {
      heading: 'Special Courts',
      courts: [
        { value: 'family_court', label: 'Family Court', subtitle: 'Matrimonial disputes, custody, maintenance' },
        { value: 'commercial_court', label: 'Commercial Court', subtitle: 'Commercial disputes above Rs. 3 lakh' },
        { value: 'consumer_district', label: 'District Consumer Commission', subtitle: 'Consumer disputes (District level)' },
      ],
    },
    {
      heading: 'Higher Courts',
      courts: [
        { value: 'high_court', label: 'High Court' },
        { value: 'supreme_court', label: 'Supreme Court' },
      ],
    },
  ],
  criminal: [
    {
      heading: 'Subordinate Courts',
      courts: [
        { value: 'jmfc', label: 'JMFC / Metropolitan Magistrate', subtitle: 'Judicial Magistrate First Class; Metropolitan Magistrate in metro cities' },
        { value: 'cjm', label: 'Chief Judicial Magistrate', subtitle: 'CJM — heads the magistracy at district level' },
        { value: 'sessions_court', label: 'Sessions Court', subtitle: 'Sessions Judge / Addl. Sessions Judge' },
      ],
    },
    {
      heading: 'Higher Courts',
      courts: [
        { value: 'high_court', label: 'High Court' },
        { value: 'supreme_court', label: 'Supreme Court' },
      ],
    },
  ],
  writ: [
    {
      heading: 'Courts',
      courts: [
        { value: 'high_court', label: 'High Court' },
        { value: 'supreme_court', label: 'Supreme Court' },
      ],
    },
  ],
};

const JUDGMENT_TYPES: { value: JudgmentType; label: string; description: string }[] = [
  { value: 'final', label: 'Final Judgment / Decree', description: 'Concludes the matter completely' },
  { value: 'interim', label: 'Interim Order', description: 'Temporary or interlocutory order' },
];

const AUTO_ADVANCE_DELAY_MS = 300;

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [step, setStep] = useState(1);
  const [caseType, setCaseType] = useState<CaseType | ''>('');
  const [courtLevel, setCourtLevel] = useState<CourtLevel | ''>('');
  const [judgmentType, setJudgmentType] = useState<JudgmentType | ''>('');
  const [judgmentDate, setJudgmentDate] = useState('');
  const [showCertifiedCopy, setShowCertifiedCopy] = useState(false);
  const [certifiedCopy, setCertifiedCopy] = useState<CertifiedCopyDates>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Track whether the user just navigated back (to prevent re-advance on same selection)
  const navigatedBackRef = useRef(false);
  const prevCaseTypeRef = useRef<CaseType | ''>('');
  const prevCourtLevelRef = useRef<CourtLevel | ''>('');
  const prevJudgmentTypeRef = useRef<JudgmentType | ''>('');

  // Auto-advance for Steps 1-3: selection triggers advance after 300ms visual feedback
  useEffect(() => {
    if (caseType && step === 1) {
      // If navigated back and re-selected the same value, don't auto-advance
      if (navigatedBackRef.current && caseType === prevCaseTypeRef.current) {
        navigatedBackRef.current = false;
        return;
      }
      navigatedBackRef.current = false;
      prevCaseTypeRef.current = caseType;
      const timer = setTimeout(() => setStep(2), AUTO_ADVANCE_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [caseType, step]);

  useEffect(() => {
    if (courtLevel && step === 2) {
      if (navigatedBackRef.current && courtLevel === prevCourtLevelRef.current) {
        navigatedBackRef.current = false;
        return;
      }
      navigatedBackRef.current = false;
      prevCourtLevelRef.current = courtLevel;
      const timer = setTimeout(() => setStep(3), AUTO_ADVANCE_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [courtLevel, step]);

  useEffect(() => {
    if (judgmentType && step === 3) {
      if (navigatedBackRef.current && judgmentType === prevJudgmentTypeRef.current) {
        navigatedBackRef.current = false;
        return;
      }
      navigatedBackRef.current = false;
      prevJudgmentTypeRef.current = judgmentType;
      const timer = setTimeout(() => setStep(4), AUTO_ADVANCE_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [judgmentType, step]);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !caseType) {
      newErrors.caseType = 'Please select a case type';
    }
    if (currentStep === 2 && !courtLevel) {
      newErrors.courtLevel = 'Please select the court';
    }
    if (currentStep === 3 && !judgmentType) {
      newErrors.judgmentType = 'Please select judgment type';
    }
    if (currentStep === 4 && !judgmentDate) {
      newErrors.judgmentDate = 'Please enter the judgment date';
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
      navigatedBackRef.current = true;
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="card p-6 md:p-8">
      {/* Step 1: Case Type */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-slate-900)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
              What type of case is this?
            </h2>
            <p style={{ color: 'var(--color-neutral-500)' }}>Select the nature of your legal matter</p>
          </div>
          <div className="space-y-4">
            {CASE_TYPES.map((type, index) => (
              <button
                key={type.value}
                aria-pressed={caseType === type.value}
                onClick={() => { setCaseType(type.value); setCourtLevel(''); setErrors({}); }}
                className={`selection-card ${caseType === type.value ? 'selected' : ''} stagger-${index + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{type.icon}</span>
                  <div className="flex-1 pr-8">
                    <div className="font-semibold text-lg" style={{ color: 'var(--color-slate-800)' }}>{type.label}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--color-neutral-500)' }}>{type.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {errors.caseType && <div className="alert alert-danger mt-4"><span>!!</span><span>{errors.caseType}</span></div>}
        </div>
      )}

      {/* Step 2: Court Level */}
      {step === 2 && caseType && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-slate-900)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
              Which court passed the judgment?
            </h2>
            <p style={{ color: 'var(--color-neutral-500)' }}>Select the court that delivered the order</p>
          </div>
          <div className="space-y-6">
            {COURT_LEVELS[caseType].map((group) => (
              <div key={group.heading}>
                <div
                  className="flex items-center gap-3 mb-3 px-1"
                >
                  <div className="h-px flex-1" style={{ background: 'var(--color-neutral-200)' }} />
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--color-neutral-400)' }}
                  >
                    {group.heading}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'var(--color-neutral-200)' }} />
                </div>
                <div className="space-y-3">
                  {group.courts.map((court) => (
                    <button
                      key={court.value}
                      aria-pressed={courtLevel === court.value}
                      onClick={() => { setCourtLevel(court.value); setErrors({}); }}
                      className={`selection-card ${courtLevel === court.value ? 'selected' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl mt-0.5">{'\uD83C\uDFDB'}</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-lg" style={{ color: 'var(--color-slate-800)' }}>{court.label}</div>
                          {court.subtitle && (
                            <div className="text-sm mt-0.5" style={{ color: 'var(--color-neutral-500)' }}>{court.subtitle}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {errors.courtLevel && <div className="alert alert-danger mt-4"><span>!!</span><span>{errors.courtLevel}</span></div>}
        </div>
      )}

      {/* Step 3: Judgment Type */}
      {step === 3 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-slate-900)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
              What type of order is this?
            </h2>
            <p style={{ color: 'var(--color-neutral-500)' }}>Is it a final judgment or an interim order?</p>
          </div>
          <div className="space-y-4">
            {JUDGMENT_TYPES.map((type, index) => (
              <button
                key={type.value}
                aria-pressed={judgmentType === type.value}
                onClick={() => { setJudgmentType(type.value); setErrors({}); }}
                className={`selection-card ${judgmentType === type.value ? 'selected' : ''} stagger-${index + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{type.value === 'final' ? '\u2713' : '\u23F8'}</span>
                  <div className="flex-1 pr-8">
                    <div className="font-semibold text-lg" style={{ color: 'var(--color-slate-800)' }}>{type.label}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--color-neutral-500)' }}>{type.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {errors.judgmentType && <div className="alert alert-danger mt-4"><span>!!</span><span>{errors.judgmentType}</span></div>}
        </div>
      )}

      {/* Step 4: Dates */}
      {step === 4 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-slate-900)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
              When was the judgment delivered?
            </h2>
            <p style={{ color: 'var(--color-neutral-500)' }}>Enter the date of the order/judgment</p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <label className="input-label">
                <span className="flex items-center gap-2">Judgment Date <span style={{ color: 'var(--color-amber-600)' }}>*</span></span>
              </label>
              <input type="date" value={judgmentDate} max={today} onChange={(e) => { setJudgmentDate(e.target.value); setErrors({}); }} className="input" />
              {errors.judgmentDate && <p className="text-sm mt-2 flex items-center gap-1" style={{ color: 'var(--color-amber-600)' }}>{errors.judgmentDate}</p>}
            </div>
            <div style={{ borderTop: '1px solid var(--color-neutral-200)', paddingTop: '1.5rem' }}>
              <button type="button" onClick={() => setShowCertifiedCopy(!showCertifiedCopy)} className="flex items-center gap-2 font-medium transition-colors" style={{ color: 'var(--color-slate-600)' }}>
                <span className={`transform transition-transform ${showCertifiedCopy ? 'rotate-90' : ''}`}>{'\u25B6'}</span>
                <span>Add certified copy dates</span>
                <span className="badge badge-success text-xs">Optional</span>
              </button>
              {showCertifiedCopy && (
                <div className="mt-4 p-5 rounded-xl border animate-fade-in-scale" style={{ background: 'var(--color-neutral-50)', borderColor: 'var(--color-neutral-200)' }}>
                  <div className="alert alert-info mb-4">
                    <span>i</span>
                    <span className="text-sm">Time taken to obtain certified copy may be excluded from limitation period (Section 12(2), Limitation Act)</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="input-label">Date Applied for Copy</label>
                      <input type="date" value={certifiedCopy.appliedDate || ''} max={today} min={judgmentDate} onChange={(e) => setCertifiedCopy({ ...certifiedCopy, appliedDate: e.target.value })} className="input" />
                    </div>
                    <div>
                      <label className="input-label">Date Copy Was Ready</label>
                      <input type="date" value={certifiedCopy.readyDate || ''} max={today} min={certifiedCopy.appliedDate || judgmentDate} onChange={(e) => setCertifiedCopy({ ...certifiedCopy, readyDate: e.target.value })} className="input" />
                    </div>
                    <div>
                      <label className="input-label">Date Copy Received</label>
                      <input type="date" value={certifiedCopy.receivedDate || ''} max={today} min={certifiedCopy.appliedDate || judgmentDate} onChange={(e) => setCertifiedCopy({ ...certifiedCopy, receivedDate: e.target.value })} className="input" />
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
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-slate-900)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
              Review Your Information
            </h2>
            <p style={{ color: 'var(--color-neutral-500)' }}>Please verify the details before calculating</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="rounded-xl p-6 border" style={{ background: 'linear-gradient(to bottom right, var(--color-slate-50), var(--color-neutral-50))', borderColor: 'var(--color-slate-200)' }}>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                  <span className="flex items-center gap-2" style={{ color: 'var(--color-neutral-500)' }}>{'\u2696'} Case Type</span>
                  <span className="font-semibold" style={{ color: 'var(--color-slate-800)' }}>{CASE_TYPES.find((t) => t.value === caseType)?.label}</span>
                </div>
                <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                  <span className="flex items-center gap-2" style={{ color: 'var(--color-neutral-500)' }}>{'\uD83C\uDFDB'} Court</span>
                  <span className="font-semibold" style={{ color: 'var(--color-slate-800)' }}>{caseType && COURT_LEVELS[caseType as CaseType].flatMap((g) => g.courts).find((c) => c.value === courtLevel)?.label}</span>
                </div>
                <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                  <span className="flex items-center gap-2" style={{ color: 'var(--color-neutral-500)' }}>Order Type</span>
                  <span className="font-semibold" style={{ color: 'var(--color-slate-800)' }}>{JUDGMENT_TYPES.find((t) => t.value === judgmentType)?.label}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="flex items-center gap-2" style={{ color: 'var(--color-neutral-500)' }}>Judgment Date</span>
                  <span className="font-semibold" style={{ color: 'var(--color-slate-800)' }}>{judgmentDate && new Date(judgmentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                {showCertifiedCopy && certifiedCopy.appliedDate && (
                  <div className="pt-4 mt-2" style={{ borderTop: '2px dashed var(--color-neutral-300)' }}>
                    <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-neutral-600)' }}>Certified Copy Details:</p>
                    {certifiedCopy.appliedDate && <div className="flex justify-between text-sm py-1"><span style={{ color: 'var(--color-neutral-500)' }}>Applied:</span><span className="font-medium">{new Date(certifiedCopy.appliedDate).toLocaleDateString('en-IN')}</span></div>}
                    {certifiedCopy.receivedDate && <div className="flex justify-between text-sm py-1"><span style={{ color: 'var(--color-neutral-500)' }}>Received:</span><span className="font-medium">{new Date(certifiedCopy.receivedDate).toLocaleDateString('en-IN')}</span></div>}
                  </div>
                )}
              </div>
            </div>
            <div className="alert alert-warning mt-6">
              <span className="text-xl">!!</span>
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
        {step > 1 ? <button onClick={handleBack} className="btn btn-ghost"><span>{'\u2190'}</span><span>Back</span></button> : <div />}
        {step === 4 ? (
          <button onClick={handleNext} className="btn btn-success"><span>Continue</span><span>{'\u2192'}</span></button>
        ) : step === 5 ? (
          <button onClick={handleSubmit} disabled={isLoading} className="btn btn-success disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? <><span className="animate-spin">{'\u23F3'}</span><span>Calculating...</span></> : <><span>Calculate Limitation</span><span>{'\u2192'}</span></>}
          </button>
        ) : null}
      </div>
    </div>
  );
}
