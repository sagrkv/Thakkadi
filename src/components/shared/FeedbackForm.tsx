'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const TYPES = [
  { value: 'bug', label: 'Bug or rule issue' },
  { value: 'feature', label: 'Feature request' },
  { value: 'general', label: 'General feedback' },
] as const;
const CALCULATORS = [
  { value: '', label: 'General / other' },
  { value: 'limitation', label: 'Limitation Calculator' },
  { value: 'court-fee', label: 'Court Fee Calculator' },
  { value: 'stamp-duty', label: 'Stamp Duty Calculator' },
];

export default function FeedbackForm() {
  const searchParams = useSearchParams();
  const [type, setType] = useState<string>('general');
  const [calculator, setCalculator] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [draftUrl, setDraftUrl] = useState('');

  useEffect(() => {
    const value = searchParams.get('calculator');
    if (value && CALCULATORS.some((item) => item.value === value)) {
      setCalculator(value);
      setType('bug');
    }
  }, [searchParams]);

  function prepareDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (message.trim().length < 10) {
      setError('Please describe the issue or suggestion in at least 10 characters.');
      document.getElementById('feedback-message')?.focus();
      return;
    }
    const category = TYPES.find((item) => item.value === type)!.label;
    const tool = CALCULATORS.find((item) => item.value === calculator)!.label;
    const params = new URLSearchParams({ title: `${category}: ${tool}`, body: `Calculator: ${tool}\n\n${message.trim()}` });
    setDraftUrl(`https://github.com/sagrkv/Thakkadi/issues/new?${params}`);
  }

  return (
    <form onSubmit={prepareDraft} className="card feedback-form" onChange={() => { setDraftUrl(''); setError(''); }}>
      <fieldset className="form-group">
        <legend className="form-label">What kind of feedback?</legend>
        <div className="feedback-types">
          {TYPES.map((item) => <label key={item.value} className="feedback-type-pill" data-selected={type === item.value}>
            <input type="radio" name="feedback-type" value={item.value} checked={type === item.value} onChange={() => setType(item.value)} />
            {item.label}
          </label>)}
        </div>
      </fieldset>
      <div className="form-group">
        <label className="form-label" htmlFor="feedback-calculator">Related calculator</label>
        <select id="feedback-calculator" className="form-select" value={calculator} onChange={(event) => setCalculator(event.target.value)}>
          {CALCULATORS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="feedback-message">Your message</label>
        <textarea id="feedback-message" className="form-input" rows={6} maxLength={2000} aria-required="true" aria-invalid={!!error} aria-describedby={error ? 'feedback-help feedback-error' : 'feedback-help'} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What happened? What did you expect? Use a made-up example to explain the issue." />
        <p id="feedback-help" className="form-helper">GitHub issues are public. Leave out names, case details and contact information. {message.length}/2000 characters.</p>
        {error && <p id="feedback-error" className="form-error" role="alert">{error}</p>}
      </div>
      <p className="form-helper mb-4">A GitHub account is needed to submit. You can review and edit your draft on GitHub before posting it.</p>
      <button type="submit" className="btn-primary">Prepare GitHub issue</button>
      {draftUrl && <div className="feedback-draft" role="status"><p>Your draft is ready. Open it on GitHub to review and submit.</p><a className="btn-secondary" href={draftUrl} target="_blank" rel="noopener noreferrer">Review draft on GitHub ↗</a></div>}
    </form>
  );
}
