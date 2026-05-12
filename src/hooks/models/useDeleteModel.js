import { useState } from "react";

const useDeleteModel = () => {
  const [loading, setLoading] = useState(false);

  const deleteModel = async (uid) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  return { deleteModel, loading };
};

export default useDeleteModel;
