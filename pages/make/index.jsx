import React, { useState } from "react";
import Layout from "../../components/Layout";
import PageHeader from "../../components/Page/Header";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import formOnChange from "../../lib/formOnChange";
import SEO from "../../components/Page/SEO";
import handleNetworkError from "../../lib/handleNetworkError";
import client from "../../lib/client";
import { getData } from "../../lib/auth";
import Router from "next/router";

function Make() {
  const [site, setSite] = useState("");
  const [name, setName] = useState("");
  const [isMake, setMake] = useState(false);

  function onsubmit(e) {
    e.preventDefault();
    setMake(true);
    (async () => {
      try {
        const data = await getData();
        const res = await client.post("/visiable/api", {
          by: data.data.id,
          site,
          name
        });

        Router.push("/visiable/" + res.data.id);
      } catch (e) {
        handleNetworkError(e);
        setMake(false);
      }
    })();
  }
  return (
    <Layout>
      <SEO title="API 만들기" />
      <PageHeader>
        <h1>Visiable API 만들기.</h1>
      </PageHeader>
      {isMake ? (
        <div>API를 만드는 중...</div>
      ) : (
        <form onSubmit={onsubmit}>
          <h1>어떤 사이트에 추가하기를 원하세요?</h1>
          <Input
            type="text"
            placeholder="사이트 이름"
            value={name}
            onChange={formOnChange(setName)}
          />
          <Input
            type="text"
            placeholder="example.com"
            value={site}
            onChange={formOnChange(setSite)}
          ></Input>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button>확인</Button>
          </div>
        </form>
      )}
    </Layout>
  );
}
export default Make;
