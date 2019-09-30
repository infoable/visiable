import React from "react";
import style from "./index.module.scss";
const Button = ({ children, filled, red, ...props }) => {
  return (
    <button
      className={[style.button, filled && style.filled, red && style.red]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
