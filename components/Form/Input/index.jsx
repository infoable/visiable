import React from "react";
import style from "./index.module.scss";
const Input = props => {
  return <input className={style.input} {...props}></input>;
};

export default Input;
