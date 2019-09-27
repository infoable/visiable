import React from "react";
import style from "./index.module.scss";
const Button = ({ children, filled, ...props }) => {
  return (
    <button
      className={[style.button, filled && style.filled]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
