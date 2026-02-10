'use client';

import { useState } from 'react';
import { AD_VALOREM_SLABS } from '@/lib/court-fee/constants/slabs';
import { SUIT_GROUPS, SUIT_TYPES } from '@/lib/court-fee/constants/suit-categories';
import type { FeeMethod, SuitTypeDefinition } from '@/types/court-fee';
import LawReferenceLink from '@/components/ui/LawReferenceLink';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return n.toLocaleString('en-IN');
}

function formatRate(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}

function formatRange(min: number, max: number | null): string {
  if (max === null) return `Rs. ${formatCurrency(min)}+`;
  return `Rs. ${formatCurrency(min)} – ${formatCurrency(max)}`;
}

function feeMethodLabel(method: FeeMethod): string {
  const map: Record<FeeMethod, string> = {
    ad_valorem: 'Ad Valorem',
    ad_valorem_fraction: 'Ad Val. (Fraction)',
    fixed: 'Fixed',
    fixed_tiered: 'Fixed Tiered',
    exempt: 'Exempt',
    probate: 'Probate',
    fraction_of_fee: 'Fraction of Fee',
    difference_ad_valorem: 'Diff. Ad Val.',
  };
  return map[method];
}

function feeMethodBadgeClass(method: FeeMethod): string {
  if (method === 'ad_valorem' || method === 'ad_valorem_fraction' || method === 'difference_ad_valorem') {
    return 'fee-badge-ad-valorem';
  }
  if (method === 'fixed' || method === 'fixed_tiered') return 'fee-badge-fixed';
  if (method === 'exempt') return 'fee-badge-exempt';
  if (method === 'probate') return 'fee-badge-probate';
  return 'fee-badge-fraction';
}

const GROUP_ICONS: Record<string, string> = {
  banknote: '\u20B9',
  landmark: '\u{1F3DB}',
  split: '\u2702',
  'file-signature': '\u{1F4DD}',
  gavel: '\u2696',
  scroll: '\u{1F4DC}',
  scale: '\u2696',
  'book-open': '\u{1F4D6}',
  shield: '\u{1F6E1}',
};

// ── Slab Row Gradient ─────────────────────────────────────────────────────────

function slabRowBg(index: number, total: number): string {
  const t = total > 1 ? index / (total - 1) : 0;
  const r = Math.round(239 - t * 30);
  const g = Math.round(254 - t * 18);
  const b = Math.round(250 - t * 14);
  return `rgb(${r}, ${g}, ${b})`;
}

// ── Section 1: Slab Table ────────────────────────────────────────────────────

function SlabTableSection() {
  return (
    <section className="mb-10">
      <h2
        className="text-lg font-bold mb-1 flex items-center gap-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-slate-900)' }}
      >
        <span
          className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
          style={{
            background: 'linear-gradient(135deg, var(--color-teal-600), var(--color-teal-700))',
            color: 'white',
          }}
        >
          {'\u20B9'}
        </span>
        Ad Valorem Fee Slabs
      </h2>
      <p
        className="text-sm mb-4"
        style={{ color: 'var(--color-neutral-500)' }}
      >
        Schedule I, Article 1 — Karnataka Court Fees &amp; Suits Valuation Act, 1958
      </p>

      {/* Desktop table */}
      <div className="rules-table-desktop">
        <table className="slab-table">
          <thead>
            <tr>
              <th>Slab</th>
              <th>Value Range</th>
              <th>Rate</th>
              <th>Base Fee (Rs.)</th>
              <th>Formula</th>
            </tr>
          </thead>
          <tbody>
            {AD_VALOREM_SLABS.map((slab, i) => (
              <tr key={slab.number} style={{ background: slabRowBg(i, AD_VALOREM_SLABS.length) }}>
                <td>
                  <span className="font-mono font-semibold" style={{ color: 'var(--color-teal-800)' }}>
                    {slab.label}
                  </span>
                </td>
                <td className="font-mono text-xs">
                  {formatRange(slab.min, slab.max)}
                </td>
                <td>
                  <span
                    className="font-mono font-bold"
                    style={{ color: 'var(--color-teal-700)' }}
                  >
                    {formatRate(slab.rate)}
                  </span>
                </td>
                <td className="font-mono">
                  {slab.baseFee > 0 ? formatCurrency(slab.baseFee) : '—'}
                </td>
                <td className="text-xs" style={{ color: 'var(--color-ink-500)' }}>
                  {slab.baseFee > 0
                    ? `${formatCurrency(slab.baseFee)} + ${formatRate(slab.rate)} \u00D7 (value \u2212 ${formatCurrency(slab.threshold)})`
                    : `${formatRate(slab.rate)} \u00D7 value`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="rules-mobile-list">
        {AD_VALOREM_SLABS.map((slab, i) => (
          <div
            key={slab.number}
            className="rules-mobile-card"
            style={{
              borderLeftColor: 'var(--color-teal-400)',
              background: slabRowBg(i, AD_VALOREM_SLABS.length),
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="font-mono font-bold text-sm"
                style={{ color: 'var(--color-teal-800)' }}
              >
                Slab {slab.label}
              </span>
              <span
                className="font-mono font-bold text-sm"
                style={{ color: 'var(--color-teal-700)' }}
              >
                {formatRate(slab.rate)}
              </span>
            </div>
            <div className="text-xs mb-1" style={{ color: 'var(--color-ink-600)' }}>
              <span className="font-mono">{formatRange(slab.min, slab.max)}</span>
            </div>
            {slab.baseFee > 0 && (
              <div className="text-xs" style={{ color: 'var(--color-ink-500)' }}>
                Base: Rs. {formatCurrency(slab.baseFee)} + {formatRate(slab.rate)} {'\u00D7'} (value {'\u2212'} {formatCurrency(slab.threshold)})
              </div>
            )}
            {slab.baseFee === 0 && (
              <div className="text-xs" style={{ color: 'var(--color-ink-500)' }}>
                {formatRate(slab.rate)} {'\u00D7'} value
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section 2: Suit Types by Category ────────────────────────────────────────

function SuitGroupAccordion({
  groupId,
  label,
  description,
  icon,
  suitTypes,
  defaultOpen,
}: {
  groupId: string;
  label: string;
  description: string;
  icon: string;
  suitTypes: readonly SuitTypeDefinition[];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `accordion-panel-${groupId}`;

  return (
    <div className="mb-3">
      <button
        className={`rules-accordion-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: open ? 'var(--color-teal-600)' : 'var(--color-teal-50)',
            color: open ? 'white' : 'var(--color-teal-700)',
            fontSize: '1rem',
            transition: 'all 0.15s ease',
          }}
        >
          {GROUP_ICONS[icon] || '\u{1F4CB}'}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="font-bold text-sm"
              style={{ color: 'var(--color-ink-800)' }}
            >
              Group {groupId}: {label}
            </span>
            <span
              className="text-xs font-medium px-1.5 py-0.5 rounded"
              style={{
                background: 'var(--color-neutral-100)',
                color: 'var(--color-neutral-600)',
              }}
            >
              {suitTypes.length}
            </span>
          </div>
          <p className="text-xs truncate" style={{ color: 'var(--color-ink-400)' }}>
            {description}
          </p>
        </div>
        <span className="chevron text-lg">{'\u25BE'}</span>
      </button>

      {open && (
        <div id={panelId} role="region" className="rules-accordion-body">
          {/* Desktop: mini table */}
          <div className="rules-table-desktop">
            <table className="rules-table" style={{ borderRadius: 0 }}>
              <thead>
                <tr>
                  <th>Suit Type</th>
                  <th>Section</th>
                  <th>Fee Method</th>
                  <th>Value Basis</th>
                </tr>
              </thead>
              <tbody>
                {suitTypes.map((st) => (
                  <tr key={st.id}>
                    <td>
                      <span className="font-semibold" style={{ color: 'var(--color-slate-800)' }}>
                        {st.label}
                      </span>
                    </td>
                    <td>
                      <LawReferenceLink reference={st.section} actContext="karnataka-court-fees-act-1958" />
                    </td>
                    <td>
                      <span className={`fee-badge ${feeMethodBadgeClass(st.feeMethod)}`}>
                        {feeMethodLabel(st.feeMethod)}
                      </span>
                    </td>
                    <td className="text-xs" style={{ color: 'var(--color-ink-500)' }}>
                      {st.valueBasis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="rules-mobile-list p-3">
            {suitTypes.map((st) => (
              <div
                key={st.id}
                className="rules-mobile-card"
                style={{ borderLeftColor: 'var(--color-teal-300)' }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-slate-800)' }}>
                    {st.label}
                  </span>
                  <span className={`fee-badge ${feeMethodBadgeClass(st.feeMethod)}`}>
                    {feeMethodLabel(st.feeMethod)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <LawReferenceLink reference={st.section} actContext="karnataka-court-fees-act-1958" fontSize="0.65rem" />
                </div>
                <p className="text-xs" style={{ color: 'var(--color-ink-400)' }}>
                  {st.valueBasis}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const TYPES_BY_GROUP = new Map(
  SUIT_GROUPS.map((g) => [g.id, SUIT_TYPES.filter((st) => st.group === g.id)])
);

function SuitTypesSection() {
  return (
    <section>
      <h2
        className="text-lg font-bold mb-1 flex items-center gap-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-slate-900)' }}
      >
        <span
          className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
          style={{
            background: 'linear-gradient(135deg, var(--color-slate-700), var(--color-slate-800))',
            color: 'white',
          }}
        >
          {'\u2696'}
        </span>
        Suit Types by Category
      </h2>
      <p
        className="text-sm mb-4"
        style={{ color: 'var(--color-neutral-500)' }}
      >
        {SUIT_TYPES.length} suit types across {SUIT_GROUPS.length} categories
      </p>

      {SUIT_GROUPS.map((group) => {
        const types = TYPES_BY_GROUP.get(group.id) ?? [];
        return (
          <SuitGroupAccordion
            key={group.id}
            groupId={group.id}
            label={group.label}
            description={group.description}
            icon={group.icon}
            suitTypes={types}
            defaultOpen={true}
          />
        );
      })}
    </section>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function CourtFeeRulesView() {
  return (
    <div>
      {/* Summary bar */}
      <div
        className="flex items-center gap-3 mb-6 p-3 rounded-lg flex-wrap"
        style={{
          background: 'linear-gradient(135deg, var(--color-teal-50), var(--color-neutral-100))',
          border: '1px solid var(--color-teal-200)',
        }}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--color-teal-800)' }}>
          {AD_VALOREM_SLABS.length} fee slabs
        </span>
        <span style={{ color: 'var(--color-neutral-300)' }}>|</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--color-slate-700)' }}>
          {SUIT_TYPES.length} suit types
        </span>
        <span style={{ color: 'var(--color-neutral-300)' }}>|</span>
        <span className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
          {SUIT_GROUPS.length} categories
        </span>
      </div>

      <SlabTableSection />
      <SuitTypesSection />
    </div>
  );
}
