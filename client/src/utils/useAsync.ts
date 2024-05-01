import { useState } from "react";

export const useAsync = (fn: (...args: any[]) => any) => {
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState(null);

  const call = (...args: any) => {
    setIsPending(true);
    fn(...args)
      .then((result: any) => {
        setValue(result);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return {
    call,
    isPending,
    value,
  };
};
