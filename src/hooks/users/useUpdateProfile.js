import { useState } from "react";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateProfile = async (uid, data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    return true;
  };

  return { updateProfile, loading };
};

export default useUpdateProfile;
