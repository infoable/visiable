import React from "react";
import style from "./index.module.scss";
import "../../styles/index.scss";

const Layout = ({ children }) => {
  return (
    <div className={style.wrap}>
      <header className={style.header}></header>
      <article className={style.article}>{children}</article>
    </div>
  );
};

export default Layout;
