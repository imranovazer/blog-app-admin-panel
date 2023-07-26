import { useState } from "react";

const useLoading = ({ callback, onError }, defaultLoading = false) => {
  const [loading, setLoading] = useState(defaultLoading);

  const applyLoading = async (data) => {
    try {
      setLoading(true);
      await callback(data);
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return [applyLoading, loading];
};

export default useLoading;
