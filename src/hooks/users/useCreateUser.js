import { useState } from "react";

const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const createUser = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    const user = { uid: `u${Date.now()}`, ...data };
    return { user, fieldErrors: {}, error: null };
  };

  return { createUser, loading, error, fieldErrors };
};

export default useCreateUser;
