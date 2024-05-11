import { useEffect, useState } from "react";
import { Button } from "@ui-react/button";
import { Input } from "@ui-react/input";
import { Toast } from "@ui-react/toast";
import { post } from "@/libs/request";
import Keycloak from "keycloak-js";

var keycloak: any = null;

const logoutSSO = () => {
  console.log("logout");
  setTimeout(() => {
    window.location.href = `https://sso-siasn.bkn.go.id/auth/realms/public-siasn/protocol/openid-connect/logout?redirect_uri=${window.location.origin}/login`;
  }, 3000);
};

const checkLogin = async () => {
  let message = "";
  if (!keycloak) {
    keycloak = new Keycloak({
      url: "https://sso-siasn.bkn.go.id/auth",
      realm: "public-siasn",
      clientId: "sikerma",
    });
  }
  try {
    const authenticated = await keycloak.init({
      onLoad: "login-required",
    });
    let isLoginBE = false;
    if (authenticated) {
      let form = {
        token: keycloak.refreshToken,
      };
      const res = await post(`/login/sso`, form, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      if (res?.status == true) {
        isLoginBE = true;
        message = res?.message;
        return {
          status: true,
          message: message,
          data: res?.data,
        };
      } else {
        message = res?.message;
      }
    }
    if (authenticated && !isLoginBE) {
      logoutSSO();
      message = "Anda Tidak Terdaftar!";
    }
  } catch (error) {
    console.error("Failed to initialize adapter:", error);
  }
  return {
    status: false,
    message: message,
  };
};

export const LoginForm = () => {
  const [message, setMessage] = useState<React.JSX.Element>(<></>);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(<></>);
    const res = await post(`/login`, form);
    if (res?.status) {
      setTimeout(() => {
        window.location.href = "/main";
      }, 1000);
      setMessage(
        <Toast className="top-0 right-0 fixed bg-green-500/80 text-green-50 font-bold w-[300px] m-5 border-green-700/20">
          {res?.message}
        </Toast>
      );
    } else {
      setMessage(
        <Toast className="top-0 right-0 fixed bg-red-500/80 text-red-50 font-bold w-[300px] m-5 border-red-700/20">
          {res?.message}
        </Toast>
      );
    }
  };

  useEffect(() => {
    if (window.location.hash != "") {
      checkLogin().then((res) => {
        if (res?.status) {
          setTimeout(() => {
            window.location.href = "/main";
          }, 1000);
          setMessage(
            <Toast className="top-0 right-0 fixed bg-green-500/80 text-green-50 font-bold w-[300px] m-5 border-green-700/20">
              {res?.message}
            </Toast>
          );
        } else {
          setMessage(
            <Toast className="top-0 right-0 fixed bg-red-500/80 text-red-50 font-bold w-[300px] m-5 border-red-700/20">
              {res?.message}
            </Toast>
          );
        }
      });
    }
  }, []);

  return (
    <div className="text-slate-600">
      <form action="" onSubmit={handleSubmit}>
        {message}
        <h3 className="text-2xl flex justify-center font-bold mb-4 text-slate-900">
          Login
        </h3>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Username</label>
          <Input
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Password</label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <Button className="bg-slate-300 text-slate-800 ring-slate-700 ring-[1px] mt-8 w-full hover:bg-slate-800 hover:text-slate-50 transition-all duration-500">
          Login
        </Button>
      </form>
      <Button
        className="bg-green-300 text-green-800 ring-green-700 ring-[1px] mt-8 w-full hover:bg-green-500 hover:ring-green-700/60 hover:text-green-50 transition-all duration-500"
        onClick={checkLogin}
      >
        Login With SSO
      </Button>
    </div>
  );
};
