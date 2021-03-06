import React, { useState, useEffect } from "react";
import style from "./APIWorkspace.module.scss";
import Button from "../Form/Button";
import Workflow from "./Workflow";
import handleNetworkError from "../../lib/handleNetworkError";
import client from "../../lib/client";

const APIWorkspace = ({ target, id, refresh }) => {
  if (!target) return null;
  const [aid, name] = target;
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await client.get("/visiable/api/" + id + "/action/" + aid);
        setWorkflows(res.data.data.doings || []);
        setLoading(false);
      } catch (e) {
        handleNetworkError(e);
      }
    })();
  }, [target]);
  function onclick(workflow) {
    return () => {
      workflow.columns = workflow.columns.map(v => {
        return {
          ...v,
          value: ""
        };
      });
      setWorkflows([...workflows, workflow]);
    };
  }
  function setColumns(i) {
    return v => {
      const _workflows = [...workflows];
      _workflows[i].columns = v;
      setWorkflows(_workflows);
    };
  }
  function save() {
    (async () => {
      try {
        await client.put("/visiable/api/" + id + "/action/" + aid, {
          workflows
        });
        alert("저장 완료");
        refresh();
      } catch (e) {
        handleNetworkError(e);
      }
    })();
  }
  function deleteThis() {
    const i = prompt("정말 삭제하시겠습니까? 삭제하시려면 이 액션의 이름을 입력해주세요.: " + name);
    if (i !== name) return;
    (async () => {
      try {
        await client.delete(`/visiable/api/${id}/action/${aid}`);
        alert("삭제가 완료되었습니다.");
        refresh();
      } catch (e) {
        handleNetworkError(e);
      }
    })();
  }
  if (loading) {
    return <div style={{ padding: "1em" }}>로드 중...</div>;
  }
  return (
    <div style={{ padding: "1em" }}>
      <h1>{name}</h1>
      <div className={style.work}>
        <h3>실행할 동작</h3>
        <div className={style.works}>
          <Button
            onClick={onclick({
              title: "선택 항목 읽기",
              columns: [{ name: "selector" }],
              type: "read"
            })}
          >
            선택 항목 읽기
          </Button>
          <Button
            onClick={onclick({
              title: "리다이렉트",
              columns: [{ name: "to" }],
              type: "redirect"
            })}
          >
            리다이렉트
          </Button>
        </div>
      </div>
      <div className={style.work}>
        <h3>워크플로우</h3>
        <div className={style.workflows}>
          {workflows.map((v, i) => {
            return (
              <>
                {i !== 0 && <span>↓</span>}
                <Workflow
                  key={v.title}
                  title={v.title}
                  columns={v.columns}
                  setColumns={setColumns(i)}
                  onDestroy={() => {
                    const _workflows = [...workflows];
                    delete _workflows[i];
                    setWorkflows(_workflows.filter(Boolean));
                  }}
                />
              </>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <Button onClick={save} style={{ marginRight: 10 }}>저장하기</Button>
        <Button onClick={deleteThis} red>삭제하기</Button>
      </div>
    </div>
  );
};

export default APIWorkspace;
