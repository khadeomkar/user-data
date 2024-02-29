"use client";
import React, { useEffect, useState } from "react";
import UsersAPI from "../services/Users/Users";
import { getCookie, removeCookie } from "../helpers/Cookie";
import { useRouter } from "next/navigation";
import { addLoginData, removeLoginData } from "@/lib/features/loginSlice";
import { useDispatch } from "react-redux";

const UsersApi = new UsersAPI();

const Authentication = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getAuthUserData = async (userId: any) => {
    try {
      const response = await UsersApi.getAuthUser(userId);
      dispatch(addLoginData(response.data));
      router.push("/");
    } catch (error) {
      removeCookie("token");
      dispatch(removeLoginData());
    }
  };

  useEffect(() => {
    const userId = getCookie("userId");
    if (userId) {
      getAuthUserData(userId);
    } else {
      removeCookie("token");
      router.push("/Login");
    }

    //eslint-disable-next-line
  }, []);

  return true;
};

export default Authentication;
