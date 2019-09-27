import React from "react";
import style from "./index.module.scss";
const Button = ({ children, ...props }) => {
  return (
    <button className={style.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
