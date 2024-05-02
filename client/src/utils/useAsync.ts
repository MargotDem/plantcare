import { useState } from "react";

export const useAsync = <T>(fn: (...args: any[]) => Promise<T>) => {
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState<T | null>(null);

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
