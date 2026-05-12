import { useState, useCallback } from "react";
import { DUMMY_VEHICLES } from "./_dummy";

const useVehicles = () => {
  const [params, setParamsState] = useState({ page: 1, search: undefined, status: undefined, category: undefined });

  const setParams = (next) => setParamsState((p) => ({ ...p, ...next }));

  const filtered = DUMMY_VEHICLES.filter((v) => {
    if (params.status   && v.status   !== params.status)   return false;
    if (params.category && v.category !== params.category) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      return (
        `${v.brand} ${v.model}`.toLowerCase().includes(q) ||
        v.plate_number.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const refetch = useCallback(() => {}, []);

  return {
    vehicles: filtered,
    count: filtered.length,
    loading: false,
    error: null,
    params,
    setParams,
    refetch,
  };
};

export default useVehicles;
