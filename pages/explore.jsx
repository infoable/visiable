import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Page/SEO";
import PageHeader from "../components/Page/Header";
import Button from "../components/Form/Button";

import Link from "next/link";
import { getData } from "../lib/auth";
import client from "../lib/client";
import APIComponent from "../components/Explore/API";

function Explore({ list, logined, anotherList }) {
  return (
    <Layout>
      <SEO title="API"></SEO>
      <PageHeader>
        <h1>Visiable</h1>
        <p style={{ margin: 0 }}>
          모두의 자유로운 브라우징을 위해 Visiable에 기여해 보세요.
        </p>
      </PageHeader>
      {logined && (
        <>
          <div>
            <h1>API 만들기</h1>
            <div style={{ marginTop: 10 }}>
              <Link href="/make">
                <Button>만들기</Button>
              </Link>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <h1>내 API</h1>
            <div style={{ display: "flex", flexWrap: 'wrap' }}>
              {list.map((v, i) => (
                <APIComponent key={i} {...v} />
              ))}
            </div>
          </div>
        </>
      )}
      <div style={{ marginTop: 20 }}>
        <h1>다른 사람들의 API</h1>
        <div style={{ display: "flex", flexWrap: 'wrap' }}>
          {anotherList.map((v, i) => (
            <APIComponent key={i} {...v} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

Explore.getInitialProps = async ctx => {
  const user = await getData(ctx);
  const anotherList = await client.get('/visiable/api');
  if (!user) return { logined: false, anotherList: anotherList.data.data };
  const userId = user.data.id;

  const list = await client.get("/visiable/api/user/" + userId);

  return {
    logined: true,
    list: list.data.apis,
    anotherList: anotherList.data.data
  };
};

export default Explore;
