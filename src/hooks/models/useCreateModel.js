import { useState } from "react";

const useCreateModel = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [fieldErrors] = useState({});

  const createModel = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    const model = { uid: `m${Date.now()}`, created_at: new Date().toISOString().slice(0, 10), ...data };
    return { model, fieldErrors: {}, error: null };
  };

  return { createModel, loading, error, fieldErrors };
};

export default useCreateModel;
