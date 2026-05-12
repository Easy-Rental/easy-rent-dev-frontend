import { useState } from "react";

const useCreateVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [fieldErrors] = useState({});

  const createVehicle = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    const vehicle = { uid: `v${Date.now()}`, images: null, rating: 0, reviews: 0, ...data };
    return { vehicle, fieldErrors: {}, error: null };
  };

  return { createVehicle, loading, error, fieldErrors };
};

export default useCreateVehicle;
