import { useState } from "react";

const usePresignedUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const upload = async (file, options) => {
    setUploading(true);
    setProgress(0);
    for (let i = 1; i <= 5; i++) {
      await new Promise((r) => setTimeout(r, 100));
      setProgress(i * 20);
    }
    setUploading(false);
    return { file_key: `dummy/${file.name}`, public_url: URL.createObjectURL(file) };
  };

  const reset = () => { setProgress(0); setError(null); };

  return { upload, uploading, progress, error, reset };
};

export default usePresignedUpload;
