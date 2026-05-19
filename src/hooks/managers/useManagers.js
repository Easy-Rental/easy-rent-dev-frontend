import { useState, useCallback } from "react";
import { DUMMY_MANAGERS } from "./_dummy";

const useManagers = () => {
  const [params, setParamsState] = useState({
    page: 1, search: undefined, status: undefined,
  });

  const setParams = (next) => setParamsState((p) => ({ ...p, ...next }));

  const filtered = DUMMY_MANAGERS.filter((m) => {
    if (params.status === "active"   && !m.is_active) return false;
    if (params.status === "inactive" &&  m.is_active) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.profile?.department ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const refetch = useCallback(() => {}, []);

  return {
    managers: filtered,
    count: filtered.length,
    loading: false,
    error: null,
    params,
    setParams,
    refetch,
  };
};

export default useManagers;
