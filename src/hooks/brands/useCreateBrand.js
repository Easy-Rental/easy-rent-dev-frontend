import { useState } from "react";

const useCreateBrand = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [fieldErrors] = useState({});

  const createBrand = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    const brand = { uid: `b${Date.now()}`, vehicle_count: 0, logo: null, ...data };
    return { brand, fieldErrors: {}, error: null };
  };

  return { createBrand, loading, error, fieldErrors };
};

export default useCreateBrand;
