import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CircuitState, UserPreferences } from "@shared/schema";

export function useCircuitPersistence() {
  // Query all saved states
  const { data: savedStates = [] } = useQuery<CircuitState[]>({
    queryKey: ['/api/circuit-states'],
  });

  // Query user preferences
  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  // Save circuit state
  const saveState = useMutation({
    mutationFn: async (state: CircuitState) => {
      return apiRequest('POST', '/api/circuit-states', state);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/circuit-states'] });
    },
  });

  // Save preferences
  const savePreferences = useMutation({
    mutationFn: async (prefs: UserPreferences) => {
      return apiRequest('POST', '/api/preferences', prefs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    },
  });

  const getLatestState = (circuitType: string): CircuitState | undefined => {
    const circuitStates = savedStates.filter(s => s.circuitType === circuitType);
    if (circuitStates.length === 0) return undefined;
    return circuitStates.reduce((prev, current) => 
      current.timestamp > prev.timestamp ? current : prev
    );
  };

  return {
    savedStates,
    preferences,
    saveState,
    savePreferences,
    getLatestState,
  };
}
