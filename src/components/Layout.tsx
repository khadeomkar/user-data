"use client";

import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "@/lib/hooks";
import { SyncOutlined } from "@ant-design/icons";
import styles from "../app/page.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const themeData = useAppSelector((state) => state.themeInfo.theme);
  const isLoggedin = useAppSelector((state) => state.loginInfo.isLoggedin);

  return (
    <main className={`${styles.main} ${themeData}`}>
      {isLoggedin ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        <SyncOutlined spin />
      )}
    </main>
  );
}
