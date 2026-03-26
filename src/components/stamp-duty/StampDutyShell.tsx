'use client';

import { useReducer, useCallback } from 'react';
import type {
  StampDutyState,
  StampDutyAction,
  StampDutyInput,
} from '@/types/stamp-duty';
import { getInstrumentById, getCategoryById } from '@/lib/stamp-duty/constants/instruments';
import { calculateStampDuty } from '@/lib/stamp-duty/engine/calculator';
import { validateStampDutyInput } from '@/lib/stamp-duty/utils/validation';
import { useUrlSync } from '@/lib/url-params/use-url-sync';
import { stampDutyParamsSchema } from '@/lib/url-params/schemas';

import StampCategorySelector from './StampCategorySelector';
import StampInstrumentSelector from './StampInstrumentSelector';
import StampInputForm from './StampInputForm';
import StampResultDisplay from './StampResultDisplay';

// ── Reducer ──────────────────────────────────────────────────────────────────

const initialInput: StampDutyInput = { instrumentId: '' };

const initialState: StampDutyState = {
  step: 'category',
  selectedCategory: null,
  selectedInstrumentId: null,
  input: initialInput,
  result: null,
  error: null,
};

function reducer(state: StampDutyState, action: StampDutyAction): StampDutyState {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state,
        step: 'instrument',
        selectedCategory: action.category,
        selectedInstrumentId: null,
        input: initialInput,
        result: null,
        error: null,
      };

    case 'SELECT_INSTRUMENT':
      return {
        ...state,
        step: 'input',
        selectedInstrumentId: action.instrumentId,
        input: { ...initialInput, instrumentId: action.instrumentId },
        result: null,
        error: null,
      };

    case 'SET_INPUT':
      return {
        ...state,
        input: { ...state.input, ...action.input },
        error: null,
      };

    case 'CALCULATE':
      return {
        ...state,
        step: 'result',
        result: action.result,
        error: null,
      };

    case 'SET_ERROR':
      return { ...state, error: action.error };

    case 'GO_BACK': {
      if (state.step === 'result') return { ...state, step: 'input', result: null };
      if (state.step === 'input') return { ...state, step: 'instrument', selectedInstrumentId: null, input: initialInput, error: null };
      if (state.step === 'instrument') return { ...state, step: 'category', selectedCategory: null };
      return state;
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export default function StampDutyShell() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateUrl } = useUrlSync(stampDutyParamsSchema);

  const handleCalculate = useCallback(() => {
    if (!state.selectedInstrumentId) return;

    const instrument = getInstrumentById(state.selectedInstrumentId);
    if (!instrument) {
      dispatch({ type: 'SET_ERROR', error: 'Unknown instrument' });
      return;
    }

    const validation = validateStampDutyInput(state.input, instrument);
    if (!validation.success) {
      dispatch({ type: 'SET_ERROR', error: validation.error });
      return;
    }

    try {
      const result = calculateStampDuty(state.input);
      dispatch({ type: 'CALCULATE', result });

      updateUrl({
        c: state.selectedCategory ?? undefined,
        i: state.selectedInstrumentId ?? undefined,
        pv: state.input.propertyValue?.toString(),
        loc: state.input.location,
        fam: state.input.isFamilyRelation ? '1' : undefined,
        scst: state.input.isScSt ? '1' : undefined,
        fp: state.input.isFirstProperty ? '1' : undefined,
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Calculation failed',
      });
    }
  }, [state.selectedInstrumentId, state.input, state.selectedCategory, updateUrl]);

  const instrument = state.selectedInstrumentId
    ? getInstrumentById(state.selectedInstrumentId)
    : null;

  const categoryInfo = state.selectedCategory
    ? getCategoryById(state.selectedCategory)
    : null;

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="breadcrumb no-print" role="navigation" aria-label="Calculator steps">
        <button
          type="button"
          className={`breadcrumb-item ${state.step === 'category' ? 'breadcrumb-active' : ''}`}
          onClick={() => dispatch({ type: 'RESET' })}
          aria-current={state.step === 'category' ? 'step' : undefined}
        >
          Categories
        </button>
        {state.selectedCategory && (
          <>
            <span className="breadcrumb-sep">/</span>
            <button
              type="button"
              className={`breadcrumb-item ${state.step === 'instrument' ? 'breadcrumb-active' : ''}`}
              onClick={() => {
                if (state.selectedCategory) {
                  dispatch({ type: 'SELECT_CATEGORY', category: state.selectedCategory });
                }
              }}
              aria-current={state.step === 'instrument' ? 'step' : undefined}
            >
              {categoryInfo?.label ?? state.selectedCategory}
            </button>
          </>
        )}
        {instrument && state.step !== 'instrument' && (
          <>
            <span className="breadcrumb-sep">/</span>
            <span
              className={`breadcrumb-item ${state.step === 'input' || state.step === 'result' ? 'breadcrumb-active' : ''}`}
              aria-current={state.step === 'input' || state.step === 'result' ? 'step' : undefined}
            >
              {instrument.label}
            </span>
          </>
        )}
      </nav>

      {/* Step content */}
      {state.step === 'category' && (
        <div role="region" aria-label="Select category">
          <StampCategorySelector
            selectedCategory={state.selectedCategory}
            onSelect={(cat) => dispatch({ type: 'SELECT_CATEGORY', category: cat })}
          />
        </div>
      )}

      {state.step === 'instrument' && state.selectedCategory && (
        <div role="region" aria-label="Select instrument">
          <StampInstrumentSelector
            category={state.selectedCategory}
            selectedInstrumentId={state.selectedInstrumentId}
            onSelect={(id) => dispatch({ type: 'SELECT_INSTRUMENT', instrumentId: id })}
            onBack={() => dispatch({ type: 'GO_BACK' })}
          />
        </div>
      )}

      {state.step === 'input' && instrument && (
        <div role="region" aria-label="Enter values">
          <StampInputForm
            instrument={instrument}
            input={state.input}
            onChangeInput={(partial) => dispatch({ type: 'SET_INPUT', input: partial })}
            onCalculate={handleCalculate}
            onBack={() => dispatch({ type: 'GO_BACK' })}
            error={state.error}
          />
        </div>
      )}

      {state.step === 'result' && state.result && (
        <div role="region" aria-label="Results">
          <StampResultDisplay
            result={state.result}
            onReset={() => dispatch({ type: 'RESET' })}
            onBack={() => dispatch({ type: 'GO_BACK' })}
          />
        </div>
      )}
    </div>
  );
}
