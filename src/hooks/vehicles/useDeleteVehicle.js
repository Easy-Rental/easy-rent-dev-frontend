import { useState } from "react";

const useDeleteVehicle = () => {
  const [loading, setLoading] = useState(false);

  const deleteVehicle = async (uid) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  return { deleteVehicle, loading };
};

export default useDeleteVehicle;
