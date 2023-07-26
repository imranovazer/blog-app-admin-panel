import { useState } from "react";
import useLoading from "./useLoading";

const useFetching = (callback) => {
  const [error, setError] = useState(null);
  const [applyLoading, loading] = useLoading({
    callback,
    onError: (error) => {
      setError(error);
    },
  });

  return [applyLoading, loading, error];
};

export default useFetching;
