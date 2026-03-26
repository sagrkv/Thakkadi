'use client';

type SealIconName = 'limitation' | 'court-fee' | 'stamp-duty' | 'library';
type SimpleIconName = 'scales' | 'shield' | 'lock' | 'heart';

interface LegalIconProps {
  readonly name: SealIconName | SimpleIconName;
  readonly size?: 24 | 32 | 48 | 64;
  readonly className?: string;
}

const SEAL_ICONS: ReadonlySet<string> = new Set(['limitation', 'court-fee', 'stamp-duty', 'library']);

const ARIA_LABELS: Readonly<Record<LegalIconProps['name'], string>> = {
  limitation: 'Limitation period hourglass',
  'court-fee': 'Scales of justice',
  'stamp-duty': 'Official stamp seal',
  library: 'Open legal book',
  scales: 'Scales of justice',
  shield: 'Deterministic shield',
  lock: 'Privacy lock',
  heart: 'Free forever heart',
};

function SealBorder() {
  return (
    <>
      {/* Outer ring */}
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Inner ring — double-ring seal effect */}
      <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="1" />
    </>
  );
}

function HourglassIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <SealBorder />
      {/* Hourglass body */}
      <line x1="22" y1="19" x2="42" y2="19" />
      <line x1="22" y1="45" x2="42" y2="45" />
      {/* Top bulb narrowing to center */}
      <path d="M23 19 C23 27, 29 30, 32 32" />
      <path d="M41 19 C41 27, 35 30, 32 32" />
      {/* Bottom bulb widening from center */}
      <path d="M32 32 C29 34, 23 37, 23 45" />
      <path d="M32 32 C35 34, 41 37, 41 45" />
      {/* Sand trickle — small dots */}
      <circle cx="32" cy="34" r="0.6" fill="currentColor" stroke="none" />
      {/* Sand pile at bottom */}
      <path d="M28 43 Q32 40, 36 43" strokeWidth="1.2" />
    </svg>
  );
}

function CourtFeeIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <SealBorder />
      {/* Fulcrum pillar */}
      <line x1="32" y1="44" x2="32" y2="24" />
      {/* Base */}
      <line x1="27" y1="44" x2="37" y2="44" />
      {/* Beam */}
      <line x1="20" y1="27" x2="44" y2="27" />
      {/* Fulcrum triangle */}
      <path d="M30 24 L32 21 L34 24" />
      {/* Left pan chains */}
      <line x1="20" y1="27" x2="18" y2="34" />
      <line x1="20" y1="27" x2="22" y2="34" />
      {/* Left pan */}
      <path d="M16 34 Q20 37, 24 34" strokeWidth="1.5" />
      {/* Right pan chains */}
      <line x1="44" y1="27" x2="42" y2="34" />
      <line x1="44" y1="27" x2="46" y2="34" />
      {/* Right pan */}
      <path d="M40 34 Q44 37, 48 34" strokeWidth="1.5" />
    </svg>
  );
}

function StampDutyIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <SealBorder />
      {/* Stamp handle */}
      <rect x="27" y="18" width="10" height="6" rx="1.5" />
      {/* Handle grip notch */}
      <line x1="30" y1="18" x2="30" y2="24" strokeWidth="0.8" />
      <line x1="34" y1="18" x2="34" y2="24" strokeWidth="0.8" />
      {/* Stamp neck */}
      <line x1="29" y1="24" x2="29" y2="28" />
      <line x1="35" y1="24" x2="35" y2="28" />
      {/* Stamp base plate */}
      <rect x="24" y="28" width="16" height="4" rx="0.5" />
      {/* Impression — scalloped circle representing the seal mark */}
      <circle cx="32" cy="39" r="6" strokeDasharray="2 1.5" strokeWidth="1.2" />
      {/* Inner seal mark */}
      <circle cx="32" cy="39" r="3" strokeWidth="0.8" />
      {/* Star/asterisk in center of seal */}
      <line x1="32" y1="37.5" x2="32" y2="40.5" strokeWidth="0.8" />
      <line x1="30.5" y1="39" x2="33.5" y2="39" strokeWidth="0.8" />
    </svg>
  );
}

function LibraryIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <SealBorder />
      {/* Open book — left page */}
      <path d="M32 22 C28 22, 21 22, 19 24 L19 42 C21 40.5, 28 40, 32 41" />
      {/* Open book — right page */}
      <path d="M32 22 C36 22, 43 22, 45 24 L45 42 C43 40.5, 36 40, 32 41" />
      {/* Spine */}
      <line x1="32" y1="22" x2="32" y2="41" strokeWidth="1" />
      {/* Text lines — left page */}
      <line x1="22" y1="27" x2="29" y2="27" strokeWidth="0.8" />
      <line x1="22" y1="30" x2="29" y2="30" strokeWidth="0.8" />
      <line x1="22" y1="33" x2="28" y2="33" strokeWidth="0.8" />
      <line x1="22" y1="36" x2="29" y2="36" strokeWidth="0.8" />
      {/* Text lines — right page */}
      <line x1="35" y1="27" x2="42" y2="27" strokeWidth="0.8" />
      <line x1="35" y1="30" x2="42" y2="30" strokeWidth="0.8" />
      <line x1="35" y1="33" x2="41" y2="33" strokeWidth="0.8" />
      <line x1="35" y1="36" x2="42" y2="36" strokeWidth="0.8" />
    </svg>
  );
}

function ScalesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      {/* Fulcrum pillar */}
      <line x1="12" y1="17" x2="12" y2="6" />
      {/* Base */}
      <line x1="9" y1="17" x2="15" y2="17" />
      {/* Beam */}
      <line x1="4" y1="8" x2="20" y2="8" />
      {/* Fulcrum triangle */}
      <path d="M11 6 L12 4 L13 6" />
      {/* Left chains */}
      <line x1="4" y1="8" x2="3" y2="12" />
      <line x1="4" y1="8" x2="5" y2="12" />
      {/* Left pan */}
      <path d="M2 12 Q4 14.5, 6 12" />
      {/* Right chains */}
      <line x1="20" y1="8" x2="19" y2="12" />
      <line x1="20" y1="8" x2="21" y2="12" />
      {/* Right pan */}
      <path d="M18 12 Q20 14.5, 22 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

const ICON_COMPONENTS: Readonly<Record<LegalIconProps['name'], () => React.JSX.Element>> = {
  limitation: HourglassIcon,
  'court-fee': CourtFeeIcon,
  'stamp-duty': StampDutyIcon,
  library: LibraryIcon,
  scales: ScalesIcon,
  shield: ShieldIcon,
  lock: LockIcon,
  heart: HeartIcon,
};

export default function LegalIcon({ name, size = 48, className = '' }: LegalIconProps) {
  const isSeal = SEAL_ICONS.has(name);
  const IconComponent = ICON_COMPONENTS[name];
  const label = ARIA_LABELS[name];

  return (
    <span
      role="img"
      aria-label={label}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        lineHeight: 1,
        ...(isSeal ? { padding: 0 } : {}),
      }}
    >
      <IconComponent />
    </span>
  );
}
