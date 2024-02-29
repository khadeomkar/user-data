"use client";
import { Suspense, lazy, useEffect } from "react";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, removeCookie } from "../../helpers/Cookie";
import { addLoginData, removeLoginData } from "@/lib/features/loginSlice";
import { useDispatch } from "react-redux";
import UsersAPI from "../../services/Users/Users";
import styles from "../page.module.css";

const UsersApi = new UsersAPI();

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = getCookie("userId");
    if (userId) {
      router.push("/");
    } else {
      removeCookie("token");
      removeCookie("refreshToken");
      removeCookie("userId");
      router.push("/Login");
    }

    //eslint-disable-next-line
  }, []);

  const getAuthUser = async (userId: any) => {
    const userResponse = await UsersApi.getAuthUser(userId);
    setCookie("userId", userResponse.data.id);
    dispatch(addLoginData(userResponse.data));
    router.push("/");
  };

  const setLogin = async () => {
    let userPayload = {
      email: "perfitrocks@mailinator.com",
      password: "Perfitrocks123!",
      role: "admin",
      createdDttm: new Date().getTime(),
    };
    const response: any = await UsersApi.getLoginApi(userPayload);

    if (response.data?.isLogin) {
      setCookie("token", response.data.token);
      setCookie("refreshToken", response.data.refreshToken);
      getAuthUser(response.data.userId);
    } else {
      dispatch(removeLoginData());
    }
  };

  return (
    <main className={styles.main}>
      <Card style={{ width: 600 }} title="Login">
        {/* <Suspense fallback={<>Loading...</>}>

      </Suspense> */}

        <button onClick={setLogin}>Login</button>
      </Card>
    </main>
  );
};

export default Login;
