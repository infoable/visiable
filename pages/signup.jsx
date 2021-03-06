import React, { useState } from "react";

import Router from "next/router";
import Layout from "../components/Layout";
import PageHeader from "../components/Page/Header";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";
import client from "../lib/client";
import handleNetworkError from "../lib/handleNetworkError";
import SEO from "../components/Page/SEO";
import form from "../lib/formOnChange";
import { LoginUserRedirect } from "../lib/auth";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAccept, setPasswordAccept] = useState("");
  const [username, setUsername] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!email || !passwordAccept || !password || !username) {
      alert("폼을 모두 채워주세요.");
      return;
    }
    if (password !== passwordAccept) {
      alert("패스워드가 같지 않습니다.");
      return;
    }
    (async () => {
      try {
        await client.post("/visiable/user", { email, password, username });
        alert("가입이 완료되었습니다.");
        Router.push("/");
      } catch (e) {
        handleNetworkError(e);
      }
    })();
  }
  return (
    <Layout>
      <SEO title="회원가입" />
      <PageHeader>
        <h1>회원가입</h1>
      </PageHeader>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          onChange={form(setEmail)}
          value={email}
        />
        <Input
          type="password"
          placeholder="패스워드"
          onChange={form(setPassword)}
          value={password}
        />
        <Input
          type="password"
          placeholder="패스워드 확인"
          onChange={form(setPasswordAccept)}
          value={passwordAccept}
        />
        <Input
          type="text"
          placeholder="유저 이름"
          onChange={form(setUsername)}
          value={username}
        />
        <Button>가입</Button>
      </form>
    </Layout>
  );
}
signup.getInitialProps = async ctx => {
  await LoginUserRedirect(ctx);
  return {};
};
export default signup;
