import React, { useState } from "react";
import Input from "../Form/Input";

const Workflow = ({ title, columns, onDestroy, setColumns }) => {
  return (
    <div>
      <div>
        <div
          onClick={onDestroy}
          role="button"
          style={{ fontSize: "1.5rem", display: "inline", cursor: "pointer" }}
        >
          &times;
        </div>
      </div>
      <h3>{title}</h3>
      {columns.map((v, i) => (
        <Input
          type="text"
          key={v.name}
          placeholder={v.name}
          value={v.value}
          onChange={e => {
            const _columns = [...columns];
            _columns[i].value = e.target.value;
            setColumns(_columns);
          }}
        />
      ))}
    </div>
  );
};
export default Workflow;
