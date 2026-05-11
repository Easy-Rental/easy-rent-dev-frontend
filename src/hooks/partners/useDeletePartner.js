import { useState } from "react";

const useDeletePartner = () => {
  const [loading, setLoading] = useState(false);

  const deletePartner = async (uid) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  return { deletePartner, loading };
};

export default useDeletePartner;
