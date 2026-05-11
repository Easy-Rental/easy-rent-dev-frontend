import { useState, useRef } from "react";

const useUpdatePartner = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [profileFieldErrors, setProfileFieldErrors] = useState({});
  const lastError = useRef({ fieldErrors: {}, profileFieldErrors: {}, error: null });

  const updatePartner = async (uid, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  const getLastError = () => lastError.current;

  return { updatePartner, loading, error, fieldErrors, profileFieldErrors, getLastError };
};

export default useUpdatePartner;
