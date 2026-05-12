import { useState, useRef } from "react";

const useUpdateModel = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [fieldErrors] = useState({});
  const lastError = useRef({ fieldErrors: {}, error: null });

  const updateModel = async (uid, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  const getLastError = () => lastError.current;

  return { updateModel, loading, error, fieldErrors, getLastError };
};

export default useUpdateModel;
