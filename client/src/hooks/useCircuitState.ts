import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CircuitState } from "@shared/schema";

export function useCircuitState(circuitType: string, initialInputs: Record<string, boolean>) {
  const [inputs, setInputs] = useState(initialInputs);

  // Load saved state on mount
  const { data: savedStates } = useQuery<CircuitState[]>({
    queryKey: ['/api/circuit-states'],
  });

  // Find the most recent state for this circuit type
  useEffect(() => {
    if (savedStates && savedStates.length > 0) {
      const circuitStates = savedStates.filter(s => s.circuitType === circuitType);
      if (circuitStates.length > 0) {
        const latest = circuitStates.reduce((prev, current) => 
          current.timestamp > prev.timestamp ? current : prev
        );
        setInputs(latest.inputs);
      }
    }
  }, [savedStates, circuitType]);

  // Save state mutation
  const saveMutation = useMutation({
    mutationFn: async (state: Omit<CircuitState, 'id'>) => {
      const fullState: CircuitState = {
        ...state,
        id: `${circuitType}-${Date.now()}`,
      };
      return apiRequest('POST', '/api/circuit-states', fullState);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/circuit-states'] });
    },
  });

  // Auto-save on input change (debounced via timestamp)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveMutation.mutate({
        circuitType,
        inputs,
        timestamp: Date.now(),
      } as Omit<CircuitState, 'id'>);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputs, circuitType]);

  const reset = () => {
    setInputs(initialInputs);
  };

  return { inputs, setInputs, reset };
}
