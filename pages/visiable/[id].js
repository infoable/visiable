import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/Page/SEO";
import { NotLoginUserRedirect } from "../../lib/auth";
import client from "../../lib/client";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddModal from "../../components/API/AddModal";
import handleNetworkError from "../../lib/handleNetworkError";
import APIWorkspace from "../../components/API/APIWorkspace";

import { useRouter } from "next/router";

function API() {
  const [open, setOpen] = useState(false);
  const [datas, setData] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const res = await client.get("/visiable/api/" + id);
        setData(res.data.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        handleNetworkError(e);
      }
    })();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }
  function openAddAction() {
    setOpen(true);
  }
  function closeAddAction(t) {
    setOpen(false);

    if (t) {
      refresh();
    }
  }
  async function refresh() {
    try {
      const res = await client.get("/visiable/api/" + id);
      setData(res.data.data);
    } catch (e) {
      handleNetworkError(e);
    }
  }
  return (
    <Layout>
      <SEO title={datas.site}></SEO>
      <AddModal open={open} onClose={closeAddAction} id={id} />
      <div style={{ display: "flex" }}>
        <List style={{ flex: 1 }}>
          {datas.actions.map(v => (
            <ListItem
              key={v._id}
              onClick={() => {
                setSelected([v._id, v.name]);
              }}
              button
            >
              <ListItemText primary={v.name}></ListItemText>
            </ListItem>
          ))}
          <Divider />
          <ListItem onClick={openAddAction} button>
            <ListItemText primary="+ 추가하기"></ListItemText>
          </ListItem>
        </List>
        <div style={{ flex: 2 }}>
          <APIWorkspace target={selected} id={id} refresh={refresh} />
        </div>
      </div>
    </Layout>
  );
}

export default API;
