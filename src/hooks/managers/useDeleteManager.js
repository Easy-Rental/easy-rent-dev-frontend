import { useState } from "react";

const useDeleteManager = () => {
  const [loading, setLoading] = useState(false);

  const deleteManager = async (uid) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  return { deleteManager, loading };
};

export default useDeleteManager;
