import React from "react";
import Link from "next/link";
import "../styles/index.scss";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";

function Index() {
  return (
    <div className="wrap">
      <div className="login-wrap">
        <main className="login">
          <h1>Hello, Visiable</h1>
          <p>로그인을 통해 전체 서비스를 이용하실 수 있습니다.</p>
          <form>
            <Input type="email" placeholder="이메일" />
            <Input type="password" placeholder="비밀번호" />
          </form>
          <div className="menus">
            <div>
              <Link href="/explore">
                <a>로그인 없이 둘러보기</a>
              </Link>
              <span> | </span>
              <Link href="/signup">
                <a>회원가입</a>
              </Link>
            </div>
            <Button>로그인</Button>
          </div>
        </main>
      </div>
      <style jsx>{`
        .wrap {
          background: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .login {
          background: white;
          padding: 2em;
        }
        .login * {
          font-weight: 100;
        }
        form {
          margin-top: 10px;
        }
        .login-wrap {
          margin: 1em;
          width: 640px;
        }
        .menus {
          display: flex;
        }
        .menus > div {
          flex: 1;
          display: block;
        }
      `}</style>
    </div>
  );
}

export default Index;
