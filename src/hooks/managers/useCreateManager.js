import { useState } from "react";

const useCreateManager = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [fieldErrors] = useState({});

  const createManager = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    const manager = { uid: `mg${Date.now()}`, role: "account_manager", profile: null, ...data };
    return { manager, fieldErrors: {}, error: null };
  };

  return { createManager, loading, error, fieldErrors };
};

export default useCreateManager;
