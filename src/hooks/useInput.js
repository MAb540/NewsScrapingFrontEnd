import { useState } from "react";

function useInput(initialValue,pattern ) {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const bind = {
    value,
    onChange: (e) => setValue(e.target.value),
    required: true,
    pattern,
  
  };

  return [
    value,
    reset,
    bind,
  ];
}

export default useInput;
