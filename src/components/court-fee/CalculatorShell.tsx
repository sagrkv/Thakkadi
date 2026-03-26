'use client';

import { useReducer, useCallback } from 'react';
import type { CalculatorState, CalculatorAction, SuitGroup } from '@/types/court-fee';
import { getSuitTypeById, SUIT_GROUPS } from '@/lib/court-fee/constants/suit-categories';
import { calculateCourtFee } from '@/lib/court-fee/fee-engine/calculator';
import { useUrlSync } from '@/lib/url-params/use-url-sync';
import { courtFeeParamsSchema } from '@/lib/url-params/schemas';

import CategorySelector from './CategorySelector';
import SuitTypeSelector from './SuitTypeSelector';
import ValueInputForm from './ValueInputForm';
import ResultDisplay from './ResultDisplay';

// ── Reducer ──────────────────────────────────────────────────────────────────

const initialState: CalculatorState = {
  step: 'category',
  selectedGroup: null,
  selectedSuitTypeId: null,
  inputValues: {},
  result: null,
  error: null,
};

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SELECT_GROUP':
      return {
        ...state,
        step: 'suit_type',
        selectedGroup: action.group,
        selectedSuitTypeId: null,
        inputValues: {},
        result: null,
        error: null,
      };
    case 'SELECT_SUIT_TYPE':
      return {
        ...state,
        step: 'input',
        selectedSuitTypeId: action.suitTypeId,
        inputValues: {},
        result: null,
        error: null,
      };
    case 'SET_INPUT':
      return {
        ...state,
        inputValues: { ...state.inputValues, [action.field]: action.value },
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
      if (state.step === 'input') return { ...state, step: 'suit_type', selectedSuitTypeId: null, inputValues: {}, error: null };
      if (state.step === 'suit_type') return { ...state, step: 'category', selectedGroup: null };
      return state;
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export default function CalculatorShell() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateUrl } = useUrlSync(courtFeeParamsSchema);

  const handleCalculate = useCallback(() => {
    if (!state.selectedSuitTypeId) return;

    try {
      const result = calculateCourtFee({
        suitTypeId: state.selectedSuitTypeId,
        values: state.inputValues,
      });
      dispatch({ type: 'CALCULATE', result });

      updateUrl({
        g: state.selectedGroup ?? undefined,
        s: state.selectedSuitTypeId ?? undefined,
        v: Object.keys(state.inputValues).length > 0
          ? JSON.stringify(state.inputValues)
          : undefined,
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Calculation failed',
      });
    }
  }, [state.selectedSuitTypeId, state.inputValues, state.selectedGroup, updateUrl]);

  const suitType = state.selectedSuitTypeId
    ? getSuitTypeById(state.selectedSuitTypeId)
    : null;

  const groupInfo = state.selectedGroup
    ? SUIT_GROUPS.find((g) => g.id === state.selectedGroup)
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
        {state.selectedGroup && (
          <>
            <span className="breadcrumb-sep">/</span>
            <button
              type="button"
              className={`breadcrumb-item ${state.step === 'suit_type' ? 'breadcrumb-active' : ''}`}
              onClick={() => dispatch({
                type: 'SELECT_GROUP',
                group: state.selectedGroup as SuitGroup,
              })}
              aria-current={state.step === 'suit_type' ? 'step' : undefined}
            >
              {groupInfo?.label ?? `Group ${state.selectedGroup}`}
            </button>
          </>
        )}
        {suitType && state.step !== 'suit_type' && (
          <>
            <span className="breadcrumb-sep">/</span>
            <span
              className={`breadcrumb-item ${state.step === 'input' || state.step === 'result' ? 'breadcrumb-active' : ''}`}
              aria-current={state.step === 'input' || state.step === 'result' ? 'step' : undefined}
            >
              {suitType.label}
            </span>
          </>
        )}
      </nav>

      {/* Step content */}
      {state.step === 'category' && (
        <div role="region" aria-label="Select category">
          <CategorySelector
            selectedGroup={state.selectedGroup}
            onSelect={(group) => dispatch({ type: 'SELECT_GROUP', group })}
          />
        </div>
      )}

      {state.step === 'suit_type' && state.selectedGroup && (
        <div role="region" aria-label="Select suit type">
          <SuitTypeSelector
            group={state.selectedGroup}
            selectedSuitTypeId={state.selectedSuitTypeId}
            onSelect={(id) => dispatch({ type: 'SELECT_SUIT_TYPE', suitTypeId: id })}
            onBack={() => dispatch({ type: 'GO_BACK' })}
          />
        </div>
      )}

      {state.step === 'input' && suitType && (
        <div role="region" aria-label="Enter values">
          <ValueInputForm
            suitType={suitType}
            values={state.inputValues}
            onChangeField={(field, value) =>
              dispatch({ type: 'SET_INPUT', field, value })
            }
            onCalculate={handleCalculate}
            onBack={() => dispatch({ type: 'GO_BACK' })}
            error={state.error}
          />
        </div>
      )}

      {state.step === 'result' && state.result && (
        <div role="region" aria-label="Results">
          <ResultDisplay
            result={state.result}
            onReset={() => dispatch({ type: 'RESET' })}
            onBack={() => dispatch({ type: 'GO_BACK' })}
          />
        </div>
      )}
    </div>
  );
}
