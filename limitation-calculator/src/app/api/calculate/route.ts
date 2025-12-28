import { NextRequest, NextResponse } from "next/server";
import { CaseInput } from "@/types";
import { calculateLimitation, getResultsSummary } from "@/lib/limitation-engine";

/**
 * POST /api/calculate
 *
 * Calculate limitation periods for a given case
 *
 * Request body: CaseInput
 * Response: CalculationResult with summary
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.judgmentDate) {
      return NextResponse.json(
        { error: "Judgment date is required" },
        { status: 400 }
      );
    }

    if (!body.caseType) {
      return NextResponse.json(
        { error: "Case type is required" },
        { status: 400 }
      );
    }

    if (!body.courtLevel) {
      return NextResponse.json(
        { error: "Court level is required" },
        { status: 400 }
      );
    }

    if (!body.judgmentType) {
      return NextResponse.json(
        { error: "Judgment type is required" },
        { status: 400 }
      );
    }

    const input: CaseInput = {
      judgmentDate: body.judgmentDate,
      caseType: body.caseType,
      courtLevel: body.courtLevel,
      judgmentType: body.judgmentType,
      certifiedCopy: body.certifiedCopy,
    };

    // Calculate limitation
    const result = calculateLimitation(input);
    const summary = getResultsSummary(result);

    return NextResponse.json({
      success: true,
      result,
      summary,
    });
  } catch (error) {
    console.error("Calculation error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
