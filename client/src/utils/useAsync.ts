import { useState } from "react";

export const useAsync = (fn: (...args: any[]) => any) => {
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState(null);

  const call = (...args: any) => {
    setIsPending(true);
    fn(...args)
      .then((result: any) => {
        console.log("result");
        console.log(result);
        setValue(result);
      })
      .finally(() => {
        console.log("finally");
        setIsPending(false);
      });
  };

  return {
    call,
    isPending,
    value,
  };
};
