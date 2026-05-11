import { useState } from "react";

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async (uid) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return true;
  };

  return { deleteUser, loading };
};

export default useDeleteUser;
