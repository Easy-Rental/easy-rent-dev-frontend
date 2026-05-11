import { useState } from "react";

const useCreatePartner = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [fieldErrors] = useState({});

  const createPartner = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    const partner = { uid: `p${Date.now()}`, ...data };
    return { partner, fieldErrors: {}, error: null };
  };

  return { createPartner, loading, error, fieldErrors };
};

export default useCreatePartner;
