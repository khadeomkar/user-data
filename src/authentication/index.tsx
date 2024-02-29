"use client";
import React, { useEffect, useState } from "react";
import UsersAPI from "../services/Users/Users";
import { getCookie, removeCookie } from "../helpers/Cookie";
import { useRouter } from "next/navigation";

const UsersApi = new UsersAPI();

const Authentication = () => {
  const router = useRouter();

  const getAuthUserData = async (userId: any) => {
    try {
      const response = await UsersApi.getAuthUser(userId);
    } catch (error) {
      removeCookie("token");
    }
  };

  useEffect(() => {
    const userId = getCookie("userId");
    if (userId) {
      // getAuthUserData(userId);
      router.push("/");
    } else {
      removeCookie("token");
      router.push("/Login");
    }

    //eslint-disable-next-line
  }, []);

  return true;
};

export default Authentication;
