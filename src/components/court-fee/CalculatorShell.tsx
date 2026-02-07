'use client';

import { useReducer, useCallback } from 'react';
import type { CalculatorState, CalculatorAction, SuitGroup } from '@/types/court-fee';
import { getSuitTypeById, SUIT_GROUPS } from '@/lib/court-fee/constants/suit-categories';
import { calculateCourtFee } from '@/lib/court-fee/fee-engine/calculator';

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

  const handleCalculate = useCallback(() => {
    if (!state.selectedSuitTypeId) return;

    try {
      const result = calculateCourtFee({
        suitTypeId: state.selectedSuitTypeId,
        values: state.inputValues,
      });
      dispatch({ type: 'CALCULATE', result });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Calculation failed',
      });
    }
  }, [state.selectedSuitTypeId, state.inputValues]);

  const suitType = state.selectedSuitTypeId
    ? getSuitTypeById(state.selectedSuitTypeId)
    : null;

  const groupInfo = state.selectedGroup
    ? SUIT_GROUPS.find((g) => g.id === state.selectedGroup)
    : null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb no-print">
        <button
          type="button"
          className={`breadcrumb-item ${state.step === 'category' ? 'breadcrumb-active' : ''}`}
          onClick={() => dispatch({ type: 'RESET' })}
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
            >
              {groupInfo?.label ?? `Group ${state.selectedGroup}`}
            </button>
          </>
        )}
        {suitType && state.step !== 'suit_type' && (
          <>
            <span className="breadcrumb-sep">/</span>
            <span className={`breadcrumb-item ${state.step === 'input' || state.step === 'result' ? 'breadcrumb-active' : ''}`}>
              {suitType.label}
            </span>
          </>
        )}
      </div>

      {/* Step content */}
      {state.step === 'category' && (
        <CategorySelector
          selectedGroup={state.selectedGroup}
          onSelect={(group) => dispatch({ type: 'SELECT_GROUP', group })}
        />
      )}

      {state.step === 'suit_type' && state.selectedGroup && (
        <SuitTypeSelector
          group={state.selectedGroup}
          selectedSuitTypeId={state.selectedSuitTypeId}
          onSelect={(id) => dispatch({ type: 'SELECT_SUIT_TYPE', suitTypeId: id })}
          onBack={() => dispatch({ type: 'GO_BACK' })}
        />
      )}

      {state.step === 'input' && suitType && (
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
      )}

      {state.step === 'result' && state.result && (
        <ResultDisplay
          result={state.result}
          onReset={() => dispatch({ type: 'RESET' })}
          onBack={() => dispatch({ type: 'GO_BACK' })}
        />
      )}
    </div>
  );
}
