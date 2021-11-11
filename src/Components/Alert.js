import React, { useEffect, useState } from "react";

function Alert({ Message, variant, visible }) {
  const [isVisible, setisVisible] = useState();

  let alertClasses = `sm:w-11/12 md:w-80 m-2 p-2 bg-${variant}-400 text-white ${
    isVisible ? null : "hidden"
  }`;

  useEffect(() => {
    if (visible) {
      setisVisible(true);
    }
  }, [visible]);

  return isVisible ? (
    <div className={alertClasses}>
      <span
        className="ml-4 cursor-pointer float-right text-xl"
        onClick={() => setisVisible(false)}
      >
        &times;
      </span>
      {Message}
    </div>
  ) : null;
}

export default Alert;
