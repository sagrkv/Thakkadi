import {
  addDays,
  differenceInDays,
  isWeekend,
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
} from "@/types";

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
// In production, this would be fetched from a maintained database
const NATIONAL_HOLIDAYS_2024: string[] = [
  "2024-01-26", // Republic Day
  "2024-03-08", // Maha Shivaratri
  "2024-03-25", // Holi
  "2024-03-29", // Good Friday
  "2024-04-11", // Idul Fitr
  "2024-04-14", // Ambedkar Jayanti
  "2024-04-17", // Ram Navami
  "2024-04-21", // Mahavir Jayanti
  "2024-05-23", // Buddha Purnima
  "2024-06-17", // Eid ul-Adha
  "2024-07-17", // Muharram
  "2024-08-15", // Independence Day
  "2024-08-26", // Janmashtami
  "2024-09-16", // Milad-un-Nabi
  "2024-10-02", // Gandhi Jayanti
  "2024-10-12", // Dussehra
  "2024-10-31", // Sardar Patel Jayanti
  "2024-11-01", // Diwali
  "2024-11-15", // Guru Nanak Jayanti
  "2024-12-25", // Christmas
];

const NATIONAL_HOLIDAYS_2025: string[] = [
  "2025-01-26", // Republic Day
  "2025-02-26", // Maha Shivaratri
  "2025-03-14", // Holi
  "2025-03-30", // Idul Fitr
  "2025-04-06", // Ram Navami
  "2025-04-10", // Mahavir Jayanti
  "2025-04-14", // Ambedkar Jayanti
  "2025-04-18", // Good Friday
  "2025-05-12", // Buddha Purnima
  "2025-06-07", // Eid ul-Adha
  "2025-07-06", // Muharram
  "2025-08-15", // Independence Day
  "2025-08-16", // Janmashtami
  "2025-09-05", // Milad-un-Nabi
  "2025-10-02", // Gandhi Jayanti / Dussehra
  "2025-10-20", // Diwali
  "2025-11-05", // Guru Nanak Jayanti
  "2025-12-25", // Christmas
];

const ALL_HOLIDAYS = [...NATIONAL_HOLIDAYS_2024, ...NATIONAL_HOLIDAYS_2025];

/**
 * Check if a date is a court holiday
 * Courts are closed on Sundays and public holidays
 * Saturdays: Most courts have second Saturdays off, some all Saturdays
 * For safety, we consider all Saturdays as potential holidays
 */
export function isCourtHoliday(date: Date): boolean {
  const dateStr = format(date, "yyyy-MM-dd");

  // Check national holidays
  if (ALL_HOLIDAYS.includes(dateStr)) {
    return true;
  }

  // Sunday is always a holiday
  if (date.getDay() === 0) {
    return true;
  }

  // Consider Saturdays as holidays (conservative approach)
  if (date.getDay() === 6) {
    return true;
  }

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
 * Section 12(2), Limitation Act:
 * Time taken to obtain certified copy is excluded
 */
export function calculateCopyExclusionDays(
  certifiedCopy: CertifiedCopyDates
): { excludedDays: number; description: string } {
  if (!certifiedCopy.appliedDate || !certifiedCopy.receivedDate) {
    return { excludedDays: 0, description: "No certified copy exclusion applied" };
  }

  const appliedDate = parseISO(certifiedCopy.appliedDate);
  const receivedDate = parseISO(certifiedCopy.receivedDate);

  // Validate dates
  if (isAfter(appliedDate, receivedDate)) {
    throw new Error("Applied date cannot be after received date");
  }

  // Both days are included in exclusion
  const excludedDays = differenceInDays(receivedDate, appliedDate) + 1;

  return {
    excludedDays,
    description: `${excludedDays} days excluded (${format(appliedDate, "dd MMM yyyy")} to ${format(receivedDate, "dd MMM yyyy")}) for obtaining certified copy`,
  };
}

/**
 * Main calculation function
 *
 * @param judgmentDate - Date of judgment (ISO string)
 * @param limitationDays - Number of days allowed for limitation
 * @param certifiedCopy - Optional certified copy dates for exclusion
 * @param copyExclusionAllowed - Whether this action allows copy exclusion
 */
export function calculateLastDate(
  judgmentDate: string,
  limitationDays: number,
  certifiedCopy?: CertifiedCopyDates,
  copyExclusionAllowed: boolean = true
): { calculation: DateCalculation; auditLog: AuditEntry[] } {
  const auditLog: AuditEntry[] = [];

  // Step 1: Parse judgment date
  const startDate = startOfDay(parseISO(judgmentDate));
  auditLog.push({
    step: "Parse judgment date",
    input: { judgmentDate },
    output: { parsedDate: format(startDate, "yyyy-MM-dd") },
    timestamp: new Date().toISOString(),
  });

  // Step 2: Judgment date is excluded (computation starts from next day)
  // Section 12(1): Day from which period runs is excluded
  const computationStartDate = addDays(startDate, 1);
  auditLog.push({
    step: "Exclude judgment date (Section 12(1))",
    input: { judgmentDate: format(startDate, "yyyy-MM-dd") },
    output: { computationStart: format(computationStartDate, "yyyy-MM-dd") },
    timestamp: new Date().toISOString(),
  });

  // Step 3: Calculate certified copy exclusion if applicable
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

  // Step 4: Calculate raw last date
  // Limitation period + excluded days - 1 (because we already moved to next day)
  const totalDays = limitationDays + excludedDays - 1;
  const rawLastDate = addDays(computationStartDate, totalDays);

  auditLog.push({
    step: "Calculate raw last date",
    input: { limitationDays, excludedDays, computationStart: format(computationStartDate, "yyyy-MM-dd") },
    output: { rawLastDate: format(rawLastDate, "yyyy-MM-dd"), totalDays },
    timestamp: new Date().toISOString(),
  });

  // Step 5: Adjust for holidays (Section 4, Limitation Act)
  // If last day is a holiday, next working day is the last date
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

  // Validate judgment date
  const jDate = parseISO(judgmentDate);
  if (isAfter(jDate, today)) {
    errors.push("Judgment date cannot be in the future");
  }

  // Validate certified copy dates if provided
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

  return {
    isValid: errors.length === 0,
    errors,
  };
}
