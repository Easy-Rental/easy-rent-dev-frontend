import { useState, useRef } from "react";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [fieldErrors] = useState({});
  const [profileFieldErrors] = useState({});
  const lastError = useRef({ fieldErrors: {}, profileFieldErrors: {}, error: null });

  const updateUser = async (uid, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  const getLastError = () => lastError.current;

  return { updateUser, loading, error, fieldErrors, profileFieldErrors, getLastError };
};

export default useUpdateUser;
