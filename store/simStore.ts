import { create } from 'zustand';
import type { RaceState, SimEvent, Outcome } from '@/lib/simEngine';
import { applyRaceEvents, simulateOutcome, parseEventText, validateEvents } from '@/lib/simEngine';

interface SimStore {
  state: RaceState | null;
  originalState: RaceState | null; // Store original before events
  events: SimEvent[];
  textInput: string;
  outcome: Outcome | null;
  positionUpdateCallback: ((grid: { [position: number]: string | null }, dnfs: Set<string>) => void) | null;
  setState: (state: RaceState) => void;
  setEvents: (events: SimEvent[]) => void;
  setTextInput: (text: string) => void;
  parseAndSetEventsFromText: (driverNames: string[]) => void;
  recompute: () => void;
  clearEvents: () => void;
  setPositionUpdateCallback: (callback: (grid: { [position: number]: string | null }, dnfs: Set<string>) => void) => void;
}

export const useSimStore = create<SimStore>()((set, get) => ({
      state: null,
      originalState: null,
      events: [],
      textInput: '',
      outcome: null,
      positionUpdateCallback: null,

      setState: (state) => {
        // Store original state if not already stored
        const { originalState } = get();
        if (!originalState) {
          set({ originalState: JSON.parse(JSON.stringify(state)) });
        }
        set({ state });
        // Auto-recompute if events exist
        const { events } = get();
        if (events.length > 0) {
          get().recompute();
        }
      },

      setPositionUpdateCallback: (callback) => {
        set({ positionUpdateCallback: callback });
      },

      setEvents: (events) => {
        set({ events });
        get().recompute();
      },

      setTextInput: (text) => {
        set({ textInput: text });
      },

      parseAndSetEventsFromText: (driverNames) => {
        const { textInput } = get();
        const { events, errors } = parseEventText(textInput, driverNames);
        if (errors.length > 0) {
          console.warn('Parse errors:', errors);
        }
        const validation = validateEvents(events);
        if (validation.valid) {
          set({ events });
          get().recompute();
        } else {
          console.error('Validation errors:', validation.errors);
        }
      },

      recompute: () => {
        const { state, events, originalState, positionUpdateCallback } = get();
        if (!state) return;

        // Use original state if available, otherwise use current state
        const baseState = originalState || state;
        const newState = applyRaceEvents(JSON.parse(JSON.stringify(baseState)), events);
        const outcome = simulateOutcome(newState);
        
        // Update positions in UI if callback exists
        if (positionUpdateCallback) {
          positionUpdateCallback(newState.grid, newState.dnfs);
        }
        
        set({ outcome, state: newState });
      },

      clearEvents: () => {
        const { originalState, positionUpdateCallback } = get();
        set({ events: [], textInput: '', outcome: null });
        // Reset state to original if available
        if (originalState && positionUpdateCallback) {
          positionUpdateCallback(originalState.grid, originalState.dnfs);
          set({ state: JSON.parse(JSON.stringify(originalState)) });
        }
      },
    })
);

