'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';

const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'general'], {
    required_error: 'Please select a feedback type',
  }),
  calculator: z.string().optional(),
  message: z
    .string()
    .min(10, 'Please provide at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
  email: z.union([z.literal(''), z.string().trim().email('Please enter a valid email')]),
});

type FeedbackData = z.infer<typeof feedbackSchema>;

const FEEDBACK_TYPES = [
  { value: 'bug', label: 'Bug / Rules Issue', icon: '\u{1F41B}' },
  { value: 'feature', label: 'Feature Request', icon: '\u{1F4A1}' },
  { value: 'general', label: 'General Feedback', icon: '\u{1F4AC}' },
] as const;

const CALCULATORS = [
  { value: '', label: 'Select calculator (optional)' },
  { value: 'limitation', label: 'Limitation Calculator' },
  { value: 'court-fee', label: 'Court Fee Calculator' },
  { value: 'general', label: 'General / Other' },
];

export default function FeedbackForm() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState<FeedbackData>({
    type: 'general',
    calculator: '',
    message: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const calc = searchParams.get('calculator');
    if (calc === 'limitation' || calc === 'court-fee') {
      setForm((prev) => ({ ...prev, calculator: calc, type: 'bug' }));
    }
  }, [searchParams]);

  const updateField = <K extends keyof FeedbackData>(key: K, value: FeedbackData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check — silently "succeed" if a bot filled the hidden field
    const honeypot = e.currentTarget.elements.namedItem('bot-field') as HTMLInputElement | null;
    if (honeypot?.value) {
      setStatus('success');
      return;
    }

    const result = feedbackSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FeedbackData, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FeedbackData;
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const body = new URLSearchParams({
        'form-name': 'feedback',
        type: form.type,
        calculator: form.calculator ?? '',
        message: form.message,
        email: form.email ?? '',
      });

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setForm({ type: 'general', calculator: '', message: '', email: '' });
    setErrors({});
    setStatus('idle');
    setSubmitError('');
  };

  if (status === 'success') {
    return (
      <div className="card p-8 text-center animate-fade-in-scale" role="status" aria-live="polite">
        <div className="text-5xl mb-4">{'\u2705'}</div>
        <h2
          className="text-xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-slate-900)' }}
        >
          Thank you for your feedback
        </h2>
        <p className="mb-6" style={{ color: 'var(--color-neutral-600)', fontSize: '0.9rem' }}>
          Your submission has been received. We review all feedback to improve Thakkadi.
        </p>
        <button onClick={handleReset} className="btn btn-primary">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8 animate-in">
      {/* Honeypot — hidden from humans, traps bots */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label>
          Don&apos;t fill this out
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Feedback Type */}
      <fieldset className="mb-6">
        <legend className="form-label mb-3">What kind of feedback?</legend>
        <div className="flex flex-wrap gap-2">
          {FEEDBACK_TYPES.map((ft) => (
            <button
              key={ft.value}
              type="button"
              onClick={() => updateField('type', ft.value)}
              className="feedback-type-pill"
              data-selected={form.type === ft.value}
            >
              <span>{ft.icon}</span>
              <span>{ft.label}</span>
            </button>
          ))}
        </div>
        {errors.type && <p className="form-error">{errors.type}</p>}
      </fieldset>

      {/* Calculator */}
      <div className="form-group">
        <label htmlFor="feedback-calculator" className="form-label">
          Related calculator
        </label>
        <select
          id="feedback-calculator"
          className="form-select"
          value={form.calculator}
          onChange={(e) => updateField('calculator', e.target.value)}
        >
          {CALCULATORS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="feedback-message" className="form-label">
          Your message <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <textarea
          id="feedback-message"
          className="feedback-textarea"
          rows={5}
          placeholder={
            form.type === 'bug'
              ? 'Describe the issue: what did you expect vs. what happened?'
              : form.type === 'feature'
                ? 'What feature would be helpful? How would you use it?'
                : 'Share your thoughts, suggestions, or anything else...'
          }
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          data-error={!!errors.message}
        />
        <div className="flex justify-between items-start mt-1">
          {errors.message ? (
            <p className="form-error">{errors.message}</p>
          ) : (
            <span />
          )}
          <span
            className="text-xs"
            style={{ color: form.message.length > 1800 ? 'var(--color-error)' : 'var(--color-neutral-400)' }}
          >
            {form.message.length}/2000
          </span>
        </div>
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="feedback-email" className="form-label">
          Email <span style={{ color: 'var(--color-neutral-400)', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id="feedback-email"
          type="email"
          autoComplete="email"
          className="feedback-input"
          placeholder="Only if you'd like a response"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          data-error={!!errors.email}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      {/* Error alert */}
      {status === 'error' && (
        <div className="alert alert-danger mb-4 animate-fade-in-scale" role="alert" aria-live="assertive">
          <span className="text-lg">{'\u26A0\uFE0F'}</span>
          <div className="flex-1">
            <p className="font-semibold text-sm">Submission failed</p>
            <p className="text-xs mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Feedback'}
      </button>
    </form>
  );
}
