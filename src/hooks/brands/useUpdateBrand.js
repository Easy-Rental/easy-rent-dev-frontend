import { useState, useRef } from "react";

const useUpdateBrand = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [fieldErrors] = useState({});
  const lastError = useRef({ fieldErrors: {}, error: null });

  const updateBrand = async (uid, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  const getLastError = () => lastError.current;

  return { updateBrand, loading, error, fieldErrors, getLastError };
};

export default useUpdateBrand;
