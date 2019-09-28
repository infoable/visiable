import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Page/SEO";
import PageHeader from "../components/Page/Header";
import Button from "../components/Form/Button";

import Link from "next/link";
import { getData } from "../lib/auth";
import client from "../lib/client";

function Explore({ list, logined }) {
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
            <Link href="/make">
              <Button>만들기</Button>
            </Link>
          </div>
          <div style={{ marginTop: 20 }}>
            <h1>내 API</h1>
            <div style={{ display: "flex" }}>
              {list.map((v, i) => (
                <div
                  key={i}
                  style={{ padding: "1em", border: "1px solid #EAEAEA" }}
                >
                  {v.site}
                  <Link href="/visiable/[id]" as={"/visiable/" + v._id}>
                    <Button filled>편집하기</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

Explore.getInitialProps = async ctx => {
  const user = await getData(ctx);
  if (!user) return { logined: false };
  const userId = user.data.id;

  const list = await client.get("/visiable/api/user/" + userId);

  return {
    logined: true,
    list: list.data.apis
  };
};

export default Explore;
