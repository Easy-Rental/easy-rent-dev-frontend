import { useState, useCallback } from "react";
import { DUMMY_PARTNERS } from "./_dummy";

const usePartners = () => {
  const [params, setParamsState] = useState({ page: 1, search: undefined, role: undefined });

  const setParams = (next) => setParamsState((p) => ({ ...p, ...next }));

  const filtered = DUMMY_PARTNERS.filter((u) => {
    if (params.role && u.role !== params.role) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  const refetch = useCallback(() => {}, []);

  return {
    partners: filtered,
    count: filtered.length,
    loading: false,
    error: null,
    params,
    setParams,
    refetch,
  };
};

export default usePartners;
