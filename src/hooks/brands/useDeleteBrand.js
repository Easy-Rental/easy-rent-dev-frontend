import { useState } from "react";

const useDeleteBrand = () => {
  const [loading, setLoading] = useState(false);

  const deleteBrand = async (uid) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  return { deleteBrand, loading };
};

export default useDeleteBrand;
