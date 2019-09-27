import React, { useState } from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/Page/SEO";
import { NotLoginUserRedirect } from "../../lib/auth";
import client from "../../lib/client";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddModal from "../../components/API/AddModal";

function API({ data, id }) {
  const [open, setOpen] = useState(false);
  function openAddAction() {
    setOpen(true);
  }
  function closeAddAction() {
    setOpen(false);
  }
  return (
    <Layout>
      <SEO title={data.site}></SEO>
      <AddModal open={open} onClose={closeAddAction} id={id} />
      <div style={{ display: "flex" }}>
        <List style={{ flex: 1 }}>
          {data.actions.map(v => (
            <ListItem button>
              <ListItemText primary={v.name}></ListItemText>
            </ListItem>
          ))}
          <Divider />
          <ListItem onClick={openAddAction} button>
            <ListItemText primary="+ 추가하기"></ListItemText>
          </ListItem>
        </List>
        <div style={{ flex: 2 }}></div>
      </div>
    </Layout>
  );
}
API.getInitialProps = async ctx => {
  await NotLoginUserRedirect(ctx);

  const res = await client.get("/visiable/api/" + ctx.query.id);

  return { data: res.data.data, id: ctx.query.id };
};

export default API;
