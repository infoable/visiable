import { Cookies } from "react-cookie";
import client from "./client";

const cookies = new Cookies();

export async function getData(ctx) {
  let token = null;

  if (ctx && ctx.req) {
    token = ctx.req.headers.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  } else {
    token = cookies.get("token");
  }
  if (!token) return null;
  const res = await client.get("/visiable/token/verify", {
    headers: {
      "x-access-token": token
    }
  });
  return res.data;
}
export async function isLogin(ctx) {
  try {
    const data = await getData(ctx);
    if (!data) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export async function LoginUserRedirect(ctx) {
  if (await isLogin(ctx)) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        location: "/explore"
      });
      ctx.res.end();
    } else {
      Router.push("/");
    }
  }
}

export async function NotLoginUserRedirect(ctx) {
  const i = await isLogin(ctx);
  if (!i) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        location: "/explore"
      });
      ctx.res.end();
    } else {
      Router.push("/");
    }
  }
}
