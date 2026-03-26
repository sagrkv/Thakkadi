'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface ShareButtonProps {
  readonly title?: string;
  readonly text?: string;
}

export default function ShareButton({
  title = 'Thakkadi Calculation',
  text = 'Check out my legal calculation on Thakkadi',
}: ShareButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShowToast(true);
      timeoutRef.current = setTimeout(() => setShowToast(false), 2500);
    } catch {
      // Clipboard API unavailable
    }
  }, [title, text]);

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="share-btn no-print"
        aria-label="Share or copy link"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>Share</span>
      </button>
      {showToast && (
        <div className="toast" role="status" aria-live="polite">
          Link copied to clipboard
        </div>
      )}
    </>
  );
}
