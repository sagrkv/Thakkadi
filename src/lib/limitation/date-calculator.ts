import {
  addDays,
  differenceInDays,
  format,
  parseISO,
  isAfter,
  isBefore,
  startOfDay,
} from "date-fns";
import {
  DateCalculation,
  CertifiedCopyDates,
  AuditEntry,
} from "@/types/limitation";

/**
 * Date Calculator for Limitation Periods
 *
 * Rules Applied:
 * 1. Day of judgment is excluded from computation (Section 12(1), Limitation Act)
 * 2. Time taken to obtain certified copy is excluded (Section 12(2), Limitation Act)
 * 3. If last day falls on holiday, next working day is the last date (Section 4, Limitation Act)
 *
 * This is a deterministic, rule-based engine. No AI/ML involved.
 */

// National holidays in India (approximate - should be updated yearly)
const NATIONAL_HOLIDAYS_2024: string[] = [
  "2024-01-26", "2024-03-08", "2024-03-25", "2024-03-29", "2024-04-11",
  "2024-04-14", "2024-04-17", "2024-04-21", "2024-05-23", "2024-06-17",
  "2024-07-17", "2024-08-15", "2024-08-26", "2024-09-16", "2024-10-02",
  "2024-10-12", "2024-10-31", "2024-11-01", "2024-11-15", "2024-12-25",
];

const NATIONAL_HOLIDAYS_2025: string[] = [
  "2025-01-26", "2025-02-26", "2025-03-14", "2025-03-30", "2025-04-06",
  "2025-04-10", "2025-04-14", "2025-04-18", "2025-05-12", "2025-06-07",
  "2025-07-06", "2025-08-15", "2025-08-16", "2025-09-05", "2025-10-02",
  "2025-10-20", "2025-11-05", "2025-12-25",
];

const ALL_HOLIDAYS = [...NATIONAL_HOLIDAYS_2024, ...NATIONAL_HOLIDAYS_2025];

/**
 * Check if a date is a court holiday
 */
export function isCourtHoliday(date: Date): boolean {
  const dateStr = format(date, "yyyy-MM-dd");
  if (ALL_HOLIDAYS.includes(dateStr)) return true;
  if (date.getDay() === 0) return true; // Sunday
  if (date.getDay() === 6) return true; // Saturday (conservative)
  return false;
}

/**
 * Get next working day if current day is a holiday
 */
export function getNextWorkingDay(date: Date): Date {
  let currentDate = startOfDay(date);
  while (isCourtHoliday(currentDate)) {
    currentDate = addDays(currentDate, 1);
  }
  return currentDate;
}

/**
 * Calculate excluded days for certified copy period
 */
export function calculateCopyExclusionDays(
  certifiedCopy: CertifiedCopyDates
): { excludedDays: number; description: string } {
  if (!certifiedCopy.appliedDate || !certifiedCopy.receivedDate) {
    return { excludedDays: 0, description: "No certified copy exclusion applied" };
  }

  const appliedDate = parseISO(certifiedCopy.appliedDate);
  const receivedDate = parseISO(certifiedCopy.receivedDate);

  if (isAfter(appliedDate, receivedDate)) {
    throw new Error("Applied date cannot be after received date");
  }

  const excludedDays = differenceInDays(receivedDate, appliedDate) + 1;

  return {
    excludedDays,
    description: `${excludedDays} days excluded (${format(appliedDate, "dd MMM yyyy")} to ${format(receivedDate, "dd MMM yyyy")}) for obtaining certified copy`,
  };
}

/**
 * Main calculation function
 */
export function calculateLastDate(
  judgmentDate: string,
  limitationDays: number,
  certifiedCopy?: CertifiedCopyDates,
  copyExclusionAllowed: boolean = true
): { calculation: DateCalculation; auditLog: AuditEntry[] } {
  const auditLog: AuditEntry[] = [];

  const startDate = startOfDay(parseISO(judgmentDate));
  auditLog.push({
    step: "Parse judgment date",
    input: { judgmentDate },
    output: { parsedDate: format(startDate, "yyyy-MM-dd") },
    timestamp: new Date().toISOString(),
  });

  const computationStartDate = addDays(startDate, 1);
  auditLog.push({
    step: "Exclude judgment date (Section 12(1))",
    input: { judgmentDate: format(startDate, "yyyy-MM-dd") },
    output: { computationStart: format(computationStartDate, "yyyy-MM-dd") },
    timestamp: new Date().toISOString(),
  });

  let excludedDays = 0;
  let excludedPeriodDescription: string | undefined;

  if (copyExclusionAllowed && certifiedCopy?.appliedDate && certifiedCopy?.receivedDate) {
    const exclusion = calculateCopyExclusionDays(certifiedCopy);
    excludedDays = exclusion.excludedDays;
    excludedPeriodDescription = exclusion.description;

    auditLog.push({
      step: "Calculate certified copy exclusion (Section 12(2))",
      input: { certifiedCopy },
      output: { excludedDays, description: excludedPeriodDescription },
      timestamp: new Date().toISOString(),
    });
  }

  const totalDays = limitationDays + excludedDays - 1;
  const rawLastDate = addDays(computationStartDate, totalDays);

  auditLog.push({
    step: "Calculate raw last date",
    input: { limitationDays, excludedDays, computationStart: format(computationStartDate, "yyyy-MM-dd") },
    output: { rawLastDate: format(rawLastDate, "yyyy-MM-dd"), totalDays },
    timestamp: new Date().toISOString(),
  });

  const isHolidayAdjusted = isCourtHoliday(rawLastDate);
  const finalLastDate = isHolidayAdjusted ? getNextWorkingDay(rawLastDate) : rawLastDate;

  if (isHolidayAdjusted) {
    auditLog.push({
      step: "Adjust for court holiday (Section 4)",
      input: { rawLastDate: format(rawLastDate, "yyyy-MM-dd"), isHoliday: true },
      output: { adjustedLastDate: format(finalLastDate, "yyyy-MM-dd") },
      timestamp: new Date().toISOString(),
    });
  }

  const calculation: DateCalculation = {
    startDate,
    limitationDays,
    excludedDays,
    excludedPeriodDescription,
    lastDate: finalLastDate,
    isHolidayAdjusted,
    originalLastDate: isHolidayAdjusted ? rawLastDate : undefined,
  };

  return { calculation, auditLog };
}

/**
 * Calculate days remaining until limitation expires
 */
export function calculateDaysRemaining(lastDate: Date): number {
  const today = startOfDay(new Date());
  const limitDate = startOfDay(lastDate);
  return differenceInDays(limitDate, today);
}

/**
 * Check if limitation has expired
 */
export function isExpired(lastDate: Date): boolean {
  const today = startOfDay(new Date());
  return isBefore(lastDate, today);
}

/**
 * Format date for display
 */
export function formatDisplayDate(date: Date): string {
  return format(date, "dd MMMM yyyy (EEEE)");
}

/**
 * Validate date inputs
 */
export function validateDates(
  judgmentDate: string,
  certifiedCopy?: CertifiedCopyDates
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const today = startOfDay(new Date());

  const jDate = parseISO(judgmentDate);
  if (isAfter(jDate, today)) {
    errors.push("Judgment date cannot be in the future");
  }

  if (certifiedCopy) {
    if (certifiedCopy.appliedDate) {
      const appliedDate = parseISO(certifiedCopy.appliedDate);
      if (isBefore(appliedDate, jDate)) {
        errors.push("Certified copy application date cannot be before judgment date");
      }
      if (isAfter(appliedDate, today)) {
        errors.push("Certified copy application date cannot be in the future");
      }
    }

    if (certifiedCopy.readyDate && certifiedCopy.appliedDate) {
      const readyDate = parseISO(certifiedCopy.readyDate);
      const appliedDate = parseISO(certifiedCopy.appliedDate);
      if (isBefore(readyDate, appliedDate)) {
        errors.push("Certified copy ready date cannot be before application date");
      }
    }

    if (certifiedCopy.receivedDate && certifiedCopy.appliedDate) {
      const receivedDate = parseISO(certifiedCopy.receivedDate);
      const appliedDate = parseISO(certifiedCopy.appliedDate);
      if (isBefore(receivedDate, appliedDate)) {
        errors.push("Certified copy received date cannot be before application date");
      }
      if (isAfter(receivedDate, today)) {
        errors.push("Certified copy received date cannot be in the future");
      }
    }
  }

  return { isValid: errors.length === 0, errors };
}
