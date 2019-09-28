import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import style from "./AddModal.module.scss";
import Input from "../Form/Input";
import Button from "../Form/Button";
import formOnChange from "../../lib/formOnChange";
import client from "../../lib/client";
import handleNetworkError from "../../lib/handleNetworkError";

function AddModal({ open, onClose, id }) {
  const [action, setAction] = useState("");
  function onsubmit(e) {
    e.preventDefault();

    (async () => {
      try {
        await client.post("/visiable/api/" + id + "/action", {
          name: action
        });
        onClose(true);
      } catch (e) {
        handleNetworkError(e);
      }
    })();
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div className={style.wrap}>
        <div className={style.contents}>
          <header>
            <h1>액션 추가하기.</h1>
          </header>
          <form onSubmit={onsubmit}>
            <Input
              type="text"
              placeholder="액션 이름"
              value={action}
              onChange={formOnChange(setAction)}
            ></Input>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button>+ 추가</Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default AddModal;
