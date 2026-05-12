import { useState, useCallback } from "react";
import { DUMMY_BRANDS } from "./_dummy";

const useBrands = () => {
  const [params, setParamsState] = useState({ page: 1, search: undefined, status: undefined });

  const setParams = (next) => setParamsState((p) => ({ ...p, ...next }));

  const filtered = DUMMY_BRANDS.filter((b) => {
    if (params.status === "active"   && !b.is_active) return false;
    if (params.status === "inactive" &&  b.is_active) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.country_of_origin.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const refetch = useCallback(() => {}, []);

  return {
    brands: filtered,
    count: filtered.length,
    loading: false,
    error: null,
    params,
    setParams,
    refetch,
  };
};

export default useBrands;
