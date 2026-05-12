import { useState, useCallback } from "react";
import { DUMMY_MODELS } from "./_dummy";

const useModels = () => {
  const [params, setParamsState] = useState({
    page: 1, search: undefined, brand_uid: undefined, category: undefined,
  });

  const setParams = (next) => setParamsState((p) => ({ ...p, ...next }));

  const filtered = DUMMY_MODELS.filter((m) => {
    if (params.brand_uid && m.brand_uid !== params.brand_uid) return false;
    if (params.category  && m.category  !== params.category)  return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.brand_name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const refetch = useCallback(() => {}, []);

  return {
    models: filtered,
    count: filtered.length,
    loading: false,
    error: null,
    params,
    setParams,
    refetch,
  };
};

export default useModels;
