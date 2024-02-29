"use client";

import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "@/lib/hooks";
import styles from "../app/page.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const themeData = useAppSelector((state) => state.themeInfo.theme);

  return (
    <main className={`${styles.main} ${themeData}`}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
